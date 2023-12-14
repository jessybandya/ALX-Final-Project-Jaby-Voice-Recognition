"use client"

import { Button, CardBody, CardFooter, Input } from '@material-tailwind/react'
import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

function Pay({setOpen}) {
    const [openBackdrop, setOpenBackDrop] = React.useState(false);
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [initiatedMerchantRequestID , setInitiatedMerchantRequestID] = useState('');
    const [initiatedCheckoutRequestID , setInitiatedCheckoutRequestID] = useState('');

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
      };

      
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(!phoneNumber){
          toast.error("Please enter phone number", {
            position: "bottom-center",
          });
          setLoading(false);
        }else{
            const formData = new FormData();
            formData.append("amount", '1');
            formData.append("phoneNumber", phoneNumber);
            // Make a request to the backend server to initiate STK push
            setLoading(true);
            const response = await axios.post(
              "https://unsa-feng.uonbi.ac.ke/backend/php/AT/initiator.php",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            setLoading(false);
      
            // Handle the response from the server
            const { success, message, transactionID, checkoutRequestID } = response.data;
              setInitiatedMerchantRequestID(transactionID);
             setInitiatedCheckoutRequestID(checkoutRequestID);
            if (success) {
              // Display success message to the user
              toast.success(message, {
                position: "top-center",
              });
              setOpenBackDrop(true)
            }else{
              toast.error(message, {
                position: "bottom-center",
              });
            }
            
          
        }
      };
  
  
      useEffect(() => {
        let swalDisplayed = false; // Flag to track if Swal modal has been displayed
      
        const fetchData = () => {
          fetch(`https://unsa-feng.uonbi.ac.ke/backend/php/AT/callback.php`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch data from the server');
              }
              return response.json();
            })
            .then((data) => {
              const actualData = data.MpesaResponse;
      
              const jsonObjects = actualData.split('}{');
      
              let matchingPaymentStatus = null;
      
              jsonObjects.forEach((json, index) => {
                const jsonString =
                  index === 0
                    ? json + '}'
                    : index === jsonObjects.length - 1
                    ? '{' + json
                    : '{' + json + '}';
      
                const parsedData = JSON.parse(jsonString);
                const merchantRequestID =
                  parsedData.Body.stkCallback.MerchantRequestID;
                const resultCode = parsedData.Body.stkCallback.ResultCode;
      
                if (merchantRequestID === initiatedMerchantRequestID) {
                  if (
                    resultCode === 0 &&
                    parsedData.Body.stkCallback.CallbackMetadata &&
                    parsedData.Body.stkCallback.CallbackMetadata.Item
                  ) {
                    const items = parsedData.Body.stkCallback.CallbackMetadata.Item;
      
                    matchingPaymentStatus = {
                      resultCode,
                      resultDesc: parsedData.Body.stkCallback.ResultDesc,
                      items,
                    };
                  } else {
                    matchingPaymentStatus = {
                      resultCode,
                      resultDesc: parsedData.Body.stkCallback.ResultDesc,
                      items: [],
                    };
                  }
                }
              });
      
              // Show Swal modal based on the matching payment status if not displayed before
              if (matchingPaymentStatus && !swalDisplayed) {
                swalDisplayed = true; // Set flag to true
      
                if (
                  matchingPaymentStatus.resultCode === 0 &&
                  matchingPaymentStatus.items.length > 0
                ) {
                  // Show success Swal modal with data
                  setOpen(false)
                  Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful',
                    html: `
                       ${matchingPaymentStatus.resultDesc}<br>
                      <strong>\n\nSummary</strong><br>
                      Ksh. ${matchingPaymentStatus.items[0].Value}<br>
                      ${matchingPaymentStatus.items[1].Value}<br>
                      +${matchingPaymentStatus.items[4].Value}<br>
                    `,
                    confirmButtonText: 'Close',
                  }).then((result) => {
                    if (result.isConfirmed) {
                     
                    }
                  });
                } else {
                  // Show error Swal modal
                  setOpen(false)
                  Swal.fire({
                    icon: 'error',
                    title: 'Transaction Failed',
                    text: `${matchingPaymentStatus.resultDesc}`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                }
              }
            })
            // .catch((error) => {
            //   console.error(error);
            //   toast.error("An error occurred while checking for M-Pesa updates.");
            // });
        };
      
        const interval = setInterval(fetchData, 1000);
      
        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
      }, [initiatedMerchantRequestID, initiatedCheckoutRequestID]);

  return (
    <div>
    <CardBody className="flex flex-col gap-4">
    <Input 
    Value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    label="Phone (25474...)" size="lg" 

    />
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={openBackdrop}
    onClick={handleCloseBackdrop}
  >
    Processing...<CircularProgress color="inherit" />
  </Backdrop>
  </CardBody>
  <CardFooter className="pt-0">
  <Button variant="gradient" onClick={handleSubmit} fullWidth>
  {loading ? "Paying..." : "Pay Now"}
  </Button>
  </CardFooter>
    </div>
  )
}

export default Pay
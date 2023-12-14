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
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useRouter } from 'next/navigation';


function Pay({setOpen, firstName, lastName, phone, email}) {
    const [openBackdrop, setOpenBackDrop] = React.useState(false);
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useRouter();


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
          afterPay();
        }
      };

      const config = {
        public_key: "FLWPUBK-f8d0aacbffe32208f371c19595882b2d-X",
        tx_ref: Date.now(),
        amount: 1,
        currency: "KES",
        payment_options: "mobilemoney",
        customer: {
          email:email,
          phonenumber: phone,
          name: `${firstName} ${lastName}`,
        },
        // mobilemoney
        customizations: {
          title: "Alx Jaby Ecommerce",
          description: `KES1.0 payments.`,
          logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        },
      };
    
      const handleFlutterPayment = useFlutterwave(config);

      const afterPay = () => {
        handleFlutterPayment({
          callback: (response) => {
            //  console.log(response);
            if (response.status == "successful") {
                 finalFun()
            } else {
              toast.error("Transaction did not work!", {
                position: toast.POSITION.TOP_CENTER,
              });
            }
            closePaymentModal(); // this will close the modal programmatically
          },
          onClose: () => {},
        });
      };

    const finalFun = async () => {
      setOpen(false)
      setOpenBackDrop(false);
      Swal.fire({
        title: `Payment successful`,
        text: `Your order has been placed successfully!`,
        icon: 'success',               
      })
      history.push('/')
    }
    

  return (
    <div>
    <CardBody className="flex flex-col gap-4">
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={openBackdrop}
    onClick={handleCloseBackdrop}
  >
    Processing...<CircularProgress color="inherit" />
  </Backdrop>
  </CardBody>
  <CardFooter className="pt-0">
  <Button color='blue' variant="gradient" onClick={afterPay} fullWidth>
  {loading ? "Paying..." : "Pay Now"}
  </Button>
  </CardFooter>
    </div>
  )
}

export default Pay
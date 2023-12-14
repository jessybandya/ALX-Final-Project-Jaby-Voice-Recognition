'use client'

import React, { useEffect } from 'react'
import Form from './Form'
import Cart from '@components/Header/Cart'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '@redux/dataSlice'
import { useRouter } from 'next/navigation'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { Backdrop, CircularProgress } from '@mui/material'
import { auth, db } from '@components/firebase'


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

function Checkout() {
    const total = useSelector(state => state.total);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const history = useRouter();
    const orderID = Math.floor(Math.random() * 1000000000)
    const [open, setOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const authId = useSelector((state) => state.authId);

    React.useEffect(() => {
      const unsub = auth?.onAuthStateChanged((user) => {
        db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
      });
    
      // Clean up the listener when the component unmounts
      return () => unsub();
    }, []);


    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };

    const sendOrder = async() => {
      handleOpen()
      const ID = db.collection('orders').doc().id

      if(cart.length === 0){
        handleClose()
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your cart is empty!',
          timer: 3000,  
          showConfirmButton: false,        
        })
      }else{
        db.collection("orders").doc(ID).set({
          orderID: orderID,
          id: ID,
          order: cart,
          total: total,
          status: 'pending',
          fromId: authId,
          createdAt: Date.now(),
        })
        handleClose()
        sendViaEmail();
        Swal.fire({
          icon: 'success',
          title: `Order ID: ${orderID}`,
          text: 'Your order has been sent!',
        })
      }      
    }

    const sendViaEmail = () =>{
      const recipientEmail = 'jessy.bandya5@gmail.com'
      const subject = encodeURIComponent(`Order ID: ${orderID} - ${currentUser?.name}`);
      const body = encodeURIComponent(`Order ID: ${orderID}\nItems: ${cart.length}\nTotal(KES): ${numberWithCommas(total)}\n\nName: ${currentUser.name}\nEmail: ${currentUser.email}`);
    
      const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      
      window.open(mailtoLink, '_blank');
    }

    useEffect(() => {
      if(cart.length === 0){
        history.push('/shop/1')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your cart is empty!',
          timer: 3000,  
          showConfirmButton: false,        
        })
      }
    }, [cart])
    


    const clearAllCartItems = () => {
        dispatch(clearCart());
        toast.warn(`Your cart has been cleared!`,{
          position: "top-center",
        })
        history.push('/shop/1')
      }

  return (
    <div className="flex flex-col lg:flex-row justify-between mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
    <div className="lg:w-1/2 pr-4">
      <Form />
    </div>
    <div className="lg:w-1/2 pl-4 mt-4 lg:mt-0">
      <Cart />
      <div className="mt-6">
      <div style={{alignItems:'center'}} className="flex justify-between text-base font-medium text-gray-900">
      <p>      
      <Button
      size="lg"
      variant="outlined"
      color="light-blue"
      className="overflow-hidden"
      onClick={clearAllCartItems}
    >
      Clear
    </Button></p>
      <p>Subtotal: Ksh.{numberWithCommas(parseFloat(total).toFixed(2))}</p>
    </div>
{authId ?(
  <span
  onClick={sendOrder}
  className="cursor-pointer flex mt-3 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
>
  Make Order
</span>
):(
  <span
  onClick={() => Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'You need to be logged in to make an order!',
    timer: 3000,  
    showConfirmButton: false,        
  })}
  className="cursor-pointer flex mt-3 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
>
  Make Order
</span>
)}
    </div>
    </div>
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
  >
    Processing Order...<CircularProgress color="inherit" />
  </Backdrop>
  </div>
  )
}

export default Checkout
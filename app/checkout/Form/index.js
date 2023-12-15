"use client"

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import Pay from './Pay';
import { ToastContainer, toast } from 'react-toastify';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    if(!firstName){
      toast.error("First Name is required!", {
        position: 'top-center'
      })
    }else if(!lastName){
      toast.error("Last Name is required!", {
        position: 'top-center'
      })
    }else if(!email){
      toast.error("Email is required!", {
        position: 'top-center'
      })
    }else if(!phone){
      toast.error("Phone Number is required!", {
        position: 'top-center'
      })
    }else if(!address){
      toast.error("Address is required!", {
        position: 'top-center'
      })
    }else{
      setOpen(true);
    }
  };

  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold mb-4">Checkout Form</h2>
      <div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-600 font-medium">First Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-600 font-medium">Last Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="zipcode" className="block text-gray-600 font-medium">Email</label>
        <input
          type="email"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="mb-4">
        <label htmlFor="zipcode" className="block text-gray-600 font-medium">Phone Number</label>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-600 font-medium">Address</label>
          <GooglePlacesAutocomplete
          apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
          selectProps={{
          placeholder: 'Choose address...',
          name:"address",
          inputValue:address['address'],
          onInputChange : (e)=>{setAddress({...address, ['address']: e})},
          }}
       />
        </div>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buy Via M-Pesa (Ksh. 1)
        </button>
      </div>

      <Dialog
size="xs"
open={open}
handler={() => setOpen(false)}
className="bg-transparent shadow-none"
style={{zIndex:9999}}
>
<ToastContainer/>

<Card className="mx-auto w-full max-w-[24rem]">
  <CardHeader
    variant="gradient"
    color="blue"
    className="mb-4 grid h-28 place-items-center"
  >
    <Typography variant="h3" color="white">
      M-Pesa
    </Typography>
  </CardHeader>
   <Pay setOpen={setOpen} phone={phone} firstName={firstName} lastName={lastName} email={email} />
</Card>
</Dialog>
    </div>
  );
};

export default Form;

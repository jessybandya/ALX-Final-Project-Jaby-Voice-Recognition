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
import { ToastContainer } from 'react-toastify';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [open, setOpen] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold mb-4">Checkout Form</h2>
      <form onSubmit={handleCheckout}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-600 font-medium">First Name</label>
          <input
            type="text"
            id="firstName"
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
            id="lastName"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-600 font-medium">Address</label>
          <input
            type="text"
            id="address"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-600 font-medium">City</label>
          <input
            type="text"
            id="city"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zipcode" className="block text-gray-600 font-medium">Zip Code</label>
          <input
            type="text"
            id="zipcode"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buy Via M-Pesa (Ksh. 1)
        </button>
      </form>

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
   <Pay setOpen={setOpen}/>
</Card>
</Dialog>
    </div>
  );
};

export default Form;

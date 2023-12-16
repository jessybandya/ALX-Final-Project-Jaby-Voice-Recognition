'use client'

import { auth, collection, db, getDocs, query, where } from '@components/firebase'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner, Typography } from '@material-tailwind/react';
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { sendSignInLinkToEmail } from 'firebase/auth';

function Register() {
    const [loading,setLoading] = useState(false)
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      trigger,
    } = useForm();


    const onSubmit = async(data)=>{
      setLoading(true)


      try {
        const resultSnapshot = await getDocs(
          query(collection(db, 'users'), where('email', '==', data.email))
        );
  
        if (resultSnapshot.docs.length > 0) {
          setLoading(false);
          // Email already exists in the database
          Swal.fire({
            text: 'Email already exists!',
            icon: 'error',
          });
        } else {
          const email = data.email;
  
          const config = {
            url:
              'https://jessybandya.github.io/ALX-Final-Project-Jaby-Voice-Recognition/complete-registration',
            handleCodeInApp: true,
          };
  
          // Send sign-in link to the provided email
          await sendSignInLinkToEmail(auth, email, config);
  
          setLoading(false);
          // Email sent successfully
          Swal.fire({
            text: `Email sent to ${email}. Click the link to complete your registration.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 5000,
          });
  
          // Save user email in local storage
          window.localStorage.setItem('emailForRegistration', email);
          // Clear state
          reset();
        }
      } catch (error) {
        setLoading(false);
        // Handle error if sending email or database operation fails
        console.error(error);
      }
     }



    const pageTitle = "Register Page | Jaby";
    const pageDescription = "Discover a range of repositories";
    const imageUrl = "https://flowbite.com/docs/images/logo.svg";

  return (
    <>
    <Helmet>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />

    {/* Open Graph meta tags */}
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:image" content={imageUrl} />

    {/* Twitter Card meta tags */}
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
    <meta name="twitter:image" content={imageUrl} />
  </Helmet>
    <section
    className="bg-cover bg-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    style={{
      backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.8)), url('https://androidkenya.com/wp-content/uploads/2023/02/safaricom_m-pesa_banner.jpg')",
    }}
    >
  <div style={{marginTop:10}} className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <Card className="w-96">
  <CardHeader
    variant="gradient"
    color="blue"
    className="mb-4 grid h-28 place-items-center"
  >
    <Typography variant="h3" color="white">
      Sign Up
    </Typography>
  </CardHeader>
  <CardBody className="flex flex-col gap-4">
    <Input
    color="blue"
    className={`form-control ${errors.email && "invalid"}`}
    {...register("email", { required: "Email is Required!" ,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address!",
    }})}
    onKeyUp={() => {
      trigger("email");
    }}
    label="Email" size="lg" />
   <center>
   {errors.email && (
    <small style={{color:'red'}}>{errors.email.message}</small>
  )}
   </center>
  </CardBody>
  <CardFooter className="pt-0">
    <Button onClick={handleSubmit(onSubmit)} variant="gradient" color="blue" fullWidth>
    {loading ? <div style={{display:'table', margin: 'auto'}}><Spinner color="white" /></div> : 'Sign Up'}
    </Button>

    <Typography variant="small" className="mt-3 flex justify-center">
      Do have an account already?
      <Link href="/login">
      <Typography
      variant="small"
      color="blue"
      className="ml-1 font-bold"
    >
      Sign in
    </Typography>
      </Link>
    </Typography>
  </CardFooter>
</Card>

  </div>
</section>
</>
  )
}

export default Register
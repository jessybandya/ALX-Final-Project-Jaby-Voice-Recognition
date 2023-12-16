"use client"

import { auth, collection, db, getDocs, query, sendPasswordResetEmail, where } from '@components/firebase'
import { Button, CardBody, CardFooter, Input, Spinner } from '@material-tailwind/react'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'

function Reset({setOpen}) {
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const resetPasword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('email', '==', email))
    );

    if (!querySnapshot.empty) {
      const config = {
        url: 'https://jessybandya.github.io/ALX-Final-Project-Jaby-Voice-Recognition/login',
        handleCodeInApp: true,
      };

      try {
        await sendPasswordResetEmail(auth, email, config);
        setEmail('');
        setLoading(false);
        // Display success message
        Swal.fire({
          icon: 'success',
          title: `Email sent to ${email}. Click the link to reset your password.`,
          customClass: {
            container: 'my-swal-container', // Add a custom CSS class name
          },
        });
      } catch (error) {
        setLoading(false);
        // Handle error if sending password reset email fails
        toast.error(error.message, {
          position: 'top-center',
        });
      }
    } else {
      // User with this email doesn't exist in the collection
      // Display an error message
      Swal.fire({
        icon: 'error',
        title: 'Email does not exist in our database!',
        customClass: {
          container: 'my-swal-container', // Add a custom CSS class name
        },
      });
      setLoading(false);
    }
  };

  return (
    <div>
    <CardBody className="flex flex-col gap-4">
    <ToastContainer />
    <Input label="Email" color="blue" size="lg" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
  </CardBody>
  <CardFooter className="pt-0">
    <Button onClick={resetPasword} variant="gradient" fullWidth>
    {loading ? <div style={{display:'table', margin: 'auto'}}><Spinner color="white" /></div> : 'Reset Password'}
    </Button>
  </CardFooter>
    </div>
  )
}

export default Reset
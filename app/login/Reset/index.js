"use client"

import { auth, db } from '@components/firebase'
import { Button, CardBody, CardFooter, Input, Spinner } from '@material-tailwind/react'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'

function Reset({setOpen}) {
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const resetPasword = async(e) =>{
    e.preventDefault();
    setLoading(true)

    db.collection('users').where('email', '==', email).get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const config ={
          url: 'https://jessybandya.github.io/AT-Hackathon-JabyAI-NextJs/login',
          handleCodeInApp: true
      };
    
        auth
        .sendPasswordResetEmail(email,config)
        .then(() => {
         setEmail('')
         setLoading(false)
         Swal.fire({
          icon: 'success',
          title: `Email sent to ${email}. Click the link to reset your password.`,
          customClass: {
              container: 'my-swal-container', // Add a custom CSS class name
          }
      })
        })
        .catch((error)=>{
          setLoading(false)
         toast.error(error.message, {
          position: "top-center",
         })
        })
      } else {
        // User with this email doesn't exist in the collection
        // Do other tasks or handle the situation accordingly
        // For example, you can display an error message using Swal.fire
        Swal.fire({
          icon: 'error',
          title: 'Email does not exist in our database!',
          customClass: {
            container: 'my-swal-container', // Add a custom CSS class name
        }
        });
      }
      setLoading(false)
    })
  }

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
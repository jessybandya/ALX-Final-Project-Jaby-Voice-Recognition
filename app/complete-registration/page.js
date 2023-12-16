'use client'

import { auth, db, doc, setDoc } from '@components/firebase'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner, Typography } from '@material-tailwind/react';
import { updateAuthId } from '@redux/dataSlice'
import { signInWithEmailLink, updatePassword } from 'firebase/auth';
import Link from 'next/link'
import { useRouter } from "next/navigation";
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function CompleteRegistration() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useRouter()
    const dispatch = useDispatch();
    const authId = useSelector(state=> state.authId)


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if(user){
            const idTokenResult = await user.getIdTokenResult()
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                email: user.email,
                token: idTokenResult.token,
                
              }
            })
            dispatch(updateAuthId(user?.uid))
    
          }
        })
        return () => unsubscribe()
      }, [])


    const signUp = async() =>{
        setLoading(true)
    
        if(!name){
            toast.error('Name is required!',{
                position: "top-center",
            })
            setLoading(false)
        }else if(!password){
            toast.error('Password is required!',{
                position: "top-center",
            })
            setLoading(false)
        }else{
          try {
            const result = await signInWithEmailLink(auth, email, window.location.href);
        
            if (result.user.emailVerified) {
              // Remove user email from localStorage
              window.localStorage.removeItem('emailForRegistration');
              
              const user = auth.currentUser;
              
              // Update user password
              await updatePassword(user, password);
              
              // Set user data in Firestore
              await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: name,
                email: user.email,
                profilePhoto: 'https://kisumucodl.uonbi.ac.ke/sites/default/files/2020-08/University_Of_Nairobi_Towers.jpg',
                timestamp: Date.now(),
              });
        
              // Display success message and redirect
              Swal.fire({
                title: 'Signed Up Successfully!',
                text: 'Welcome to Jaby AI!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  // User clicked "OK"
                  // Redirect to the home page and refresh
                  setLoading(false);
                  window.location.reload(); // Reload the page
                }
              });
            }
            history.push('/');
          } catch (error) {
            setLoading(false);
            // Handle error if email verification or database update fails
            toast.error(error.message);
          }
        }
    }

    const pageTitle = "Complete Registration Page | Jaby";
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
    <Input label="Full Name"
    color="blue"
    value={name}
    onChange={(e) => setName(e.target.value)}
     size="lg" />
    <Input
    color="blue"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    label="Email" size="lg" />
    <Input
    color="blue"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    label="Password" type='password' size="lg" />
  </CardBody>
  <CardFooter className="pt-0">
    <Button onClick={signUp} variant="gradient" color="blue" fullWidth>
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

export default CompleteRegistration
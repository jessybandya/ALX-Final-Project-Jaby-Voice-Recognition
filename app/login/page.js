'use client'
import { updateAuthId, updatetest } from '@redux/dataSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
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
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import Reset from './Reset'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleButton from 'react-google-button'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, doc, googleAuthProvider, setDoc } from '@components/firebase'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useRouter()
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);




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
          dispatch(updateAuthId(`${user?.uid}`))
  
        }
      })
      return () => unsubscribe()
    }, [])

    const login = async() =>{
        setLoading(true)
       if(!email){
        toast.error('Email is required!',{
            position: "top-center",
        })
        setLoading(false)
       }else if(!password){
        toast.error('Password is required!',{
            position: "top-center",
        })
        setLoading(false)
    }else{
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password).then((auth) => {
          dispatch(updateAuthId(auth?.user?.uid));
          Swal.fire({
            title: 'Signed In Successfully!',
            text: 'Welcome back to Jaby AI!',
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
          history.push('/');
        });
      } catch (err) {
        console.error(err);
        toast.error(err.message, {
          position: "top-center",
        })   
        setLoading(false); 
      }
     
    }
    }



    const googleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
  
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
  
        dispatch(updateAuthId(`${user?.uid}`));
  
        await setDoc(doc(db, 'users', user?.uid), {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          profilePhoto: user?.photoURL,
          timestamp: Date.now(),
        });
        Swal.fire({
          title: 'Signed In Successfully!',
          text: 'Welcome back to Jaby AI!',
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
        history.push('/');
      } catch (err) {
        // Handle error if sign-in or database update fails
        toast.error(err.message, {
          position: 'top-center',
        });
      }
    };


    const pageTitle = "Login Page | Jaby";
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
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email"
        color="blue"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         size="lg" type="email"/>
        <Input
        color="blue"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password" size="lg" type="password"/>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={login} variant="gradient" color="blue" fullWidth>
        {loading ? <div style={{display:'table', margin: 'auto'}}><Spinner color="white" /></div> : 'Sign In'}
        </Button>

        <div style={{display:'table', margin:'auto', marginTop:8}}>
        <Typography
        variant="small"
        color="blue"
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Forgot Password?
      </Typography>
        </div>

        <Typography variant="small" className="mt-3 flex justify-center">
          Don&apos;t have an account?
          <Link href="/register">
          <Typography
          variant="small"
          color="blue"
          className="ml-1 font-bold"
        >
          Sign up
        </Typography>
          </Link>
        </Typography>

        <div style={{marginTop:8}}>
        <GoogleButton style={{width: '100%'}} onClick={googleLogin}/>
        </div>
      </CardFooter>
    </Card>
  </div>
</section>

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
      Password Reset
    </Typography>
  </CardHeader>
   <Reset setOpen={setOpen}/>
</Card>
</Dialog>
</>
  )
}

export default Login
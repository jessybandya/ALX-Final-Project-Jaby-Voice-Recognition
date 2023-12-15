'use client'

import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  DialogHeader,
  DialogBody,
  Input,
  Textarea,
  DialogFooter,
  Dialog as Dialog1,
  Dialog as DialogTailwind,
  Spinner
} from "@material-tailwind/react";

import {
  BuildingStorefrontIcon,
  UserCircleIcon,
  HomeIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  AcademicCapIcon,
  Bars2Icon,
  XMarkIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Badge, Icon } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import { clearCart, updateAuthId } from "@redux/dataSlice";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { LearnTable } from "./LearnTable";
import { DataContext } from "@components/DataProvider";
import { auth, db } from "@components/firebase";
import Sentiment from 'sentiment';
import NB from "naivebayes";
import Feedback from "./Feedback";
import Orders from "./Orders";


function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
 
 

 
// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
    link: "/",
  },
  {
    label: "Shop",
    icon: BuildingStorefrontIcon,
    link: "/shop/1",
  },
];
 
function NavList({ setIsNavOpen, handleOpen, size }) {
  const [openQuote, setOpenQuote] = React.useState(false);
  const handleOpenQuote = () => setOpenQuote(!openQuote);

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      
      {navListItems.map(({ label, icon, link }, key) => (
        <Typography
          key={label}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
         <Link href={`${link}`}>
         <MenuItem onClick={() => setIsNavOpen (false)} className="flex items-center gap-2 lg:rounded-full">
         {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
         {label}
       </MenuItem>
         </Link>
        </Typography>
      ))}

    <Typography
    variant="small"
    color="blue-gray"
    className="font-normal"
    onClick={() => setOpenQuote(true)}
  >
   <MenuItem onClick={() => setOpenQuote(true)} className="flex items-center gap-2 lg:rounded-full">
   {React.createElement(GiftIcon, { className: "h-[18px] w-[18px]" })}{" "}
   Learn
 </MenuItem>
  </Typography>

    <DialogTailwind
    size='lg'
    open={openQuote} handler={handleOpenQuote} onClose={() => setOpenQuote(false)}
    
  >
  <center>
  </center>
    <DialogBody divider
    style={{
      maxHeight: "calc(100vh - 210px)",
      overflowY: "auto",
    }}
    >
     <LearnTable/>
    </DialogBody>
    <DialogFooter>
      <Button
        variant="gradient"
        color="red"
        onClick={() => handleOpen(null)}
      >
        <span>Close</span>
      </Button>
    </DialogFooter>
  </DialogTailwind>
    </ul>
  );
}
 
export default function Header() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const total = useSelector((state) => state.total);
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.authId);
  const cart = useSelector((state) => state.cart);
  const [openQuote, setOpenQuote] = React.useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const receiver = '+254746749307';
  const [currentUser, setCurrentUser] = React.useState(null);
  var xtest = [];
  const { transcript, resetTranscript } = useContext(DataContext);
  const history = useRouter()
  const [size, setSize] = React.useState(null);
  const [commentResult, setCommentResult] = useState('');


  const handleOpen = (value) => setSize(value);

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      if (user) {
        db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
      } else {
        // not logged in
      }
    });
  }, []);

  const submitQuote = () => {
    setLoading(true);
    if (name === '' || email === '' || phoneNumber === '' || message === '') {
      toast.error('Please fill all fields!', {
        position: toast.POSITION.TOP_CENTER
      });
      setLoading(false);
      return;
    } else {
      const senderDetails = `*Quote Request*\n*Name:* ${name}\n*Phone Number:* ${phoneNumber}\n*Email:* ${email}`;
      const messageWithSenderDetails = `${senderDetails}\n\n*Message*\n${message}`;
    
      const formattedMessage = encodeURIComponent(messageWithSenderDetails);

      const whatsAppLink = `https://api.whatsapp.com/send?phone=${receiver}&text=${formattedMessage}`;
  
      window.open(whatsAppLink, '_blank');
      setLoading(false);
      setName('');
      setEmail('');
      setPhoneNumber('');
      setMessage('');
      setOpenQuote(false);
    }
  };
 
  const handleOpenQuote = () => setOpenQuote(!openQuote);
 
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const clearAllCartItems = () => {
    dispatch(clearCart());
    toast.warn(`Your cart has been cleared!`,{
      position: "top-center",
    })
    setOpenCartModal(false)
  }

 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);


  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  


const logout = () => {
  setIsMenuOpen(false);
  auth?.signOut()
  Swal.fire({
    icon: "success",
    title: "Logged out successfully!",
    text: "See you back soon!",
    showConfirmButton: false,
    timer: 3000,
  });
  dispatch(updateAuthId(""));
  history.push("/login");
};
 

useEffect(() => {
   if(transcript.includes('quote')){
    setOpenQuote(true)
   resetTranscript();
  }else if(transcript.includes('close')){
    setOpenCartModal(false)
    setOpenQuote(false)
    handleOpen(null)
    resetTranscript();
   }else if(transcript.includes('learn')){
    handleOpen('lg')
    resetTranscript();
   }else if(transcript.includes('quote')){
    setOpenQuote(true)
    resetTranscript();
   }else if(transcript.includes('cut')){
    setOpenCartModal(true)
    resetTranscript();
   }else if(transcript.includes('clear')){
    clearAllCartItems()
    resetTranscript();
   }else if(transcript.includes('log out')){
    logout()
    resetTranscript();
   }else if(transcript.includes('log out')){
    logout()
    resetTranscript();
   }
}, [transcript])

const sentimCheck = (text) => {
  const sentimentAnalyzer = new Sentiment();
  // Perform sentiment analysis
  const result = sentimentAnalyzer.analyze(text);
  const finalResult = result.score

    // Create a new NaiveBayes classifier
    const classifier = new NB();

    // Train the classifier with your training data
    const xtrain = [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 1],
      // Add more training data
    ];
    const ytrain = ["negative", "neutral", "positive"];

    for (let i = 0; i < xtrain.length; i++) {
      classifier.learn(xtrain[i].toString(), ytrain[i]); //Traing the classifier or dataset
    }

    // Classify the test data
    if (finalResult < 0) {
      xtest = [0, 0, 0];
      const result = classifier.categorize(xtest.toString());
      setCommentResult(result)
    } else if (finalResult === 0) {
      xtest = [0, 1, 0];
      const result = classifier.categorize(xtest.toString());
      setCommentResult(result)
    } else {
      xtest = [1, 0, 1];
      const result = classifier.categorize(xtest.toString());
      setCommentResult(result)
    }

    submitCommentFun(text, commentResult, finalResult)
}

const submitCommentFun = (message, commentResult, finalResult) => {
  setLoading(true)
  if(message === ''){
  toast.error("Kindly leave a comment!", {
    position: "top-center",
  })
  setLoading(false)
 }else{
 db.collection("feedbacks").add({
     rateUid:authId,
     comment:message,
     commentValue:finalResult,
     ratingTime: Date.now(),
 }).
 then((e)=> 
 setMessage(""),
 setLoading(false),
 toast.success("Thanks for your feedback ✔️!",{
    position: "top-center",
 })
 )
}
}

const date = new Date;
let hours = date.getHours();

let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");


  return (
    <>
    <Navbar style={{zIndex:100}} className="mx-auto max-w-screen-xl p-2  fixed top-0 left-0 right-0">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
        <Link href="/" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-8 App-logo" alt="Jaby Logo" />
          <span className="self-center hidden lg:block text-xl font-semibold whitespace-nowrap text-[#808080]"><i>Jaby AI</i></span>
        </Link>
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList handleOpen={handleOpen} size={size}/>
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
      
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">

        <MenuHandler>
        {authId ?(
          <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
        {authId === "b5VPV1CztKOPpkONwwsgdRwIaBp1" ? <>
        <Avatar
        variant="circular"
        size="sm"
        alt={currentUser?.name}
        className="border border-blue-900 p-0.5"
        src="https://kisumucodl.uonbi.ac.ke/sites/default/files/2020-08/University_Of_Nairobi_Towers.jpg"
      />
        </> : <>
        <Avatar
        variant="circular"
        size="sm"
        alt={currentUser?.name}
        className="border border-blue-900 p-0.5"
        src={currentUser?.profilePhoto}
      />
        </>}

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
        ):(
          <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto p-2"
        >
          <span><AccountCircleIcon fontSize="medium"/></span>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
        )}

      </MenuHandler>
      <Badge className="mr-5" onClick={() => setOpenCartModal(true)} color="primary" style={{ cursor: 'pointer' }} badgeContent={cart.length}>
      <span>
        <ShoppingCartIcon style={{color:'#808080'}}/>
      </span>
    </Badge>

    <Button onClick={handleOpenQuote} variant="outlined" style={{color:'blue', border: '1px solid blue'}}>
    Reviews
    </Button>
        <MenuList className="p-1">
          {authId ?(
           <>
           <Link href='/profile'>
           <MenuItem
           onClick={() => setIsMenuOpen(false)}
           style={{ display: "flex", alignItems: "center" }}
         >
           <span>
             <UserCircleIcon className="h-4 w-4" />
           </span>
           <Typography
             as="span"
             variant="small"
             className="font-normal"
             color="inherit"
             style={{ marginLeft: "5px" }}
           >
          {authId === "b5VPV1CztKOPpkONwwsgdRwIaBp1" ? <>Admin Jessy</> : currentUser?.name}
           </Typography>
         </MenuItem>
           </Link>

           <MenuItem
           onClick={logout}
           style={{ display: "flex", alignItems: "center" }}
         >
           <span>
             <PowerIcon className="h-4 w-4 text-red-500" />
           </span>
           <Typography
             as="span"
             variant="small"
             className="font-normal"
             color="red"
             style={{ marginLeft: "5px" }}
           >
             Sign Out
           </Typography>
         </MenuItem>
           </>
          ):(
            <>
            <Link href="/login">
            <MenuItem
            onClick={() => setIsMenuOpen(false)}
            style={{ display: "flex", alignItems: "center" }}
          >
          <span>
          <UserCircleIcon className="h-4 w-4" />
        </span>
        <Typography
          as="span"
          variant="small"
          className="font-normal"
          color="inherit"
          style={{ marginLeft: "5px" }}
        >
          Login Page
        </Typography>
          </MenuItem>
          </Link>

          <Link href="/register">
          <MenuItem
          onClick={() => setIsMenuOpen(false)}
          style={{ display: "flex", alignItems: "center" }}
        >
        <span>
        <UserCircleIcon className="h-4 w-4" />
      </span>
      <Typography
        as="span"
        variant="small"
        className="font-normal"
        color="inherit"
        style={{ marginLeft: "5px" }}
      >
        Register Page
      </Typography>
        </MenuItem>
        </Link>
            </>
          )}
        </MenuList>
      </Menu>
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList setIsNavOpen={setIsNavOpen } handleOpen={handleOpen} size={size}/>
      </MobileNav>
    </Navbar>

    <Transition.Root show={openCartModal} as={Fragment}>
    <Dialog style={{zIndex:101}} as="div" className="relative z-10" onClose={() => setOpenCartModal(false)}>
      <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                      <span style={{
                        border:'1px solid #5C5CFF',
                        height:35,
                        padding:8,
                        borderRadius:5,
                        color:'#5C5CFF',
                        cursor:'pointer',
                       }}
                       onClick={clearAllCartItems}
                       >
                       Clear
                       </span>
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpenCartModal(false)}
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                  
                          <div class="py-6">
                            <div class="flow-root">
                              <Cart />
                            </div>
                  

                            <div style={{background: '#fff'}} class="mt-6 flex items-center justify-between">
                              <p class="text-sm font-medium text-gray-400">Total</p>
                              <p class="text-2xl font-semibold text-blue-900"><span class="text-xs font-normal text-gray-400">KES</span> {numberWithCommas(parseFloat(total).toFixed(2))}</p>
                            </div>

                            {cart.length > 0 &&(
                              <div class="mt-6 text-center">
                              <Link href="/checkout">
                              <button onClick={() => setOpenCartModal(false)} type="button" class="group inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-blue-800">
                              Checkout
                              <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </button>
                              </Link>

                            </div>
                            )}
                          </div>
                  
                  </div>

   
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition.Root>




  <Dialog1 open={openQuote} handler={handleOpenQuote} onClose={() => setOpenQuote(false)}>
  <div className="flex items-center justify-between">
    <DialogHeader style={{color:'#42a5f5'}}>Quote Form</DialogHeader>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="mr-3 h-5 w-5"
      onClick={handleOpenQuote}
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  </div>
  <DialogBody divider
  style={{
    height: "calc(85vh - 210px)",
    overflowY: "auto",
  }}
  >
  <ToastContainer />
  <Feedback />
  </DialogBody>
  <DialogFooter>
  {authId &&(
   <>
   <Textarea  value={message} onChange={(e) => setMessage(e.target.value)} color="blue" label={`${status} ${currentUser?.name}, say sth...!`} />

   <Button onClick={() => sentimCheck(message)} variant="gradient" color="blue">
   {loading ? <div style={{display:'table', margin: 'auto'}}><Spinner color="white" /></div> : 'Submit Comment!'}
   </Button>
   </>
  )}
  </DialogFooter>
</Dialog1>
    </>
  );
}
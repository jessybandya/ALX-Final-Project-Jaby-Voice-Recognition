'use client'

import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';

function Home(){
  const pageTitle = "Welcome to Sample Repos Web";
  const pageDescription = "Discover a range of repositories";
  const imageUrl = "https://flowbite.com/docs/images/logo.svg";
  

  return (
    <div>
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
      <div
        className="bg-cover bg-center h-screen p-3"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.8)), url('https://androidkenya.com/wp-content/uploads/2023/02/safaricom_m-pesa_banner.jpg')",
          marginBottom: -70,
        }}
      >
        {" "}
        <div className="flex flex-col justify-center items-center h-full text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold mb-4"
          >
            <center>
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-12 App-logo"
                alt="Jaby Logo"
              />{" "}
            </center>
            Welcome to My Repo Store
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg text-center"
          >
            Buy and pay for repos easily via{" "}
            <span style={{ fontWeight: "bold", color: "#2EFF2E" }}>M-Pesa</span>{" "}
            right within our platform.
            <center
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <img
                src="https://testrigor.com/wp-content/uploads/2023/04/nextjs-logo-square.png"
                style={{ height: 45 }}
                alt="NextJS Logo"
              />
              <img
                src="https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png"
                style={{ height: 45 }}
                alt="ReactJS Logo"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                style={{ height: 45 }}
                alt="JS Logo"
              />
              <img
                src="https://image.pngaaa.com/388/3920388-middle.png"
                style={{ height: 45 }}
                alt="Tailwind Css Logo"
              />
              <img
                src="https://w7.pngwing.com/pngs/761/513/png-transparent-material-ui-logo.png"
                style={{ height: 45 }}
                alt="MUI Logo"
              />
              <img
                src="https://img.stackshare.io/service/7374/react-redux.png"
                style={{ height: 45 }}
                alt="Persist Redux Logo"
              />
              <img
                src="https://techuncode.com/wp-content/uploads/2023/09/FLUTTERWAVE-IMAGE-2.jpeg"
                style={{ height: 45 }}
                alt="Flutterwave Logo"
              />
              <img
                src="https://e7.pngegg.com/pngimages/105/663/png-clipart-firebase-cloud-messaging-mobile-backend-as-a-service-software-developer-android-angle-text-thumbnail.png"
                style={{ height: 45 }}
                alt="Firebase Logo"
              />
              <img
                src="https://cdn-images-1.medium.com/max/710/0*Z-jwqyt2k8NbHaQe.png"
                style={{ height: 45 }}
                alt="Framer-Motion Logo"
              />
            </center>
            <center className="mt-10">
              <Link href="/shop/1">
                <Button color="blue">Shop My Repos</Button>
              </Link>
            </center>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Home;

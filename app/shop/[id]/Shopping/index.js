'use client'
import React, {useState, useEffect, useContext} from 'react'
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
} from "@material-tailwind/react";
import Link from 'next/link';
import { Helmet } from 'react-helmet';
import Post from './Post';
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { DataContext } from '@components/DataProvider';
import { useRouter } from 'next/navigation';
import { addToCart } from '@redux/dataSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
 
// Function to calculate the Jaccard similarity between two sets
function calculateJaccardSimilarity(setA, setB) {
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

// Function to convert a string into a set of words
function convertToWordSet(str) {
  return new Set(str.toLowerCase().split(" "));
}


function Shopping({ params, allData }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Number of posts to display per page
  const [visiblePages, setVisiblePages] = useState(5); // Number of visible pagination links
  const [value, setValue] = useState([15000, 100000]);
  const commaNumber = require('comma-number')
  const [active, setActive] = React.useState(params.id);
  const history = useRouter()
  const dispatch = useDispatch()

  const getItemProps = (index) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
    } );
 
  const next = () => {
    if (active === 5) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsWithImages = await Promise.all(allData?.map(async (item, index) => {
          const id = item.id;
          return {
            id: index + 1,
            post: item
          };
        }));

        const shuffledData = shuffleArray(postsWithImages);
    
        setPosts(shuffledData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Define the time interval in milliseconds (e.g., 5 minutes)
    const interval = 5 * 60 * 1000;

    // Fetch data periodically after the specified interval
    const fetchDataPeriodically = () => {
      fetchData();
      setTimeout(fetchDataPeriodically, interval);
    };

    // Start fetching data periodically
    const timer = setTimeout(fetchDataPeriodically, interval);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [allData]);

  // Function to shuffle an array randomly
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    if (params.id) {
      setCurrentPage(parseInt(params.id));
    } else {
      setCurrentPage(1);
    }
  }, [params.id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Get current posts based on current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const getVisiblePageNumbers = () => {
    const halfVisiblePages = Math.floor(visiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (totalPages - endPage < halfVisiblePages) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageTitle = `Shopping  |  Jaby AI`
  const pageDescription = "Browse and buy the latest repos at our online store.";
  const imageUrl = "/media/images/favicon.ico";

  const { transcript, resetTranscript } = useContext(DataContext);

  useEffect(() => {
    if(transcript.includes('next')){
      history.push(`/shop/${currentPage + 1}`);
      resetTranscript()
    }else if(transcript.includes('prev')){
      history.push(`/shop/${currentPage - 1}`);
      resetTranscript()
    }
  }, [transcript])


  useEffect(() => {
    if (transcript.includes('view')) {
      let bestMatch = null;
      let bestScore = 0;
      const transcriptWordSet = convertToWordSet(transcript);

      allData.forEach((product) => {
        const productWordSet = convertToWordSet(product.name);
        const score = calculateJaccardSimilarity(transcriptWordSet, productWordSet);
        if (score > bestScore) {
          bestMatch = product.id;
          bestScore = score;
        }
      });

      if (bestMatch) {
        history.push(`/product-view/${bestMatch}`)
      }
    }else if(transcript.includes('add')){
      let bestMatch = null;
      let bestScore = 0;
      const transcriptWordSet = convertToWordSet(transcript);

      allData.forEach((product) => {
        const productWordSet = convertToWordSet(product.name);
        const score = calculateJaccardSimilarity(transcriptWordSet, productWordSet);
        if (score > bestScore) {
          bestMatch = product;
          bestScore = score;
        }
      });

      if (bestMatch) {
        handleAddToCart(bestMatch)
      }
    }
  }, [transcript])

  const handleAddToCart = (item) => {
    const itemToAdd = {
      id: item.id,
      name: item.name,
      price: 12500,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQesY3pZ5NRXK8AIAoP-uqycOid8tpMhsb5ndYA5k1O5EeysMpu7jK0Zsn5YDkIp3uBtiI&usqp=CAU',
      quantity: 1,
    }

    dispatch(addToCart(itemToAdd));
    toast.success(`"${item?.name}" has been added to your cart!`,{
      position: "top-center",
    }); // Show toast notification
  };

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
    className="bg-cover bg-center"
    style={{
      backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.8)), url('https://androidkenya.com/wp-content/uploads/2023/02/safaricom_m-pesa_banner.jpg')",
      paddingTop: 80
    }}
    >

      <div className="w-full">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {
        currentPosts?.map(({ id, post }) => (
          <Post
          index={id}
          key={id}
          repoID={post.id}
          visibility={post.visibility}
          repoName={post.name}
          owner={post.owner}
          forks={post.forks}
          />
        ))
      }
      </div>

      <center style={{display:'table', margin: 'auto', marginTop:10}} className="flex items-center gap-1 mt-5 ml-5">

    <div className="flex items-center gap-1 ">
    {getVisiblePageNumbers().map((pageNumber) => (
      <Link href={`/shop/${pageNumber}`} key={pageNumber}>
      {pageNumber === currentPage ?(
        <IconButton
          {...getItemProps(pageNumber)}
          variant="filled"

          color= "blue"
        >
          {pageNumber}
        </IconButton>
      ):(
        <IconButton
        {...getItemProps(pageNumber)}
        variant="text"
        color= "blue"
      >
        {pageNumber}
      </IconButton>
      )}
      </Link>
    ))}
  </div>

    </center>
      </div>
    </div>
  </div>
  )
}

export default Shopping
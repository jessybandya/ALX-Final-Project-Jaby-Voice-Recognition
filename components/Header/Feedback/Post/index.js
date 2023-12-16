import { db, doc, onSnapshot } from '@components/firebase';
import { Avatar } from '@mui/material';
import React, { createElement, useEffect, useState } from 'react';



function Post({ ratedByUid, rating1, comment, ratingTime}) {

  const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {
    const userDocRef = doc(db, 'users', ratedByUid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setCurrentUser(doc.data());
      } else {
        // Handle scenario when user document doesn't exist
      }
    });

    // Clean up the listener when component unmounts
    return () => {
      unsubscribe();
    };
  }, [ratedByUid]); // Add ratedByUid to the dependency array if it's a prop



  return (
    <div style={{display:'flex'}}>
      <div><Avatar src={currentUser?.profilePhoto} alt={currentUser?.name}/></div>
      <div className="ml-3">
         <div className='font-bold'>{currentUser?.name}</div>
         <div style={{fontSize:15}}>{comment}</div>
      </div>
      <br />
    </div>
  )
}

export default Post
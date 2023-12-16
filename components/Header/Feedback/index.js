import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Post from './Post';
import { query, collection, db, where, onSnapshot,  } from '@components/firebase';


function Feedback() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const q = query(collection(db, 'feedbacks'), where('commentValue', '>=', 0));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });

    // Clean up the listener when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
    {posts.length === 0 ?(
      <center style={{fontWeight:'bold'}}>No Reviews yet!</center>
    ):(
      <>
      {
        posts.map(({id, post}) => (
         <Post
         key={id} 
         ratedByUid={post?.rateUid}
         comment={post?.comment}
         ratingTime={post?.ratingTime}
         />
        ) )
}
      </>
    )}
    </div>
  )
}

export default Feedback
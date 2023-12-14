import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Post from './Post';
import { db } from '@components/firebase';


function Feedback() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collection("feedbacks").where("commentValue", ">=", 0).onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
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
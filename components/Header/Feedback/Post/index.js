import { db } from '@components/firebase';
import { Avatar } from '@mui/material';
import React, { createElement, useState } from 'react';



function Post({ ratedByUid, rating1, comment, ratingTime}) {

  const [currentUser, setCurrentUser] = useState('')

  React.useEffect(() => {
    db.collection('users').doc(`${ratedByUid}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])


  return (
    <div style={{display:'flex'}}>
      <div><Avatar src={currentUser?.profilePhoto} alt={currentUser.name}/></div>
      <div className="ml-3">
         <div className='font-bold'>{currentUser?.name}</div>
         <div style={{fontSize:15}}>{comment}</div>
      </div>
      <br />
    </div>
  )
}

export default Post
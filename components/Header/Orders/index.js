import { db } from '@components/firebase';
import React from 'react'
import { useSelector } from 'react-redux';
import Post from './Post'

function Orders() {
    const [totalOrders, setTotalOrders] = React.useState([]);
    const authId = useSelector((state => state.authId))

    React.useEffect(() => {
        db.collection('orders').where("fromId", "==", `${authId}`).orderBy("createdAt","desc").onSnapshot(snapshot => {
            setTotalOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })
    }, []);
  return (
    <table className="w-full min-w-max table-auto text-left">
    <thead>
      <tr>
      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
           Order ID   
      </th>
      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
      Status 
 </th>
 <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
 View  
</th>
<th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
Total (KES) 
</th>

<th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
Whatsapp 
</th>
      </tr>
    </thead>
    <tbody className='"p-4 border-b border-blue-gray-50"'>
    {
        totalOrders?.length > 0 ? (
            totalOrders.map(({id, post}) => (
              <Post
              key={id} 
              orderId={post?.orderID}
              orders={post?.order}              
              status={post?.status}
              total={post?.total}
              />
            ))
          ) : (
            <div style={{color:'#BABABA',fontSize:16}}>No Orders</div>
          )
    }
    </tbody>
    </table>
  )
}

export default Orders
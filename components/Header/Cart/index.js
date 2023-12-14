import { decreaseQuantity, increaseQuantity, removeFromCart } from '@redux/dataSlice';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

function Cart() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleDecreaseQuantity = item => {
        dispatch(decreaseQuantity(item));
      };
    
      const handleIncreaseQuantity = item => {
        dispatch(increaseQuantity(item));
      };

      const handleRemoveFromCart = (itemId, name) => {
        dispatch(removeFromCart({ id: itemId }));
        toast.warn(`"${name}" has been removed from your cart!`,{
                  position: "top-center",
        })
      };
  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200 overflow-hidden"
    style={{
        maxHeight:'calc(100vh - 200px)',
        overflowY:'auto',
      }}
    >
    {cart.length === 0 ?(
        <div style={{color:'#88888888'}} className="flex flex-col items-center justify-center">
           <i>Your Cart is Empty</i>
        </div>
    ):(
        <>
        {cart.map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={product.image}
                  alt='Image'
                  className="h-full w-full object-cover object-center"
                />
              </div>
      
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href='#'>{product.name}</a>
                    </h3>
                    <p className="ml-4">{numberWithCommas(parseFloat(product.price).toFixed(2))}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{product.price} x {product.quantity} = Ksh.{numberWithCommas(parseFloat(product.price * product.quantity).toFixed(2))}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">
                  <button style={{fontSize:30, marginRight:5}} onClick={() => handleDecreaseQuantity(product)}>-</button>
                  <span style={{fontSize:16}}>{product.quantity}</span>
                  <button style={{fontSize:18, marginLeft:5}} onClick={() => handleIncreaseQuantity(product)}>+</button>
                  </p>
      
                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => handleRemoveFromCart(product.id,product.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </>
    )}

  </ul>
  )
}

export default Cart
import React from 'react'
import OrderCartComp from './OrderCartComp'
import './OrderTakeAwayCart.css'

export default function OrderTakeAwayCart() {
 
  return (
    <div className='takeAwayContainer'>
      <h2 className='columnTitle'>Cart</h2>
      <div>
        <input className='takeAwayInput' type="text" placeholder='Enter FullName' />
        <input  className='takeAwayInput'  type="tel" placeholder='Phone Number' />
      </div>

      <div>
      <OrderCartComp />
      </div>
    </div>
  )
}

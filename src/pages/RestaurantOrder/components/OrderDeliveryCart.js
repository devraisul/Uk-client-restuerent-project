import { Button } from '@material-ui/core'
import React from 'react'
import { BsCashCoin } from 'react-icons/bs'
import OrderCartComp from './OrderCartComp'

export default function OrderDeliveryCart() {
  return (
    <div className='takeAwayContainer'>
      <h2 className='columnTitle'>Cart</h2>
      <div>
        <input className='takeAwayInput' type="text" placeholder='Enter FullName' />
        <input className='takeAwayInput' type="tel" placeholder='Phone Number' />
        <input className='takeAwayInput' type="text" placeholder='Address' />
      </div>

      <div style={{height:'30vh'}}>
        <OrderCartComp />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Button className='OrderPaymentButton' onClick={()=>{}}>Order <BsCashCoin style={{ marginLeft: '10px' }} /></Button>
      </div>
    </div>
  )
}

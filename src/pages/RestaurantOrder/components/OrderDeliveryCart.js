import { Button } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BsCashCoin } from 'react-icons/bs'
import { useHistory } from 'react-router-dom'
import { addOrder } from '../../../Apis/Order'
import { AdminOrderContext } from '../context/AdminOrderContext'
import OrderCartComp from './OrderCartComp'

export default function OrderDeliveryCart() {
  const { cartData, selectedTable, setCartData, prntComponentRef, removeFromCart, addCartDishQty, removeCartDishQty } = useContext(AdminOrderContext)

  const owner = JSON.parse(localStorage.getItem('data'))


  const [inputCustomerName, setInputCustomerName] = useState('')
  const [inputPhone, setInputPhone] = useState()
  const [inputAddress, setInputAddress] = useState('')

  const history =useHistory()

  const submitButton = () => {
    const data = {
      amount: 350,
      customer_name: inputCustomerName,
      type: 'delivery',
      table_number:5,
      phone: inputPhone,
      address: inputAddress,
      dishes: cartData.map(dish => {
        return {
          Dish_Price: dish?.dish?.price,
          qty: dish?.qty,
          id: dish?.dish?.id,
          variation: dish?.variation.length > 0 ? dish?.variation.map(variation => {
            return { id: variation?.id }
          }) : []
        }
      })
    }
    console.log('ORDER -> ', data);
    addOrder(owner?.restaurant[0]?.id, data).then((res) => {
      console.log(res);
      toast.success(res?.data?.message);
      setCartData([])
      setInputPhone("")
      setInputAddress("")
      setInputCustomerName("")
      setTimeout(() => {
        history.push('/')
      }, 1000);
    })
  }

  return (
    <div className='takeAwayContainer'>
      <Toaster position='top-right' />
      <h2 className='columnTitle'>Cart</h2>
      <div>
        <input onChange={(e) => setInputCustomerName(e.target.value)} className='takeAwayInput' type="text" placeholder='Enter FullName' />
        <input onChange={(e) => setInputPhone(e.target.value)} className='takeAwayInput' type="tel" placeholder='Phone Number' />
        <input onChange={(e) => setInputAddress(e.target.value)} className='takeAwayInput' type="text" placeholder='Address' />
      </div>

      <div style={{height:'38vh'}}>
        <OrderCartComp />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Button className='OrderPaymentButton' onClick={submitButton}>Order <BsCashCoin style={{ marginLeft: '10px' }} /></Button>
      </div>
    </div>
  )
}

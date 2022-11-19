import { Box, Button, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiDollarCircle, BiPrinter } from 'react-icons/bi'
import { BsArrowReturnLeft, BsArrowRight, BsCashCoin } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import ReactToPrint from 'react-to-print'
import { addOrder } from '../../../Apis/Order'

import { AdminOrderContext } from '../context/AdminOrderContext'
import OrderCalculator from './OrderCalculator'
import './OrderEatInCart.css'
import OrderPrintInvoice from './OrderPrintInvoice'
import OrderTableSelection from './OrderTableSelection'

export default function OrderEatInCart() {
  const { cartData, selectedTable, prntComponentRef,removeFromCart } = useContext(AdminOrderContext)



  const owner = JSON.parse(localStorage.getItem('data'))
  const [qt, setQt] = useState(1)
  const [isOnPaymentTab, setIsOnPaymentTab] = useState(false)
  const [isOnOrderTab, setIsOnOrderTab] = useState(false)
  const [isOnCartTab, setIsOnCartTab] = useState(true)
  const [isRiciptView, setIsRiciptView] = useState(false)
  const [inputCustomerName, setInputCustomerName] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [inputAddress, setInputAddress] = useState('')


  const goToPayment = () => {
    setIsOnPaymentTab(true)
    setIsOnCartTab(false)
    setIsOnOrderTab(false)

  }
  const goToOrder = () => {
    setIsOnPaymentTab(false)
    setIsOnCartTab(false)
    setIsOnOrderTab(true)

  }
  const goBack = () => {
    setIsOnOrderTab(false)
    setIsOnPaymentTab(false)
    setIsOnCartTab(true)
    setIsRiciptView(false)
  }


  const dicreaseQT = (id) => {
    qt > 0 && setQt(qt - 1)
  }
  const increaseQT = (id) => {
    setQt(qt + 1)
  }


  const submitButton = () => {
    const data = {
      amount: 0,
      customer_name: inputCustomerName,
      table_number: selectedTable,
      type: 'eat_in',
      phone: inputPhone,
      address: inputAddress,
      dishes: []
    }

    console.log({ inputCustomerName, inputPhone, inputAddress })
    addOrder(owner?.restaurant[0]?.id, data).then((res) => {
      toast.success(res?.data?.message);
    })
  }
  useEffect(() => {
    console.log(isRiciptView);
    console.log('cartData',cartData);
  }, [isRiciptView])
  return (
    <Box>
      <>
        {!selectedTable ? <OrderTableSelection />
          :
          <>
            {isOnCartTab &&
              <div className='cartContainerMain'>
                {!isRiciptView && <span className='OrderSelectedTable'>Selected Table : {selectedTable} </span>}
                {!isRiciptView &&
                  <>
                    {
                      !(cartData.length > 0) ?
                        <div style={{ height: '50vh' }} className='cartEmpty'>
                          <AiOutlineShoppingCart />
                          <p>Empty Cart!</p>
                        </div>
                        :
                        <div style={{ height: '50vh' }} className='cartList'>
                          {
                            cartData.map(data => (
                              <div className='OrderCartCard'>
                                <div style={{ width: '300px' }} >
                                  <h4 style={{ marginRight: '10px' }}>{data?.dish?.id}</h4>
                                  <img src={`https://mughalsignandprint.co.uk/restaurant/${data?.dish?.image}`} alt="" />
                                  <h4>{data?.dish?.name}</h4>
                                </div>

                                <div
                                  style={{
                                    display: 'flex',
                                    width: '60px',
                                    justifyContent: 'center',
                                    alignItems: "center",
                                    fontWeight: 'bold',
                                    color: '#0575B4'
                                  }} >
                                  £ {data?.dish?.price}
                                </div>

                                <div className='OrderQt'>
                                  <button onClick={() => dicreaseQT(data?.dish?.id)}>-</button>
                                  {qt}
                                  <button onClick={() => increaseQT(data?.dish?.id)}>+</button>
                                </div>
                                <button onClick={()=>removeFromCart(data?.dish?.id)}>
                                  <MdDelete style={{ fontSize: '1.5rem', color: 'red' }} />
                                </button>
                              </div>
                            ))
                          }
                        </div>
                    }
                  </>}

                {isRiciptView && <div className='OrderRecieptContainer'>
                  <OrderPrintInvoice />
                </div>}


                {/* PRINT BUTTON FOR RECEIPT  */}
                {isRiciptView && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width:'92%', position: 'absolute', bottom: 0 }}>
                  <Button className='OrderRecipetButton' onClick={goBack}>Go Back <BsArrowReturnLeft style={{ marginLeft: '10px' }} /></Button>
                  <ReactToPrint trigger={() => (
                    <Button className='OrderRecipetButton'>
                      Print <BiPrinter style={{ marginLeft: '10px', fontSize: '1.4rem' }} />
                    </Button>
                  )} content={() => prntComponentRef.current} />
                </div>
                }

                {/* CART ACTION BUTTONS  */}
                <div className='OrderCartButtonContainer'>

                  {!isRiciptView && <>
                    <Button className='OrderCartButton' onClick={()=>setIsRiciptView(true)} >
                      Reciept <BiPrinter style={{ marginLeft: '10px', fontSize: '1.4rem' }} />
                    </Button>

                    <Button className='OrderCartButton' onClick={goToOrder} >
                      Order <BsArrowRight style={{ marginLeft: '10px', fontSize: '1.4rem' }} />
                    </Button>

                    <Button className='OrderCartButton' onClick={goToPayment} >
                      Payment <BiDollarCircle style={{ marginLeft: '10px', fontSize: '1.4rem' }} />
                    </Button>
                  </>}


                </div>
              </div>
            }

            {isOnOrderTab &&
              <div style={{ position: 'relative', height: '70vh' }}>
                <div>
                  <label className='OrderEatInInputLabel' htmlFor="customer_name">
                    Customer Name*
                  </label>
                  <input
                    onChange={(e) => setInputCustomerName(e.target.value)}
                    id='customer_name'
                    name='customer_name'
                    className='OrderEatInInput'
                    type="text"
                    placeholder='Enter FullName' />

                  <label className='OrderEatInInputLabel' htmlFor="phone">
                    Phone*
                  </label>
                  <input
                    onChange={(e) => setInputPhone(e.target.value)}
                    id='phone'
                    name='phone'
                    className='OrderEatInInput'
                    type="tel"
                    placeholder='Phone Number' />

                  <label className='OrderEatInInputLabel' htmlFor="address">
                    Address*
                  </label>
                  <input
                    onChange={(e) => setInputAddress(e.target.value)}
                    id='address'
                    name='address'
                    className='OrderEatInInput'
                    type="text"
                    placeholder='Address' />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute', bottom: 0 }}>
                  <Button className='OrderPaymentButton' onClick={goBack}>Go Back <BsArrowReturnLeft style={{ marginLeft: '10px' }} /></Button>
                  <Button className='OrderPaymentButton' onClick={submitButton}>Order <BsCashCoin style={{ marginLeft: '10px' }} /></Button>
                </div>
              </div>
            }

            {isOnPaymentTab &&
              <div>
                <div className='calcContainer'>
                  <OrderCalculator />
                  <div className='calcDetail'>
                    <div className='calcTotal'>Total: £ 4332</div>
                    <div className='calcBalance'>Balance: £ 0</div>
                  </div>
                </div>
                <div className="OrderPaymentSpliterContainer">
                  <div className="OrderSpliterControler">
                    <div>
                      <button>-</button>
                      <span className='OrderNumber'>{2}</span>
                      <button>+</button>
                    </div>
                    <span>Payments</span>
                  </div>

                  <div className="OrderPaymentSplitDetails">
                    <div className='OrderPaymentSplitCard'>
                      <button style={{
                        marginRight: "10px"
                      }}>
                        <MdDelete style={{ fonrginLeft: '10px !important', fontSize: '1.5rem', color: 'red' }} /></button>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={'cash'}
                        style={{ width: '50%', marginBottom: '-2px' }}
                      >
                        <MenuItem value={'cash'}>Cash</MenuItem>
                        <MenuItem value={'card'}>Card</MenuItem>
                      </Select>
                      <TextField style={{ textAlign: 'right !important' }} defaultValue={75} type={'number'} variant="standard" />
                      <div style={{
                        display: "flex"
                      }}>
                        <button className='OrderChargeButton'>Charge</button>
                      </div>
                    </div>
                    <div className='OrderPaymentSplitCard'>
                      <button style={{
                        marginRight: "10px"
                      }}>
                        <MdDelete style={{ fonrginLeft: '10px !important', fontSize: '1.5rem', color: 'red' }} />
                      </button>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={'cash'}
                        style={{ width: '50%', marginBottom: '-2px' }}
                      >
                        <MenuItem value={'cash'}>Cash</MenuItem>
                        <MenuItem value={'card'}>Card</MenuItem>
                      </Select>
                      <TextField style={{ textAlign: 'right !important' }} defaultValue={75} type={'number'} variant="standard" />
                      <div style={{
                        display: "flex"
                      }}>

                        <button className='OrderChargeButton'>Charge</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button className='OrderPaymentButton' onClick={goBack}>Go Back <BsArrowReturnLeft style={{ marginLeft: '10px' }} /></Button>
                  <Button className='OrderPaymentButton' onClick={goToPayment}>Pay <BsCashCoin style={{ marginLeft: '10px' }} /></Button>
                </div>
              </div>}
          </>
        }
      </>
    </Box>
  )
}

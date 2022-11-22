import { Button } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsArrowReturnLeft, BsCashCoin } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { AdminOrderContext } from '../context/AdminOrderContext'
import OrderCalculator from './OrderCalculator'

export default function OrderCartComp() {
    const { cartData, selectedTable, setCartData, prntComponentRef, removeFromCart, addCartDishQty, removeCartDishQty } = useContext(AdminOrderContext)
    const owner = JSON.parse(localStorage.getItem('data'))
    const [qt, setQt] = useState(1)
    const [isOnPaymentTab, setIsOnPaymentTab] = useState(false)


    const goToPayment = () => {
        setIsOnPaymentTab(true)
    }
    const goBack = () => {
        setIsOnPaymentTab(false)
    }


    return (
        <div className='cartContainerMain'>
            <>
                {
                    !isOnPaymentTab ?
                        <>
                            {
                                !(cartData.length > 0) ?
                                    <div className='cartEmpty'>
                                        <AiOutlineShoppingCart />
                                        <p>Empty Cart!</p>
                                    </div>
                                    :
                                    <div style={{ height: '30vh' }} className='cartList'>
                                        {cartData.map((data, i) => (
                                            <div key={i} className='OrderCartCard'>
                                                <div style={{ width: '300px' }}>
                                                    <h4 style={{ marginRight: '10px' }}>{data?.dish?.id}</h4>
                                                    <img src={`https://mughalsignandprint.co.uk/restaurant2/${data?.dish?.image}`} alt="" />
                                                    <div
                                                        style={{
                                                            flexDirection: 'column',
                                                            alignItems: 'start',
                                                            justifyContent: 'start'
                                                        }}>
                                                        <h4>{data?.dish?.name}</h4>
                                                        {data?.variation.length > 0 &&
                                                            <h6>Options :
                                                                (<>
                                                                    {data?.variation.map(variation => (
                                                                        <>{variation?.name},</>
                                                                    ))}
                                                                </>)
                                                            </h6>
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    width: '60px',
                                                    justifyContent: 'center',
                                                    alignItems: "center",
                                                    fontWeight: 'bold',
                                                    color: '#0575B4'
                                                }}>
                                                    £ {data?.dish?.price}
                                                </div>


                                                <div className='OrderQt'>
                                                    <button onClick={() => removeCartDishQty(data?.dish?.id)}>-</button>
                                                    {data?.qty}
                                                    <button onClick={() => addCartDishQty(data?.dish?.id)}>+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(data?.dish?.id)}>
                                                    <MdDelete style={{ fontSize: '1.5rem', color: 'red' }} />
                                                </button>


                                            </div>
                                        ))
                                        }
                                    </div>
                            }
                        </>
                        :
                        <div>
                            <div className='calcContainer'>
                                <OrderCalculator />
                                <div className='calcDetail'>
                                    <div className='calcTotal'>Total: £ 4332</div>
                                    <div className='calcBalance'>Balance: £ 0</div>
                                </div>
                            </div>

                            <div>
                                <Button className='OrderPaymentButton' onClick={goBack}>
                                    Go Back <BsArrowReturnLeft style={{ marginLeft: '10px' }} />
                                </Button>
                                <Button className='OrderPaymentButton' onClick={goToPayment}>
                                    Pay <BsCashCoin style={{ marginLeft: '10px' }} />
                                </Button>
                            </div>
                        </div>
                }
            </>
        </div>
    )
}

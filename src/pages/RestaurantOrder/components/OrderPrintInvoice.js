import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { AdminOrderContext } from '../context/AdminOrderContext'

export default function OrderPrintInvoice() {
    const { cartData, prntComponentRef } = useContext(AdminOrderContext)
    const owner = JSON.parse(localStorage.getItem('data'))
    let today = new Date()

    const [total, setTotal] = useState(0)

    useEffect(() => {
        setTotal(0)
        cartData.map(d => {
            setTotal(total + (d?.qty * d.dish.price));
        })
    }, [])
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div ref={prntComponentRef} style={{ width: '567px', color: '#000', padding: '10px' }}>
                    <h2 style={{ textAlign: 'center' }} >{owner.restaurant[0]?.Name}</h2>
                    <p style={{ textAlign: 'center' }}>{owner.restaurant[0]?.Address}</p>
                    <hr style={{ border: '1px dashed #000', margin: '10px 0px' }} />
                    <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Order No: 10</h1>
                    <p style={{ textAlign: 'center' }}>Order payment receipt</p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>Date:</div> <div>{moment(today).format('D.M.YYYY')} {moment(today).format('LT')}</div>
                    </div>
                    <span>Cashier: {`${owner?.first_Name} ${owner?.last_Name}`}</span>
                    <hr style={{ border: '1px dashed #000', margin: '10px 0px' }} />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: 'bold'
                    }}>
                        <span>Name</span><span>Qty Amount</span>
                    </div>
                    <hr style={{ border: '1px dashed #000', margin: '10px 0px' }} />

                    {
                        cartData.map(dish => (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontWeight: 'bold'
                                }}>
                                {console.log('print', dish)}
                                <span>{dish?.dish?.name}</span><span>{dish?.qty}</span>
                            </div>
                        ))
                    }
                    <hr style={{ border: '1px dashed #000', margin: '10px 0px' }} />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: 'bold'
                    }}>
                        <span>Total</span><span>300</span>
                    </div>
                    <br />
                    <p style={{ textAlign: 'center', fontSize: '0.8rem' }}>Wifi password : Test123</p>
                    <p style={{ textAlign: 'center', fontSize: '0.7rem' }}>THANK YOU! SEE YOU SOON!</p>
                </div>
            </div>

        </>

    )
}

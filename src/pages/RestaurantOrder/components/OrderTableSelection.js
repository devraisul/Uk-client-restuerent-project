import { Grid } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { allPaddingOrdersByRestID } from '../../../Apis/Order'
import { getRestaurent } from '../../../Apis/Restaurent'
import { useAuth } from '../../../context/AuthContext'
import { AdminOrderContext } from '../context/AdminOrderContext'
import styles from './OrderTableSelection.module.css'
export default function OrderTableSelection() {
    const { setSelectedTable } = useContext(AdminOrderContext)

    const [paddingOrders, setPaddingOrders] = useState([])
    
    const { user } = useAuth()

    const color = [
        'rgb(114, 255, 75)',
        'rgb(255, 132, 132)',
        'rgb(187, 187, 187)'
    ]
    const [totalTable, setTotalTable] = useState(0)

    useEffect(() => {
        getRestaurent(user?.restaurant[0]?.id).then((res) => {
            setTotalTable(res?.restaurant?.totalTables);
        })
        allPaddingOrdersByRestID(user?.restaurant[0]?.id).then((res) => {
            setPaddingOrders(res?.data)
        })
    }, [user])

    
    return (
        <Grid
            container
            spacing={{ xs: 1, sm: 1, md: 1 }}
            columns={{ xs: 12, sm: 12, md: 12 }} >
            <div className='indicatorContainer'>
                <h1 style={{ marginBottom: '10px', }}>Select a table</h1>
                <div>
                    <span className='cartIndicator'> <span className='cartAvailableIndicator'></span> Available</span>
                    <span className='cartIndicator'> <span className='cartSelectedIndicator'></span> Selected</span>
                    <span className='cartIndicator'> <span className='cartBookedIndicator'></span> Already Booked</span>
                </div>
            </div>

            {[...Array(totalTable)].map((elementInArray, index) => (
                <Grid
                    key={index}
                    style={{
                   
                        cursor: `${paddingOrders.filter(res=>res?.table_number===(index+1)).length>0?'default':'pointer'}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    className={styles.OrderTableCell}
                    display
                    onClick={() => { 
                        paddingOrders.filter(res=> res?.table_number===(index+1)).length === 0 && setSelectedTable(index + 1) 
                    }}
                    item xs={2} sm={2} md={2} >
                    <div
                        style={{
                            background: `${paddingOrders.filter(res=>res?.table_number===(index+1)).length>0?'rgb(255, 132, 132)':'rgb(187, 187, 187)'}`,
                            position: 'relative',
                            height: '60px',
                            width: '60px'
                        }}
                        className={paddingOrders.filter(res=>res?.table_number===(index+1)).length>0?styles.OrderTableBooked:styles.OrderTable} >
                           
                        <div
                            style={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%,-50%)',
                                width: "100%"
                            }}>
                            <img loading='lazy' style={{ width: '100%' }} src='/dining-table.png' alt='' />
                        </div>
                        <div
                            style={{
                                fontSize: '1.3rem', fontWeight: 'bold', position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%,-50%)'
                            }}>
                            {index + 1}
                        </div>
                    </div>
                </Grid>
            )
            )}
        </Grid>
    )
}

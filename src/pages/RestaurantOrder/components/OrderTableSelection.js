import { Grid } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { getRestaurent } from '../../../Apis/Restaurent'
import { useAuth } from '../../../context/AuthContext'
import { AdminOrderContext } from '../context/AdminOrderContext'

export default function OrderTableSelection() {
    const { setSelectedTable } = useContext(AdminOrderContext)
    const { user } = useAuth()

    const color = [
        'rgb(114, 255, 75)',
        'rgb(255, 132, 132)',
        'rgb(187, 187, 187)'
    ]
    const [totalTable, setTotalTable] = useState(0)

    useEffect(() => {
        getRestaurent(user?.restaurant[0]?.id).then((res) => {
            console.log(res?.restaurant);
            setTotalTable(res?.restaurant?.totalTables);
        })
    }, [user])
    console.log(totalTable);
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

            {[...Array(30)].map((elementInArray, index) => (
                <Grid
                    key={index}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onClick={() => { setSelectedTable(index + 1) }}
                    item xs={2} sm={2} md={2} >
                    <div
                        style={{
                            background: `${color[Math.floor(Math.random() * (2 - 0 + 1)) + 0]}`,
                            position: 'relative',
                            height:'60px',
                            width:'60px'
                        }}
                        className='OrderTable' >
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%,-50%)',
                            width:"100%"
                        }}>
                            <img loading='lazy' style={{ width: '100%' }} src='/dining-table.png' alt='' />
                        </div>
                        <div style={{
                            fontSize: '1.3rem', fontWeight: 'bold', position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%,-50%)'
                        }}>{index + 1}</div>
                    </div>
                </Grid>
            )
            )}
        </Grid>
    )
}

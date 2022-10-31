import { Button, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { BiMessageAltError } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { getdish } from '../../Apis/dish'
import { getMenu } from '../../Apis/Menu'
import './RestaurantOrder.css'

export default function RestaurantOrder() {
    const { order_type } = useParams()
    const owner = JSON.parse(localStorage.getItem('data'))

    const [isMenuLoading, setIsMenuLoading] = useState(false)
    const [isDishLoading, setIsDishLoading] = useState(false)


    const [menus, setMenus] = useState([])
    const [dishes, setDishes] = useState([])


    useEffect(() => {
        setIsMenuLoading(true)
        getMenu(owner?.restaurant[0]?.id)
            .then(res => {
                setMenus(res);
                setIsMenuLoading(false)
            })
    }, [])





    const handleMenuClick = (id) => {
        setIsDishLoading(true)
        getdish(id).then(dish => {
            setIsDishLoading(false)
            setDishes(dish);
            console.log(dish);
        })
    }

    const handleDishClick = (id) => {
        console.log(id);
    }

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={2} sm={4} md={4} >
                <h2 className='columnTitle'>Cart</h2>
            </Grid>

            <Grid className='singleColumn' style={{ position: 'relative' }} item xs={2} sm={4} md={5} >
                <h2 className='columnTitle'>Dishes</h2>
                <Grid container
                    spacing={{ xs: 2, sm: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }} >

                    {
                        isDishLoading ?
                            <div style={{
                                position: 'absolute',
                                top: '25%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#aaa'
                                }}>
                                    <span style={{ fontWeight: 'bold' }}>Loading...</span>
                                </div>
                            </div>
                            :
                            <>
                                {
                                    (dishes.length > 0) ?
                                        <>
                                            {
                                                dishes.map((dis, i) => (
                                                    <Grid item xs={2} sm={3} md={4} >
                                                        <Button
                                                            key={i}
                                                            onClick={() => handleDishClick(dis?.id)}
                                                            variant="contained"
                                                            className='menuCardButton'

                                                        >
                                                            <span>
                                                                {dis?.image ?
                                                                    <img src={`https://mughalsignandprint.co.uk/restaurant/${dis?.image}`} alt="" />
                                                                    :
                                                                    <img src={`/no-image.png`} alt="" />
                                                                    }
                                                            </span>
                                                            <span>
                                                                <p>{dis?.name}</p>
                                                            </span>
                                                        </Button>
                                                    </Grid>
                                                ))
                                            }
                                        </>
                                        :
                                        <div style={{
                                            position: 'absolute',
                                            top: '25%',
                                            left: '50%',
                                            transform: 'translate(-50%,-50%)'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#aaa'
                                            }}>
                                                <BiMessageAltError style={{ fontSize: '3rem', }} />
                                                <span style={{ fontWeight: 'bold' }}>Empty</span>
                                            </div>
                                        </div>
                                }
                            </>
                    }

                </Grid>
            </Grid>

            <Grid className='singleColumn' style={{ position: 'relative' }} item xs={2} sm={4} md={2} >
                <h2 className='columnTitle'>Menus</h2>
                <Grid
                    container
                    spacing={{ xs: 2, sm: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }} >
                    {
                        isMenuLoading ?
                            <div style={{
                                position: 'absolute',
                                top: '25%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#aaa'
                                }}>
                                    {/* <BiMessageAltError style={{ fontSize: '3rem', }} /> */}
                                    <span style={{ fontWeight: 'bold' }}>Loading...</span>
                                </div>
                            </div>
                            :
                            <>
                                {
                                    (menus.length > 0) ?
                                        <>
                                            {
                                                menus.map((menu, i) => (
                                                    <Button key={i} onClick={() => handleMenuClick(menu?.id)} variant="contained" className='menuCardButton2'>{menu?.name}</Button>
                                                ))
                                            }
                                        </>
                                        :
                                        <div style={{
                                            position: 'absolute',

                                            top: '25%',
                                            left: '50%',
                                            transform: 'translate(-50%,-50%)'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#aaa'
                                            }}>
                                                <BiMessageAltError style={{ fontSize: '3rem', }} />
                                                <span style={{ fontWeight: 'bold' }}>Empty</span>
                                            </div>

                                        </div>
                                }
                            </>
                    }
                </Grid>
            </Grid>

        </Grid>
    )
}

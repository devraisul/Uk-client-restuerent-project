import { Grid } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getdish } from '../../Apis/dish'
import { getMenu } from '../../Apis/Menu'
import OrderDeliveryCart from './components/OrderDeliveryCart'
import OrderDishesColumn from './components/OrderDishesColumn'
import OrderEatInCart from './components/OrderEatInCart'
import OrderMenuColumn from './components/OrderMenuColumn'
import OrderTakeAwayCart from './components/OrderTakeAwayCart'
import { AdminOrderContext } from './context/AdminOrderContext'
import './RestaurantOrder.css'

export default function RestaurantOrder() {

    // CONTEXT 
    const {
        cartData, setCartData,
        selectedTable,
        setIsMenuLoading,
        setMenus,
        setDishes,
        dishQuery,
        menuQuery,
        activeMenuId
    } = useContext(AdminOrderContext)

    const { order_type } = useParams()
    const owner = JSON.parse(localStorage.getItem('data'))



    // USE_EFFECTS 
    useEffect(() => {
        setIsMenuLoading(true)
        getMenu(owner?.restaurant[0]?.id)
            .then(res => {
                setMenus(res);
                setIsMenuLoading(false)
            })
    }, [order_type])

    useEffect(() => {
        setCartData([])
    }, [order_type])

    useEffect(() => {
        getdish(activeMenuId).then(dish => {
            setDishes(dish.filter(res => res.name.toLowerCase().includes(dishQuery)));
        })
    }, [dishQuery])

    useEffect(() => {
        if (menuQuery !== "") {
            setIsMenuLoading(true)
            getMenu(owner?.restaurant[0]?.id)
                .then(res => {
                    setMenus(res.filter(res => res.name.toLowerCase().includes(menuQuery)));
                    setIsMenuLoading(false)
                })
        }
    }, [menuQuery])



    return (

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid
                className='singleColumn'
                item
                xs={order_type === 'eat_in' ? (selectedTable ? 12 : 12) : 12}
                sm={order_type === 'eat_in' ? (selectedTable ? 12 : 12) : 4}
                md={order_type === 'eat_in' ? (selectedTable ? 5 : 12) : 5} >
                {selectedTable && <h2 className='columnTitle'>Cart</h2>}
                {order_type === 'eat_in' && <OrderEatInCart />}
                {order_type === 'delivery' && <OrderDeliveryCart />}
                {order_type === 'take_away' && <OrderTakeAwayCart />}
            </Grid>
            <>
                {
                    order_type === 'eat_in' ?
                        selectedTable &&
                        <>
                            <OrderDishesColumn />
                            <OrderMenuColumn />
                        </>
                        :
                        <>
                            <OrderDishesColumn />
                            <OrderMenuColumn />
                        </>
                }
            </>
        </Grid>
    )
}

import { Button, Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { BiMessageAltError } from 'react-icons/bi';
import { AdminOrderContext } from '../context/AdminOrderContext';
import OrderSearch from './OrderSearch';

export default function OrderMenuColumn() {
    const {isMenuLoading, menus, handleMenuClick} = useContext(AdminOrderContext)

    return (
        <Grid
            className='singleColumn'
            item xs={12} sm={12} md={2}
        >
            {/* COLUMN TITLE  */}
            <h2 className='columnTitle'>
                Menus
            </h2>

            {/* SEARCH BOX  */}
            <OrderSearch
                className='mainColumnContainer'
                placeholder={'Search Menu'}
                borderColor={'#F34D4D'}
            />

            {/* MENUS LIST  */}
            <Grid
                container
                spacing={{ xs: 2, sm: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {
                    isMenuLoading ?
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#aaa'
                                }}
                            >
                                {/* <BiMessageAltError style={{ fontSize: '3rem', }} /> */}
                                <span
                                    style={{ fontWeight: 'bold' }}
                                >
                                    Loading...
                                </span>
                            </div>
                        </div>
                        :
                        <>
                            {
                                (menus?.length > 0) ?
                                    <>
                                        {
                                            menus.map((menu, i) => (
                                                <Button
                                                    key={i}
                                                    onClick={() => handleMenuClick(menu?.id)} variant="contained"
                                                    className='menuCardButton2'
                                                >
                                                    {menu?.name}
                                                </Button>
                                            ))
                                        }
                                    </>
                                    :
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%,-50%)'
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#aaa'
                                            }}
                                        >
                                            <BiMessageAltError
                                                style={{ fontSize: '3rem', }}
                                            />
                                            <span
                                                style={{ fontWeight: 'bold',textAlign:'center' }}
                                            >
                                                Empty <br />
                                                Please Add a Menu
                                            </span>
                                        </div>
                                    </div>
                            }
                        </>
                }
            </Grid>
        </Grid>
    )
}

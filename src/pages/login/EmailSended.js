import { Box, Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import useStyles from "./styles";


export default function EmailSended() {
    var classes = useStyles();
    return (
        <Container component={Box}>
            <Toaster position="top-right" reverseOrder={false} />
            <Grid className={classes.container}>
                <Paper component={Box} p={3}>
                    <div style={{ width: '400px' }}>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} className={classes.form}>
                            <span style={{
                                width: '80px',
                                height: '80px',
                                backgroundImage: 'linear-gradient(to right, green , #00ff00)',
                                color: '#fff',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <MdOutlineMarkEmailRead
                                    style={{ fontSize: '3rem' }}
                                />
                            </span>
                            <h1 style={{ textAlign: 'center', marginTop: '20px' }} >Plase check your email!</h1>
                            <NavLink style={{ textAlign: 'center',color:'#fff',background:'#0575B4',padding:'10px 30px',borderRadius:'30px',marginTop:'20px' }} to={'/login'} >
                                Go to login page
                            </NavLink>
                        </div>

                    </div>
                </Paper>
            </Grid>
        </Container>
    )
}

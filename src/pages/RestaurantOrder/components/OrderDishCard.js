import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { FiCameraOff } from 'react-icons/fi'
import styles from './OrderDishCard.module.css'

export default function OrderDishCard({ handleDishClick, dis }) {
    return (
        <Grid item xs={2} sm={3} md={4} >
            <Button
                onClick={() => handleDishClick(dis?.id)}
                variant="contained"
                className='menuCardButton'
            >
                <span className={styles.imageContainer}>
                    {dis?.image ?
                        <img className={styles.image} src={`https://mughalsignandprint.co.uk/restaurant2/${dis?.image}`} alt="" />
                        :
                        <FiCameraOff style={{
                            marginRight: '10px',
                            fontSize: '2.5rem'
                        }} />
                    }
                </span>
                <span className={styles.title}>
                    <p>{dis?.name}</p>
                </span>
            </Button>
        </Grid>
    )
}

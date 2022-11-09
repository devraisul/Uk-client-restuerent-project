import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { FiCameraOff } from 'react-icons/fi'

export default function OrderDishCard({ handleDishClick, dis }) {
    return (
        <Grid item xs={2} sm={3} md={4} >
            <Button
                onClick={() => handleDishClick(dis?.id)}
                variant="contained"
                className='menuCardButton'
            >
                <span>
                    {dis?.image ?
                        <img src={`https://mughalsignandprint.co.uk/restaurant/${dis?.image}`} alt="" />
                        :
                        <FiCameraOff style={{
                            marginRight: '10px',
                            fontSize: '2.5rem'
                        }} />
                    }
                </span>
                <span>
                    <p>{dis?.name}</p>
                </span>
            </Button>
        </Grid>
    )
}

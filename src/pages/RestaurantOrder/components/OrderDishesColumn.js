import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { MdExpandMore } from 'react-icons/md';
import Popup from 'reactjs-popup';
import { AdminOrderContext } from '../context/AdminOrderContext';
import OrderDishCard from './OrderDishCard';
import './OrderDishesColumn.css';
import OrderEmpty from './OrderEmpty';
import OrderLoading from './OrderLoading';
import OrderSearch from './OrderSearch';

export default function OrderDishesColumn() {
    const {
        handleDishClick,
        isDishLoading,
        dishes,
        handleDishSearchInput,
        variationModalIsOpened,
        setvariationModalIsOpened,
        handleAddVariation,
        dishVariations,
        selectedVariations,
        addToCartWithVariation,
        handleRemoveVariation

    } = useContext(AdminOrderContext)

    return (
        <Grid className='singleColumn' item xs={2} sm={4} md={5} >

            {/* VARIATIONS POPUP  */}
            <Popup
                style={{ position: 'relative' }}
                open={variationModalIsOpened}
                closeOnDocumentClick onClose={() => { setvariationModalIsOpened(false) }}
            >
                <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>Select Variations</h4>
                {/* VARIATION CONTAINER  */}
                <div className='orderVariationContainer'>
                    {
                        dishVariations.map((vari, i) =>
                            // SINGLE VARIATION CARD 
                            <div key={i}>
                                <Accordion style={{ background: '#0575B4', marginBottom: '5px' }}>
                                    <AccordionSummary
                                        expandIcon={<MdExpandMore style={{ color: '#fff' }} />}
                                        aria-controls="panel2a-content"
                                        style={{ color: '#fff' }}
                                    >
                                        <Typography
                                            variant='h6'
                                        >{vari?.variation_type?.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails style={{
                                        background: '#ddd'
                                    }}>
                                        <Typography>
                                            {
                                                selectedVariations.filter(variation => variation?.id === vari?.id).length > 0 ?
                                                    <Button style={{ background: '#0575B4', color: '#fff' }} onClick={() => handleRemoveVariation(vari)}>
                                                        <BiMinus style={{ marginRight: '5px', fontWeight: 'bold', fontSize: '1.5rem' }} /> Unselect
                                                    </Button>
                                                    :
                                                    <Button style={{ background: '#eee', color: '#0575B4' }} onClick={() => handleAddVariation(vari)}>
                                                        <BiPlus style={{ marginRight: '5px', fontWeight: 'bold', fontSize: '1.5rem' }} /> Select
                                                    </Button>
                                            }

                                            <div style={{ marginTop: '10px', padding: '0px 5px' }}>
                                                <h5>Description:</h5>
                                                {vari?.variation_type?.description}
                                            </div>

                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    }
                </div>
                <Button className='OrderAddToCardButton' onClick={addToCartWithVariation}>
                    Add To Cart
                </Button>
            </Popup>

            {/* DISH CONTAINER  */}
            <>
                <h2 className='columnTitle'>Dishes</h2>

                {/* SEARCH BOX  */}
                <OrderSearch
                    placeholder={'Search Menu'}
                    borderColor={'#007ba1'}
                    handleSearchInput={handleDishSearchInput}
                />

                {/* DISHES GRID  */}
                <Grid
                    className='mainColumnContainer'
                    container
                    spacing={{ xs: 2, sm: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {
                        isDishLoading ? <OrderLoading /> :
                            !(dishes.length > 0) ? <OrderEmpty /> :
                                dishes.map((dis, i) => (
                                    <OrderDishCard
                                        key={i}
                                        handleDishClick={handleDishClick}
                                        dis={dis}
                                    />
                                ))
                    }
                </Grid>
            </>
        </Grid>
    )
}

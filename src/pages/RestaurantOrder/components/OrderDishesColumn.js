import { Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import { AdminOrderContext } from '../context/AdminOrderContext';
import OrderDishCard from './OrderDishCard';

import styles from './OrderDishesColumn.module.css';
import OrderEmpty from './OrderEmpty';
import OrderLoading from './OrderLoading';
import OrderSearch from './OrderSearch';
import OrderVariationSelection from './OrderVariationSelection';

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
        setSelectedVariations
    } = useContext(AdminOrderContext);
    
    const [isPopupOpened, setIsPopupOpened] = useState(false)


    return (
        <Grid className='singleColumn' item xs={12} sm={12} md={5} >

            {/* VARIATIONS POPUP  */}
            <Popup
                style={{ position: 'relative' }}
                open={variationModalIsOpened}
                closeOnDocumentClick onClose={() => {
                    setvariationModalIsOpened(false);
                    setSelectedVariations([])
                }} >
                <div className={styles.crossPopup}>
                    <button onClick={() => setvariationModalIsOpened(false)}>X</button>
                </div>
                <>
                    <OrderVariationSelection />
                </>
            </Popup>

            {/* DISH CONTAINER  */}
            <>
                <h2 className='columnTitle'>Dishes</h2>

                {/* SEARCH BOX  */}
                <OrderSearch
                    placeholder={'Search Menu'}
                    borderColor={'#007ba1'}
                    handleSearchInput={handleDishSearchInput} />

                {/* DISHES GRID  */}
                <Grid
                    className='mainColumnContainer'
                    container
                    spacing={{ xs: 2, sm: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }} >
                    {isDishLoading ? <OrderLoading /> :
                        !(dishes.length > 0) ?
                            <OrderEmpty />
                            :
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

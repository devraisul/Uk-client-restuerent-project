import { Button, Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import { AdminOrderContext } from '../context/AdminOrderContext';
import OrderDishCard from './OrderDishCard';

import styles from './OrderDishesColumn.module.css';
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

    } = useContext(AdminOrderContext);
    const [isPopupOpened, setIsPopupOpened] = useState(false)

    return (
        <Grid className='singleColumn' item xs={12} sm={12} md={5} >

            {/* VARIATIONS POPUP  */}
            <Popup
                style={{ position: 'relative' }}
                open={variationModalIsOpened}
                closeOnDocumentClick onClose={() => { setvariationModalIsOpened(false) }}
            >
                <div className={styles.crossPopup}>
              <button onClick={()=>setvariationModalIsOpened(false)}>X</button>
            </div>
                <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>Select Variations</h4>
                {/* VARIATION CONTAINER  */}
                {console.log(dishVariations)}
                <div className={styles.orderVariationContainer}>
                    <div className={styles.orderVariationContainer}>
                        {
                            dishVariations.map((variation, i) =>
                                // SINGLE VARIATION CARD 
                                <div key={i}>
                                    <h3 className={styles.variationDetails}>
                                        Select {variation?.variation_type?.name} - Choose up to: {variation?.no_of_varation_allowed}
                                    </h3>
                                    <div className={styles.variationSelectonContainer}>
                                        {
                                            variation?.variation_type?.variation.map(v => (
                                                <Button className={styles.variationAddButton}>{v.name}</Button>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <Button className={styles.OrderAddToCardButton} onClick={addToCartWithVariation}>
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

import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { MdDoNotDisturb } from 'react-icons/md'
import { AdminOrderContext } from '../context/AdminOrderContext'
import styles from './OrderVariationSelection.module.css'

export default function OrderVariationSelection() {
    const {
        handleAddVariation,
        dishVariations,
        selectedVariations,
        addToCartWithVariation,
        handleRemoveVariation
    } = useContext(AdminOrderContext);
    console.log({selectedVariations})
    return (
        <>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Select Variations</h2>
            {/* VARIATION CONTAINER  */}

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
                                    {variation?.variation_type?.variation.map(v => (
                                        <>
                                            {selectedVariations.filter(sv => sv?.variation?.id === v?.id).length > 0 ?
                                                (
                                                    <Button
                                                        onClick={() => handleRemoveVariation(v)}
                                                        className={styles.variationRemoveButton}>
                                                        <AiOutlineMinusCircle className={styles.variationRemoveButtonIcon} />
                                                        {v.name}
                                                    </Button>
                                                )
                                                :
                                                <>
                            
                                                    {(selectedVariations.filter(sv => sv?.type_id === v?.type_id).length===variation?.no_of_varation_allowed) ?
                                                        (<Button
                                                            title='Maximum variation already selected !'
                                                            disabled={true}
                                                            onClick={() => handleAddVariation(variation?.type_id,v)}
                                                            className={styles.variationDisabledButton}>
                                                            <MdDoNotDisturb
                                                                className={styles.variationDisabledButtonIcon} />
                                                            {v.name}
                                                        </Button>
                                                        )
                                                        :
                                                        (<Button
                                                            disabled={false}
                                                            onClick={() => handleAddVariation(variation?.type_id,v)}
                                                            className={styles.variationAddButton}>
                                                            <AiOutlinePlusCircle
                                                                className={styles.variationRemoveButtonIcon} />
                                                            {v.name}
                                                        </Button>
                                                        )
                                                    }
                                                </>
                                            }
                                        </>)
                                    )
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
        </>
    )
}

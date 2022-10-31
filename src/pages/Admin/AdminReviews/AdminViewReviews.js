import { Paper } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import './AdminViewReviews.css'
export default function AdminViewReviews() {
    const { restaurant_id } = useParams()

    const [reviewavg, setReviewavg] = React.useState();


    const GRADES2 = [
        ['Not Worth the price', 'Missed order notes', 'Unsustainable packing', 'Poorly packed'],
        ['Unsustainable packing', 'Poorly packed'],
        ['Not Worth the price', 'Poorly packed', 'Not so tasty', 'Too slow'],
        ['Not Worth the price', 'Missed order notes', 'Poorly packed', 'Not so tasty', 'Too slow'],
        ['Tasty food', 'Fast and reliable', 'Healthy', 'Good communication', 'Excellent quality', 'Great value']];

    return (
        <div>
            <div>
                <Paper className='viewRatingContainer1'>
                    <div className='reviewChild1'>
                        <h2>Velly Of Icecream</h2>
                        <div className='middle'>
                            <div>
                                <h3>4.5 ⭐</h3>
                                <span>based on 120 ratings</span> 
                            </div>
                            <div>Rating fom 20,2021</div>
                        </div>
                        <h4>👑 Top restaurant: 4.6 stars</h4>
                    </div>
                    <div className='reviewChild2'>

                        <div className="" >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '15px' }}>5 stars</p>
                                <div style={{ width: '80%' }} className="w3-light-grey">
                                    <div className="w3-container w3-green w3-center" style={{ 'width': `90%` }} >500
                                    </div>
                                </div>
                                <p style={{marginLeft: '15px'}}>340 </p>
                            </div>
                        </div>
                        <br />

                        <div className="" >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '15px' }}>4 stars</p>
                                <div style={{ width: '80%' }} className="w3-light-grey">
                                <div className="w3-container w3-green w3-center" style={{ 'width': `70%` }} >250
                                    </div>
                                </div>
                                <p style={{marginLeft: '15px'}}>200 </p>
                            </div>
                        </div>
                        <br />

                        <div className="" >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '15px' }}>3 stars</p>
                                <div style={{ width: '80%' }} className="w3-light-grey">
                                    <div className="w3-container w3-green w3-center" style={{ 'width': `60%` }} >100
                                    </div>
                                </div>
                                <p style={{marginLeft: '15px'}}>170 </p>
                            </div>
                        </div>
                        <br />

                        <div className="" >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '15px' }}>2 stars</p>
                                <div style={{ width: '80%' }} className="w3-light-grey">
                                    <div className="w3-container w3-green w3-center" style={{ 'width': `40%` }} >125
                                    </div>
                                </div>
                                <p style={{marginLeft: '15px'}}>100 </p>
                            </div>
                        </div>
                        <br />
                        <div className="" >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '15px' }}>2 stars</p>
                                <div style={{ width: '80%' }} className="w3-light-grey">
                                    <div className="w3-container w3-green w3-center" style={{ 'width': `0%` }} >125
                                    </div>
                                </div>
                                <p style={{marginLeft: '15px'}}>0</p>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
            <div></div>
        </div>
    )
}

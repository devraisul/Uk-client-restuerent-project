import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { MdDomain, MdOutlineDomainDisabled } from 'react-icons/md';
import { TbBuildingStore } from 'react-icons/tb';
import { getAllRestaurent } from '../../../Apis/Restaurent';
import TableTemplateForRestaurants from '../components/TableTemplateForRestaurants';
import './AdminAllRestaurant.css';

export default function AdminAllRestaurant() {
    // ALL STATES 
    const [restaurantTab, setRestaurantTab] = useState('allTab')
    const [restaurants, setRestaurants] = useState([])
    const [restaurantDataChanged, setRestaurantDataChanged] = useState(Math.random())

    // BUTTON HANDLE FUNCTIONS 
    const handleGoToAllRestTab = () => {
        setRestaurantTab('allTab')
    }
    const handleGoToEnabledRestTab = () => {
        setRestaurantTab('enabledTab')
    }
    const handleGoToDisabledRestTab = () => {
        setRestaurantTab('disabledTab')
    }



    useEffect(() => {
        // GET ALL RESTAURANTS 
        getAllRestaurent().then(res => {
            setRestaurants(res.restaurant);
        }).catch(err => {
            console.log(err);
        })
        console.log({restaurants});
    }, [restaurantTab,restaurantDataChanged])


    return (
        <div>
            {/* TAB BUTTONS  */}
            <div className="navButtonsContainer">
                <Button
                    style={{
                        background: `${restaurantTab === "allTab" ? '#0575B4' : "rgb(218, 218, 218)"}`,
                        color: `${restaurantTab === "allTab" ? '#fff' : "#000"}`
                    }}
                    onClick={handleGoToAllRestTab}>
                    <TbBuildingStore style={{
                        color: `${restaurantTab === "allTab" ? '#fff' : "#000"}`,
                        fontSize: '1.2rem',
                        marginRight: '10px'
                    }} /> All Restaurants
                </Button>
                <Button
                    style={{
                        background: `${restaurantTab === "enabledTab" ? '#0575B4' : "rgb(218, 218, 218)"}`,
                        color: `${restaurantTab === "enabledTab" ? '#fff' : "#000"}`
                    }}
                    onClick={handleGoToEnabledRestTab}>
                    <MdDomain style={{
                        color: `${restaurantTab === "enabledTab" ? '#fff' : "#000"}`,
                        fontSize: '1.2rem',
                        marginRight: '10px'
                    }} />
                    Enabled Restaurants
                </Button>
                <Button
                    style={{
                        background: `${restaurantTab === "disabledTab" ? '#0575B4' : "rgb(218, 218, 218)"}`,
                        color: `${restaurantTab === "disabledTab" ? '#fff' : "#000"}`
                    }}
                    onClick={handleGoToDisabledRestTab}>
                    <MdOutlineDomainDisabled style={{
                        color: `${restaurantTab === "disabledTab" ? '#fff' : "#000"}`,
                        fontSize: '1.2rem',
                        marginRight: '10px'
                    }} />
                    Disabled Restaurants
                </Button>
            </div>

            {/* TABLE CONTAINER  */}
            <div className="ListContainer">
                <h1>
                    {restaurantTab === 'allTab' && 'All Restaurants'}
                    {restaurantTab === 'enabledTab' && 'Enabled Restaurants'}
                    {restaurantTab === 'disabledTab' && 'Disabled Restaurants'}
                </h1>

                <TableTemplateForRestaurants
                setRestaurantDataChanged={setRestaurantDataChanged}
                    columns={[
                        { id: 'id', label: 'ID', minWidth: 170 },
                        { id: 'Name', label: 'Name', minWidth: 170 },
                        { id: 'totalTables', label: 'Total ables', minWidth: 170 },
                        { id: 'Status', label: 'Status', minWidth: 170 },
                    ]}
                    rows={
                        (restaurantTab === 'allTab' && restaurants) || 
                        (restaurantTab === 'enabledTab' && restaurants.filter(res=> res.Status === 'Active')) ||
                        (restaurantTab === 'disabledTab' && restaurants.filter(res=> res.Status === 'Inactive'))
                    }
                />
            </div>
        </div>
    )
}
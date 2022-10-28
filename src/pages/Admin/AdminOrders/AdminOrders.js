import { Button } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { BsCardChecklist } from 'react-icons/bs';
import { CgCalendarToday } from 'react-icons/cg';
import { getAllOrers } from '../../../Apis/Admin/Orders';
import TableTemplateForOrders from '../components/TableTemplateForOrders';
import './AdminOrders.css';

export default function AdminOrders() {
    // ALL STATES 
    const [ordersTab, setOrdersTab] = useState('allTab')
    const [orders, setOrders] = useState([])
    const [autoUpdate, setAutoUpdate] = useState(Math.random())
    const [orderDataChanged, setOrderDataChanged] = useState(Math.random())

    // BUTTON HANDLE FUNCTIONS 
    const handleGoToAllOrdersTab = () => {
        setOrdersTab('allTab')
    }
    const handleGoToTodaysOrdersTab = () => {
        setOrdersTab('todaysOrderTab')
    }

    useEffect(() => {
        setInterval(() => {
            setAutoUpdate(Math.random())
        }, 60000)
    }, [])

    useEffect(() => {
        // GET ALL ORDERS
        getAllOrers().then(res => {
            setOrders(res?.data);
            console.log('====================================');
            console.log(res?.data);
            console.log('====================================');
        }).catch(err => {
            console.log(err);
        })
    }, [ordersTab, autoUpdate, orderDataChanged])


    return (
        <div>
            {/* TAB BUTTONS  */}
            <div className="navButtonsContainer">
                <Button
                    style={{
                        background: `${ordersTab === "allTab" ? '#0575B4' : "rgb(218, 218, 218)"}`,
                        color: `${ordersTab === "allTab" ? '#fff' : "#000"}`
                    }}
                    onClick={handleGoToAllOrdersTab}>
                    <BsCardChecklist style={{
                        color: `${ordersTab === "allTab" ? '#fff' : "#000"}`,
                        fontSize: '1.2rem',
                        marginRight: '10px'
                    }} /> All Orders
                </Button>
                <Button
                    style={{
                        background: `${ordersTab === "todaysOrderTab" ? '#0575B4' : "rgb(218, 218, 218)"}`,
                        color: `${ordersTab === "todaysOrderTab" ? '#fff' : "#000"}`
                    }}
                    onClick={handleGoToTodaysOrdersTab}>
                    <CgCalendarToday style={{
                        color: `${ordersTab === "todaysOrderTab" ? '#fff' : "#000"}`,
                        fontSize: '1.2rem',
                        marginRight: '10px'
                    }} />
                    Todays Orders
                </Button>
            </div>

            {/* TABLE CONTAINER  */}
            <div className="ListContainer">
                <h1>
                    {ordersTab === 'allTab' && 'All Orders'}
                    {ordersTab === 'todaysOrderTab' && `Today's Orders`}
                </h1>

                <TableTemplateForOrders
                setOrderDataChanged={setOrderDataChanged}
                    columns={[
                        { id: 'id', label: 'ID', minWidth: 10 },
                        { id: 'created_at', label: 'Time', minWidth: 10 },
                        { id: 'customer_name', label: 'Customer Name', minWidth: 170 },
                        { id: 'status', label: 'Status', minWidth: 50 },
                        { id: 'table_number', label: 'Table No', minWidth: 50 },
                        { id: 'amount', label: 'Amount', minWidth: 50 },
                    ]}
                    rows={
                        (ordersTab === 'allTab' && orders) ||
                        (ordersTab === 'todaysOrderTab' && orders.filter(res => moment(res.created_at).format('L') === moment(new Date()).format('L')))
                    }
                />
            </div>
        </div>
    )
}

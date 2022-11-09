
import React, { useContext } from 'react';
import { AdminOrderContext } from '../context/AdminOrderContext';



export default function OrderRecipt() {
    const { pdfRef } = useContext(AdminOrderContext)
    return (
        <div ref={pdfRef}>
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
        </div>
    )
}

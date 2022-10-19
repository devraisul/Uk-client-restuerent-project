import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { BsGear } from 'react-icons/bs';

function OrderTableRow({order_id,table_no,order_status,order_time,order_amount,actions}) {
    return (
        
            <TableRow>
                <TableCell>{order_id}</TableCell>
                <TableCell>{table_no}</TableCell>
                <TableCell>{order_status}</TableCell>
                <TableCell>{order_time}</TableCell>
                <TableCell>{order_amount}</TableCell>
                <TableCell>
                    <button>
                        <BsGear />
                    </button>
                </TableCell>
            </TableRow>

    )
}

export default OrderTableRow
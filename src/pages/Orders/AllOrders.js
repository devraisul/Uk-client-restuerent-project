import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import * as React from 'react';
import { useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { allOrders } from '../../Apis/Order';
import Loading from '../../components/Loading/Loading';

function createData(id, order_type, status, order_date, amount, customer_id, customer_name, customer_phone, customer_address, table_number, dishes) {
    return {
        id,
        order_type,
        status,
        order_date: moment(order_date).format('LLL'),
        amount,
        table_number,
        dishes,
        customer_id,
        customer_name,
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow style={{ background: '#e6f5fe' }} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="center">{row.order_type}</TableCell>

                {(row.status === 'Processing') && (
                    <TableCell style={{ color: '#ff8000', }} align="center">
                        <span style={{ padding: '3px 15px', background: '#ffcc99', borderRadius: '30px', width: '200px' }}>
                            {row.status}
                        </span>
                    </TableCell>
                )}
                {row.status === 'Complete' && (
                    <TableCell style={{ color: '#00cc00', }} align="center">
                        <span style={{ padding: '3px 15px', background: '#b3ffb3', borderRadius: '30px', width: '200px' }}>
                            {row.status}
                        </span>
                    </TableCell>
                )}
                {row.status === 'pending' && (
                    <TableCell style={{ color: '#aaa', }} align="center">
                        <span style={{ padding: '3px 15px', background: '#ddd', borderRadius: '30px', width: '200px' }}>
                            {row.status}
                        </span>
                    </TableCell>
                )}

                <TableCell align="center">{row.order_date}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">
                    <Button title='options'><BsThreeDotsVertical /></Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h5" color={'#0575B4'} gutterBottom component="div">
                                Details
                            </Typography>
                            <Box width={'200px'} marginBottom={'20px'}>
                                <Typography variant="h6">Customer details</Typography>
                                <Table style={{ margin: '10px 10px' }}>
                                    <TableBody>
                                        <TableRow>
                                            <td><strong>ID :</strong></td>
                                            <td>{row?.customer_id || 'N/A'}</td>
                                        </TableRow>
                                        <TableRow>
                                            <td><strong>Name :</strong></td>
                                            <td>{row?.customer_name || 'N/A'}</td>
                                        </TableRow>
                                        <TableRow>
                                            <td><strong>Phone :</strong></td>
                                            <td>{row?.customer_phone || 'N/A'}</td>
                                        </TableRow>
                                        <TableRow>
                                            <td><strong>Address :</strong></td>
                                            <td>{row?.customer_address || 'N/A'}</td>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>a</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {row.dishes.map((dishe) => (
                                        <TableRow key={dishe.id}>
                                            <TableCell>a</TableCell>
                                            <TableCell component="th" scope="row">

                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right">

                                            </TableCell>
                                        </TableRow>
                                    ))} */}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


const TYPES = [
    // 'Take Away',
    'Dine In',
    // 'Delivery',
]
const STATUS = [
    'Processing',
    'Complete',
    'Pending',
]
const rows = [];

export default function CollapsibleTable() {
    const [isLoading, setIsLoading] = React.useState(true)

    useEffect(() => {
        allOrders().then((res) => {
            setIsLoading(true)
            res?.data.map(order => {
                rows.push(createData(order?.id, order?.type, order?.status, order?.created_at, order?.amount, order?.customer_id, order?.customer_name, order?.customer_phone, order?.customer_address, order?.table_number, order?.detail))
            });
        }).then(() => {
            setIsLoading(false)
        }).catch(err => { console.log(err); })
    }, [])

    return (
        <>
            {isLoading ? <Loading /> :
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow style={{ background: '#0575B4' }} >
                                <TableCell />
                                <TableCell style={{ color: '#fff', fontWeight: 'bold' }} align="center">Order ID</TableCell>
                                <TableCell style={{ color: '#fff', fontWeight: 'bold' }} align="center">Order Type</TableCell>
                                <TableCell style={{ color: '#fff', fontWeight: 'bold' }} align="center">Order Status</TableCell>
                                <TableCell style={{ color: '#fff', fontWeight: 'bold' }} align="center">Order Time</TableCell>
                                <TableCell style={{ color: '#fff', fontWeight: 'bold' }} align="center">Order Amount</TableCell>
                                <TableCell style={{ color: '#fff', fontWeight: 'bold' }} align="center">Order Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.id} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
        </>

    );
}

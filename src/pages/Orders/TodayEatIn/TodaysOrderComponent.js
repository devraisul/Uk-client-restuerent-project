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
import { BiDish } from 'react-icons/bi';
import { BsFillPersonFill, BsThreeDotsVertical } from 'react-icons/bs';
import { allOrders } from '../../../Apis/Order';
import Loading from '../../../components/Loading/Loading';


import styles from './TodaysOrderComponent.module.css';




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
            <TableRow style={{ background: '#e6f5fe', width: '100%' }} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)} >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="center">{row.order_date}</TableCell>
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
                    <TableCell style={{ color: '#fff', }} align="center">
                        <span style={{ padding: '3px 15px', background: '#aaa', borderRadius: '30px', width: '200px' }}>
                            {row.status}
                        </span>
                    </TableCell>
                )}
                <TableCell align="center">
                    {row.customer_name}
                </TableCell>
                <TableCell align="center">
                    {row.customer_phone ? row.customer_phone : '02948493849'}
                </TableCell>
                <TableCell align="center">
                    <Button title='Kitchen Copy'>
                        <BiDish style={{ color: '#aaa', fontSize: '1.5rem' }} />
                    </Button>
                    <Button title='Customer Copy'>
                        <BsFillPersonFill style={{ color: '#aaa', fontSize: '1.5rem' }} />
                    </Button>
                </TableCell>
                <TableCell align="center">
                    {row.amount}
                </TableCell>
                <TableCell align="center">
                    <Button title='options'>
                        <BsThreeDotsVertical />
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow style={{ width: '100%' }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
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
                            <TableContainer component={Box}>
                                <Table style={{ width: "100%" }} size="small" aria-label="customized table">
                                    <TableHead>
                                        <TableRow style={{ background: '#0575B4' }}>
                                            <TableCell align="center" className={styles.orderSummury}>
                                                #
                                            </TableCell>
                                            <TableCell align="center" className={styles.orderSummury}>
                                                Dish Details
                                            </TableCell>
                                            <TableCell align="center" className={styles.orderSummury}>
                                                Variation Details
                                            </TableCell>
                                            <TableCell align="center" className={styles.orderSummury} >
                                                Quantity
                                            </TableCell>
                                            <TableCell align="center" className={styles.orderSummury}>
                                                Price ($)
                                            </TableCell>
                                            <TableCell align="center" className={styles.orderSummury}>
                                                Total price ($)
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.dishes.map((dish, index) => (
                                            <TableRow>
                                                <TableCell align="center">{1}</TableCell>
                                                <TableCell align="center">{dish?.dish?.name}</TableCell>
                                                <TableCell style={{display:"flex",justifyContent:'center',alignItems:'center'}}>

                                                    {/* <TableContainer component={Paper}>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Variation</TableCell>
                                                                    <TableCell>Price</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {<TableRow>
                                                                    <TableCell>Coca Cola</TableCell>
                                                                    <TableCell>     20</TableCell>
                                                                </TableRow>}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer> */}
                                                    <Box>
                                                        <Typography>
                                                            Options:
                                                            <ol style={{ marginLeft: "40px" }}>
                                                                <li>7Up</li>
                                                                <li>Test</li>
                                                            </ol>
                                                        </Typography>
                                                    </Box>

                                                </TableCell>
                                                <TableCell align="center">{dish?.qty}</TableCell>
                                                <TableCell align="center">{2}</TableCell>
                                                <TableCell align="center" rowSpan={row?.dishes.length}>
                                                    200
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}




export default function TodaysOrderComponent({ type }) {
    const [rows, setRows] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    useEffect(() => {

        setRows([])
        allOrders().then((res) => {
            setIsLoading(true);
            console.log({ res })
            res?.data.map(order => {
                setRows([...rows, createData(order?.id, order?.type, order?.status, order?.created_at, order?.amount, order?.customer_id, order?.customer_name, order?.customer_phone, order?.customer_address, order?.table_number, order?.detail)])
            });
        }).then(() => {
            setIsLoading(false)
        }).catch(err => { console.log(err); })
    }, [])

    return (
        <div className={styles.orderTableContainer}>
            <div className={styles.searchInputContainer}>
                <input className={styles.searchInput} placeholder='search' type="text" />
            </div>
            <h1 className={styles.pageTitle}>{type === 'eat_in' ? 'Eat In' : type === 'delivery' ? 'Delivery' : 'Take Away'}</h1>
            {isLoading ? <Loading /> :
                <TableContainer className={styles.tableContainer} component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow style={{ background: '#0575B4' }} >
                                <TableCell />
                                <TableCell className={styles.orderSummury} >Order ID</TableCell>
                                <TableCell className={styles.orderSummury}>Order Time</TableCell>
                                <TableCell className={styles.orderSummury}>Status</TableCell>
                                <TableCell className={styles.orderSummury}>Customer Name</TableCell>
                                <TableCell className={styles.orderSummury}>Customer Phone</TableCell>
                                <TableCell className={styles.orderSummury}>Print</TableCell>
                                <TableCell className={styles.orderSummury}>Amount</TableCell>
                                <TableCell className={styles.orderSummury}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 ? rows.map((row) => (
                                <Row key={row.id} row={row} />
                            )) :
                                <TableRow>
                                    <TableCell colSpan={9} style={{ textAlign: 'center', fontSize: '1.5rem' }}>No Data Found!</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>}
        </div>

    );
}


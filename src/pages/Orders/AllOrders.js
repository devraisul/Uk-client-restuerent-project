import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import * as React from 'react';

function createData(name, calories, fat, carbs, protein, price, actions) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        actions,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
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
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>

                {(row.fat == 'Processing') &&
                    <TableCell style={{ color: '#ff8000', }} align="center"><span style={{ padding: '3px 15px', background: '#ffcc99',borderRadius:'30px',width:'200px' }}>{row.fat}</span></TableCell>
                }
                {row.fat == 'Complete' && (
                    <TableCell style={{ color: '#00cc00', }} align="center"><span style={{ padding: '3px 15px', background: '#b3ffb3',borderRadius:'30px',width:'200px' }}>{row.fat}</span></TableCell>
                )}
                {row.fat == 'Pending' && (
                    <TableCell style={{ color: '#aaa', }} align="center"><span style={{ padding: '3px 15px', background: '#ddd',borderRadius:'30px',width:'200px' }}>{row.fat}</span></TableCell>
                )}

                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center">{row.actions}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
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
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell>a</TableCell>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};
const TYPES = [
    'Take Away',
    'Dine In',
    'Delivery',
]
const STATUS = [
    'Processing',
    'Complete',
    'Pending',
]
const rows = [
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),
    createData(
        `#${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`,
        `${TYPES[Math.floor(Math.random() * (TYPES.length))]}`,
        `${STATUS[Math.floor(Math.random() * (STATUS.length))]}`,
        `${moment(new Date()).format('LLL')}`,
        `${Math.floor(Math.random() * (2000 - 10 + 1)) + 10}`,
        0,
        0
    ),

];

export default function CollapsibleTable() {
    return (
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
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

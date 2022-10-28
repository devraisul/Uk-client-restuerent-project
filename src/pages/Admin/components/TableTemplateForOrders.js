import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Popup from 'reactjs-popup';
import { deleteOrerById, getOrerByOrderId } from '../../../Apis/Admin/Orders';
import Loading from '../../../components/Loading/Loading';
import './TableTemplateForOrders.css';

export default function TableTemplateForOrders({ columns, rows, setOrderDataChanged }) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);

    const [isViewOpened, setIsViewOpened] = useState(false)
    const [viewIsLoading, setViewIsLoading] = useState(false)
    const [singleOrder, setSingleOrder] = useState({})



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleOrderDelete = (id) => {
        deleteOrerById(id).then(res => {
            console.log(res);
            setOrderDataChanged(Math.random())
        })
    }
    const handleOrderEdit = (id) => {
        console.log('edit', id);
    }
    const handleOrderView = (id) => {
        setOpen(true)
        setViewIsLoading(true)
        setIsViewOpened(true)
        getOrerByOrderId(id).then(res => {
            setSingleOrder(res.data);
            console.log(res.data);
        }).then(() => {
            setViewIsLoading(false)
        }).catch(err => console.log(err))
    }



    const handleSetTaken = () => {

    }
    const handleSetComplete = () => {

    }
    const handleSetCancel = () => {

    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {isViewOpened &&
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    {viewIsLoading ? <Loading /> :
                        <div className='dishDetailsContainer'>
                            <div className='detailsContainer'>
                                <div>
                                    <span className='qoutation'>
                                        ID :
                                    </span>
                                    <span>
                                        {singleOrder?.id}
                                    </span>
                                    <br />
                                    <span className='qoutation'>
                                        Place Date :
                                    </span>
                                    <span>
                                        {moment(singleOrder?.created_at).format('ll')}
                                    </span>
                                    <br />
                                    <span className='qoutation'>
                                        Place Time :
                                    </span>
                                    <span>
                                        {moment(singleOrder?.created_at)?.format('LT')}
                                    </span>
                                    <br />
                                    <span className='qoutation'>
                                        Customer Name :
                                    </span>
                                    <span>
                                        {singleOrder?.customer_name}
                                    </span>
                                    <br />
                                    <span className='qoutation'>
                                        Table No :
                                    </span>
                                    <span>
                                        {singleOrder?.table_number}
                                    </span>
                                    <br />
                                    <span className='qoutation'>
                                        Type :
                                    </span>
                                    <span>
                                        {singleOrder?.type}
                                    </span>
                                    <br />
                                    <span className='qoutation'>
                                        Status :
                                    </span>
                                    {singleOrder?.status === "pending" &&
                                        <span className='detailsStatusPending'>
                                            {singleOrder?.status}
                                        </span>
                                    }
                                    <br />
                                </div>
                                <div>
                                    <span className='qoutation' style={{ fontSize: '1.2rem', color: '#0575B4' }}>
                                        Amount :
                                    </span>
                                    <span style={{ fontSize: '1.2rem', color: '#0575B4' }}>
                                        £ {singleOrder?.amount}
                                    </span>
                                    <br />
                                    <span className='qoutation'>
                                        Restaurant :
                                    </span>
                                    <span >
                                        {singleOrder?.restaurant?.Name}
                                    </span>
                                    <br />
                                    <span className='qoutation'>
                                        Adress :
                                    </span>
                                    <span >
                                        {singleOrder?.restaurant?.Address}
                                    </span>
                                    <br />
                                    <span className='qoutation'>
                                        Email :
                                    </span>
                                    <span >
                                        {singleOrder?.restaurant?.EmailAddress}
                                    </span>
                                    <br />
                                    <span className='qoutation'>
                                        Phone :
                                    </span>
                                    <span >
                                        {singleOrder?.restaurant?.PhoneNumber}
                                    </span>
                                    <br />
                                </div>
                            </div>
                            <div className='dishes'>
                                <h3 style={{ marginBottom: '10px' }}>Dishes: </h3>
                                <TableContainer className='orderTable' >
                                    <Table sx={{ minWidth: 150 }} stickyHeader aria-label="sticky table">
                                        <TableHead >
                                            <TableRow >
                                                <TableCell
                                                    style={{
                                                        color: '#fff',
                                                        background: '#0575B4'
                                                    }}>Name</TableCell>
                                                <TableCell
                                                    style={{
                                                        color: '#fff',
                                                        background: '#0575B4'
                                                    }}
                                                    align="left">Image</TableCell>
                                                <TableCell
                                                    style={{
                                                        color: '#fff',
                                                        background: '#0575B4'
                                                    }}
                                                    align="left">Price</TableCell>
                                                <TableCell
                                                    style={{
                                                        color: '#fff',
                                                        background: '#0575B4'
                                                    }}
                                                    align="left">Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                singleOrder?.detail.map(order =>
                                                    order?.dish.map(row =>
                                                        <TableRow
                                                            key={row.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {row?.name}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <img className='dishImage' src={`https://mughalsignandprint.co.uk/restaurant/${row?.image}`} alt={row?.name} />
                                                            </TableCell>
                                                            <TableCell align="left">{row?.price}</TableCell>
                                                            <TableCell align="left">{order?.qty}</TableCell>
                                                        </TableRow>
                                                    )
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </div>
                            <div className='buttonContainer'>
                                <button>Take</button>
                                <button>Complete</button>
                                <button>Cancel</button>
                            </div>
                        </div>
                    }
                </Popup>
            }
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead  >
                        <TableRow style={{ background: '#0575B4', color: '#fff' }}>
                            {columns.map((column) => (
                                <TableCell
                                    style={{ background: '#0575B4', color: '#fff', minWidth: column.minWidth, textAlign: 'center' }}
                                    key={column.id}
                                    align={column.align}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell style={{ background: '#0575B4', color: '#fff', minWidth: 50, textAlign: 'center' }} >Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (rows.length > 0) ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell style={{ textAlign: 'center' }} key={column.id} align={column.align}>
                                                    {value ?
                                                        <>
                                                            {column?.id !== 'created_at' ?
                                                                <>
                                                                    {column?.id !== 'status' ?
                                                                        <>
                                                                            {column.format && typeof value === 'number' ?
                                                                                column.format(value)
                                                                                :
                                                                                value
                                                                            }
                                                                        </>
                                                                        :
                                                                        <>
                                                                            {
                                                                                (
                                                                                    value === 'pending' &&
                                                                                    <span className='statusPending'>
                                                                                        {value}
                                                                                    </span>
                                                                                )
                                                                            }
                                                                        </>
                                                                    }
                                                                </> :
                                                                <>
                                                                    {
                                                                        moment(value).startOf('minuite').fromNow()
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                        : 'N/A'
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell style={{ textAlign: 'center' }}>

                                            <div className='optionsContainer'>
                                                <button onClick={() => { handleOrderView(row?.id) }} title='View Details' ><AiOutlineEye style={{ color: '' }} /></button>
                                                <button onClick={() => { handleOrderEdit(row?.id) }} title='Edit'><BiEdit style={{ color: '#0575B4' }} /></button>
                                                <button onClick={() => { handleOrderDelete(row?.id) }} title='Delete'><MdDelete style={{ color: '#ff0000' }} /></button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            }) : (
                                <TableRow hover role="checkbox">
                                    <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan={columns.length + 1}>
                                        No Data Found!
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

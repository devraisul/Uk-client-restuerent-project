import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { HiOutlineMailOpen, HiOutlinePhone } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import Popup from 'reactjs-popup';
import { getUserById } from '../../../Apis/Admin/User';
import Loading from '../../../components/Loading/Loading';
import './TableTemplateForReviews.css';

export default function TableTemplateForReviews({ columns, rows, setRestaurantDataChanged }) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);


    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [isViewOpened, setIsViewOpened] = useState(false)
    const [viewIsLoading, setViewIsLoading] = useState(false)

    const [singleCustomer, setSingleCustomer] = useState({})


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleRestaurantsDelete = (id) => {
        console.log('delete', id);
        setRestaurantDataChanged(Math.random())
    }
    const handleRestaurantsEdit = (id) => {
        console.log('edit', id);
    }
    const handleRestaurantsView = (id) => {
        setOpen(true)
        setViewIsLoading(true)
        setIsViewOpened(true)
        getUserById(id).then(res => {
            setSingleCustomer(res.data.user);
            console.log(res.data.user);
        }).then(() => {
            setViewIsLoading(false)
        }).catch(err => console.log(err))
    }


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {isViewOpened &&
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    {viewIsLoading ? <Loading /> :
                        <div className='userDetailsContainer'>
                            <span className='userId'>ID : {singleCustomer.id}</span>
                            <div className='detailsMainContainer'>
                                <img className='avatar' src={singleCustomer?.image !== null ? singleCustomer?.image : "/customerAvater.jpg"} alt={singleCustomer?.first_Name} />
                                <h2 className='name'>
                                    {`${singleCustomer.first_Name} ${singleCustomer?.last_Name === null ? "" : singleCustomer?.last_Name}`}
                                </h2>
                                <p className='email'><HiOutlineMailOpen style={{color:'#0575b4'}} /> {singleCustomer?.email}</p>
                                <p className='phone'><HiOutlinePhone style={{color:'#0575b4'}} /> {singleCustomer?.phone}</p>
                                <p className='address'>
                                    {singleCustomer?.Address !== null &&
                                        <>
                                            <TbAddressBook style={{color:'#0575b4'}} />  singleCustomer?.Address
                                        </>
                                    }
                                </p>
                                <p className='scence'>
                                Scence : {moment(singleCustomer?.created_at).format('LL')}
                                </p>
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
                                                            {column?.id !== 'Status' ?
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
                                                                            value === 'Inactive' &&
                                                                            <span className='statusInactive'>
                                                                                {value}
                                                                            </span>
                                                                        ) || (
                                                                            value === 'Active' &&
                                                                            <span className='statusActive'>
                                                                                {value}
                                                                            </span>
                                                                        )
                                                                    }
                                                                </>
                                                            }

                                                        </>
                                                        : 'N/A'
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell style={{
                                            textAlign: 'center'
                                        }}>
                                            <div className='optionsContainer'>
                                                <button onClick={() => { handleRestaurantsView(row?.id) }} title='View Details' ><AiOutlineEye style={{ color: '' }} /></button>
                                                <button onClick={() => { handleRestaurantsEdit(row?.id) }} title='Edit'><BiEdit style={{ color: '#0575B4' }} /></button>
                                                <button onClick={() => { handleRestaurantsDelete(row?.id) }} title='Delete'><MdDelete style={{ color: '#ff0000' }} /></button>
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

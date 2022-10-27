import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Popup from 'reactjs-popup';
import './TableTemplateForRestaurants.css';

export default function TableTemplateForRestaurants({ columns, rows, setRestaurantDataChanged }) {
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [isViewOpened, setIsViewOpened] = useState(false)
    const [viewIsLoading, setViewIsLoading] = useState(false)
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
        setIsViewOpened(true);
        setViewIsLoading(true)
        
    }


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {isViewOpened &&
                <Popup>

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

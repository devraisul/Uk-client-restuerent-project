import { Button, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import './TableTemplateForRatingQuestions.css';





const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ffc31f',
    },
    '& .MuiRating-iconHover': {
        color: '#ffc14d',
    },
});


export default function TableTemplateForRatingQuestions({ columns, tags, rows, setRestaurantDataChanged, setQuestions }) {
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [isViewOpened, setIsViewOpened] = useState(false)
    const [viewIsLoading, setViewIsLoading] = useState(false)
    const [SingleRattingId, setSingleRattingId] = useState()
    const [isSubmitedSuccessfully, setIsSubmitedSuccessfully] = useState(false)


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [ratingValue, setRatingValue] = useState(0)
    const [selectedTags, setSelectedTags] = useState([])



    useEffect(() => {
        setSelectedTags([])
    }, [ratingValue])

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);



    const handleSelectTag = (id, name) => {

        if (selectedTags.filter(i => i.id === id).length > 0) {
            console.log(id);
            setSelectedTags(selectedTags.filter(i => i.id !== id))
        } else {
            setSelectedTags([...selectedTags, { id, name }])
        }
    }



    const handleOpenStarMadal = (id) => {
        setSelectedTags([])
        setSingleRattingId(id)
        setOpen(true)
        setIsViewOpened(true)
    }
    const handleSubmit = (id) => {
        rows.map(question => {
            if (question?.id === id) {
                question.rating = ratingValue.toString()
                question.tag = selectedTags
            }
        })
        setIsSubmitedSuccessfully(true)
        setTimeout(() => {
            setOpen(false)
            setIsSubmitedSuccessfully(false)
        }, 2000);
    }
    const [hover, setHover] = React.useState(-1);
    const labels = {
        0: [{ id: '1', name: 'Bad food' }, { id: '2', name: 'Tangy' }, { id: '3', name: 'Broken' }],
        1: [{ id: '1', name: 'Bad food' }, { id: '2', name: 'Tangy' }, { id: '4', name: 'Bad service' }, { id: '5', name: 'Unhealthy food' }, { id: '6', name: 'Unhealthy environment' }],
        2: [{ id: '7', name: 'Tasteless food' }, { id: '2', name: 'Tangy' }, { id: '3', name: 'Broken' }],
        3: [{ id: '7', name: 'Tasteless food' }, { id: '8', name: 'Good decoration' }, { id: '4', name: 'Bad service' }],
        4: [{ id: '9', name: 'Good food' }, { id: '10', name: 'Good behaviour' }, { id: '11', name: 'Bad decoratin' }],
        5: [{ id: '9', name: 'Good food' }, { id: '12', name: 'Excelant behaviour' }, { id: '13', name: 'Mindblowing decoration' }],
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {isViewOpened &&
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>

                    {isSubmitedSuccessfully ?
                        <div className='popupContainer'>
                            <h2>Rating Submited Successfully ✅</h2>
                        </div>
                        :
                        <div className='popupContainerMain'>
                            <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Give your star.</h2>
                            <div className='formStarContainer'>
                                <StyledRating
                                    style={{
                                        marginBottom: '50px'
                                    }}
                                    onChange={(event, newValue) => {
                                        setRatingValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    name="customRatting"
                                    defaultValue={0}
                                    icon={<FaStar className="fillStar" style={{ fontSize: '4rem', margin: '0px 5px' }} />}
                                    emptyIcon={<FaRegStar className='gapStar' style={{ fontSize: '4rem', margin: '0px 5px' }} />}
                                />
                                {ratingValue !== null && (
                                    <div className='ratingTag' sx={{ ml: 2 }}>
                                        {labels[ratingValue].map((tag) => (
                                            <Button onClick={() => handleSelectTag(tag?.id, tag?.name)} style={{
                                                background: `${selectedTags.filter(i => i.id === tag?.id).length > 0 ? '#0575B4' : '#fff'}`,
                                                color: `${selectedTags.filter(i => i.id === tag?.id).length > 0 ? '#fff' : '#0575B4'}`
                                            }} className="tagName">{tag?.name}</Button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Button onClick={() => handleSubmit(SingleRattingId)} style={{ background: '#0575B4', color: '#fff', fontWeight: 'bold' }}>Submit</Button>
                        </div>}

                </Popup>
            }
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead  >
                        <TableRow style={{ background: '#0575B4', color: '#fff' }}>
                            {columns.map((column) => (
                                <TableCell
                                    style={{ background: '#0575B4', color: '#fff', minWidth: column.minWidth, }}
                                    key={column.id}
                                    align={column.align}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell style={{ background: '#0575B4', color: '#fff', minWidth: 50, textAlign: 'center' }} >Edit</TableCell>
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
                                                <TableCell style={{ textAlign: 'left' }} key={column.id} align={column.align}>
                                                    {value ?
                                                        <>
                                                            {
                                                                column.id === 'rating' ?
                                                                    (
                                                                        <>
                                                                            {value === '0' && <div className='stars'>
                                                                                <p style={{ color: '#aaa', fontSize: '1rem' }}>You haven't rated yet</p>
                                                                            </div>
                                                                            }
                                                                            {value === '1' && <div className='stars'>
                                                                                <FaStar className="fillStar" />
                                                                                <FaRegStar className='gapStar' />
                                                                                <FaRegStar className='gapStar' />
                                                                                <FaRegStar className='gapStar' />
                                                                                <FaRegStar className='gapStar' />
                                                                            </div>}
                                                                            {value === '2' && <div className='stars'>
                                                                                <FaStar className="fillStar" />
                                                                                <FaStar className="fillStar" />
                                                                                <FaRegStar className='gapStar' />
                                                                                <FaRegStar className='gapStar' />
                                                                                <FaRegStar className='gapStar' />
                                                                            </div>}
                                                                            {value === '3' && <div className='stars'>
                                                                                <FaStar className="fillStar" />
                                                                                <FaStar className="fillStar" />
                                                                                <FaStar className="fillStar" />
                                                                                <FaRegStar className='gapStar' />
                                                                                <FaRegStar className='gapStar' />
                                                                            </div>}
                                                                            {value === '4' && <div className='stars'>
                                                                                <FaStar className="fillStar" />
                                                                                <FaStar className="fillStar" />
                                                                                <FaStar className="fillStar" />
                                                                                <FaStar className="fillStar" />
                                                                                <FaRegStar className='gapStar' />

                                                                            </div>}
                                                                            {value === '5' && <div className='stars'>
                                                                                <FaStar className="fillStar" />
                                                                                <FaStar className="fillStar" />
                                                                                <FaStar className="fillStar" />
                                                                                <FaStar className="fillStar" />
                                                                                <FaStar className="fillStar" />
                                                                            </div>}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {
                                                                                column.id === 'tag' ?
                                                                                    (
                                                                                        <>
                                                                                            {value.length>0?
                                                                                                value.map(tag => (
                                                                                                    <div style={{
                                                                                                        padding: '5px 5px',
                                                                                                        background: '#ddd',
                                                                                                        margin: '2px 0px',
                                                                                                        borderRadius: '5px'
                                                                                                    }}>
                                                                                                        {tag?.name}
                                                                                                    </div>
                                                                                                )):
                                                                                                'N/A'
                                                                                            }
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            {
                                                                                                column.format && typeof value === 'number' ?
                                                                                                    column.format(value)
                                                                                                    :
                                                                                                    value
                                                                                            }
                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </>
                                                                    )
                                                            }

                                                        </>
                                                        : 'N/A'
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell style={{
                                            textAlign: 'center',
                                            minWidth: 10
                                        }}>
                                            <div className='optionsContainer'>
                                                <button onClick={() => { handleOpenStarMadal(row?.id) }} title='Edit'><BiEdit style={{ color: '#0575B4' }} /></button>
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

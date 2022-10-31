import { Accordion, AccordionDetails, AccordionSummary, Button, styled, Typography } from '@material-ui/core';
import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { FaRegStar, FaStar } from 'react-icons/fa';
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



    const handleSelectTag = (id, name, handleSubmit) => {
        if (selectedTags.filter(i => i.id === id).length > 0) {
            console.log(id);
            setSelectedTags(selectedTags.filter(i => i.id !== id));
            handleSubmit(SingleRattingId)
        } else {
            setSelectedTags([...selectedTags, { id, name }]);
            handleSubmit(SingleRattingId)
        }
    }




    const handleOpenStarMadal = (id) => {
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



    const [expanded, setExpanded] = React.useState();

    const handleChange = (id) => (event, newExpanded) => {
        handleOpenStarMadal(id)
        setExpanded(newExpanded ? id : false);
    };
    return (
        <>
            <div>
                {
                    rows.map(question =>
                        <Accordion style={{ marginBottom: '2px', borderRadius: '10px', overflow: 'hidden' }} expanded={expanded === question?.id} onChange={handleChange(question?.id)}>
                            <AccordionSummary style={{ background: '#0575B4', color: '#fff' }} aria-controls="panel1d-content" id="panel1d-header">
                                <Typography className='accordingTitle' variant='h5'>
                                    <span>
                                        {question?.id} {question?.question}
                                    </span>
                                    <span>{expanded === question?.id ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}</span>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='popupContainerMain'>
                                    <h2 style={{ textAlign: 'center', margin: '30px 0px' }}>Give your star.</h2>
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
                                                    <Button onClick={() => handleSelectTag(tag?.id, tag?.name, handleSubmit)} style={{
                                                        background: `${selectedTags.filter(i => i.id === tag?.id).length > 0 ? '#0575B4' : '#fff'}`,
                                                        color: `${selectedTags.filter(i => i.id === tag?.id).length > 0 ? '#fff' : '#0575B4'}`
                                                    }} className="tagName">{tag?.name}</Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )
                }

                <label className='remarkInputLabel' htmlFor="remarks">Remarks (optional)</label>

                <textarea className='remarkInput' id='remarks' type="text" placeholder='remarks' />
                <div className='submitRetingButtonCContainer'>
                    <input className='ratingSubmitButton' type="submit" />
                </div>
            </div>



        </>
    )
}

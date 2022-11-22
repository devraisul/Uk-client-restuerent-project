import { Accordion, AccordionDetails, AccordionSummary, styled, Typography } from '@material-ui/core';
import { Button, Rating } from '@mui/material';
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
    const [ratingValue, setRatingValue] = useState(0)
    const [selectedTags, setSelectedTags] = useState([])
    // SUBMISSION DATA 
    const [submisionData, setSubmisionData] = useState({
        description: "",
        restaurant_id: 1,
        rate: ratingValue,
        comment: "",
        values: selectedTags
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        setSelectedTags([])
    }, [ratingValue])

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);



    const handleSelectTag = (question_id, tag_id, star_value, handleSubmit) => {
        if (selectedTags.filter(i => i?.tag_id === tag_id).length > 0) {
            setSelectedTags(selectedTags.filter(i => i?.tag_id !== tag_id));
            handleSubmit(SingleRattingId)
        } else {
            setSelectedTags([...selectedTags, {
                question_id,
                tag_id,
                star_id: star_value
            }]);
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
                question.stars = selectedTags
            }
        })
        setIsSubmitedSuccessfully(true)
        setTimeout(() => {
            setOpen(false)
            setIsSubmitedSuccessfully(false)
        }, 2000);
    }

    const [hover, setHover] = React.useState(-1);

    const [expanded, setExpanded] = React.useState();

    const handleChange = (id) => (event, newExpanded) => {
        handleOpenStarMadal(id)
        setExpanded(newExpanded ? id : false);
    };
    return (
        <>
            <div>
                {
                    rows.map((question, i) =>
                        <Accordion key={i} style={{ marginBottom: '2px', borderRadius: '10px', overflow: 'hidden' }} expanded={expanded === question?.id} onChange={handleChange(question?.id)}>
                            <AccordionSummary style={{ background: '#0575B4', color: '#fff' }} aria-controls="panel1d-content" id="panel1d-header">
                                <Typography className='accordingTitle' variant='h5'>
                                    {/* {console.log(question)} */}
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
                                                {question?.stars.find(star => star.value === ratingValue)?.tags.map((tag, i) => (
                                                    <Button
                                                        key={i}
                                                        onClick={() => handleSelectTag(question?.id, tag?.id, question?.stars.find(star => star.value === ratingValue)?.value,handleSubmit)}
                                                        style={{
                                                            background: `${selectedTags.filter(i => i.id === tag?.id).length > 0 ? '#0575B4' : '#fff'}`,
                                                            color: `${selectedTags.filter(i => i.id === tag?.id).length > 0 ? '#fff' : '#0575B4'}`
                                                        }}
                                                        className="tagName">
                                                        {tag?.tag}
                                                    </Button>
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

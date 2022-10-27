import { Button } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';

import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

import { Star, StarBorderOutlined } from '@material-ui/icons';
import TableTemplateForRatingQuestions from './components/TableTemplateForRatingQuestions';
import './Ratting.css';


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ffc31f',
    },
    '& .MuiRating-iconHover': {
        color: '#ffc14d',
    },
});
export default function Ratting() {
    const [ratingValue, setRatingValue] = useState(0)
    const [SingleRattingId, setSingleRattingId] = useState('')
    const [isSubmitedSuccessfully, setIsSubmitedSuccessfully] = useState(false)


    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const history = useHistory()


    const handleGoBack = () => {
        history.goBack()
    }
    const handleOpenStarMadal = (id) => {
        setSingleRattingId(id)
        setOpen(true)
    }
    const handleSubmit = () => {
        setIsSubmitedSuccessfully(true)
        setTimeout(() => {
            setOpen(false)
            setIsSubmitedSuccessfully(false)
        }, 2000);
    }
    return (
        <div className='rattingContainer'>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>

                {isSubmitedSuccessfully ?
                    <div className='popupContainer'>
                        <h2>Rating Submited Successfully ✅</h2>
                    </div>
                    :
                    <div className='popupContainer'>
                        <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Give your star.</h2>
                        <StyledRating
                            style={{
                                marginBottom: '50px'
                            }}
                            name="customRatting"
                            defaultValue={0}
                            icon={<Star style={{ fontSize: '5rem' }} />}
                            emptyIcon={<StarBorderOutlined style={{ fontSize: '5rem' }} />}
                        />
                        <Button onClick={handleSubmit} style={{ background: '#0575B4', color: '#fff', fontWeight: 'bold' }}>Submit</Button>
                    </div>}

            </Popup>
            <div className="nav">
                <ul>
                    <li><Button style={{ color: '#0575B4', fontWeight: 'bold' }} onClick={handleGoBack}><IoArrowBack style={{ marginRight: '5px' }} /> Go Back</Button></li>
                </ul>
            </div>
            <h1 style={{ textAlign: 'center', color: '#aaa' }}>Give your rating to improve our services.</h1>
            <div className="ratingQuestionsContainer">
                <TableTemplateForRatingQuestions
                    columns={[
                        { id: 'question', label: 'Question', minWidth: 170 },
                        { id: 'rating', label: 'Your Rating', minWidth: 50 },
                    ]}
                    rows={[{ question: 'lorem', rating: '0' }]}
                />
            </div>
        </div>
    );
}

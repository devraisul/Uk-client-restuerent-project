import { Button } from '@material-ui/core';
import * as React from 'react';
import { IoArrowBack } from 'react-icons/io5';

import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getReviewAllWithLinkedTags } from '../../Apis/Review';
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

    const [questions, setQuestions] = useState([])

    useEffect(()=>{
        getReviewAllWithLinkedTags(1).then((res)=>{
            console.log({res});
            setQuestions(res.map(question=>{
                return { id: question?.id, question: question?.question, rating: '0', stars: question?.stars }
            }))
        })
    },[])

    const history = useHistory()


    const handleGoBack = () => {
        history.goBack()
    }
    return (
        <div className='rattingContainer'>

            <div className="nav">
                <ul>
                    <li><Button style={{ color: '#0575B4', fontWeight: 'bold' }} onClick={handleGoBack}><IoArrowBack style={{ marginRight: '5px' }} /> Go Back</Button></li>
                </ul>
            </div>
            <h1 style={{ textAlign: 'center', color: '#aaa' }}>Give your rating to improve our services.</h1>
            <div className="ratingQuestionsContainer">
                <TableTemplateForRatingQuestions
                    columns={[
                        { id: 'question', label: 'Question', minWidth: 370 },
                        { id: 'rating', label: 'Your Rating', minWidth: 5 },
                        { id: 'tag', label: 'Tag', minWidth: 5 },
                    ]}
                    setQuestions={setQuestions}
                    rows={questions}
                />
            </div>
        </div>
    );
}

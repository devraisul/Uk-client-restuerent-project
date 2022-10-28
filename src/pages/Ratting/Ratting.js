import { Button } from '@material-ui/core';
import * as React from 'react';
import { IoArrowBack } from 'react-icons/io5';

import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    const [questions, setQuestions] = useState([
        { id: 1, question: 'Rate delivery service.', rating: '0', tag: [] },
        { id: 2, question: 'Rate decoration', rating: '0', tag: [] },
        { id: 3, question: 'Rate welcome drinks', rating: '0', tag: []},
        { id: 4, question: 'Rate drinks', rating: '0', tag: [] },
        { id: 5, question: 'Rate dishes', rating: '0', tag: [] },
        { id: 6, question: `Rate wayter's behaviour`, rating: '0', tag: [] },
    ])
    const [tags, setTags] = useState([
        {id:'1',name:'Bad food'},
        {id:'2',name:'Tangy'},
        {id:'3',name:'Broken'},
        {id:'4',name:'Bad service'},
        {id:'5',name:'Unhealthy food'}, 
        {id:'6',name:'Unhealthy environment'},
        {id:'7',name:'Tasteless food'},
        {id:'8',name:'Good decoration'},
        {id:'9',name:'Good food'}, 
        {id:'10',name:'Good behaviour'}, 
        {id:'11',name:'Bad decoratin'},
        {id:'12',name:'Excelant behaviour'}, 
        {id:'13',name:'Mindblowing decoration'}
    ])
    useEffect(()=>{
        console.log('====================================');
        console.log(questions);
        console.log('====================================');
    },[questions])
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
                    tags={tags}
                    rows={questions}
                />
            </div>
        </div>
    );
}

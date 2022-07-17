import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReactStars from 'react-rating-stars-component';
import { addReview } from '../../Apis/Review';
import { useAuth } from '../../context/AuthContext';

const AddReviewTag = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0)
    const id = user.restaurant[0].id;
    const ratingChanged = (newRating) => {
        setRating(newRating);
    };
    const handleReview = (e) => {
        e.preventDefault();
        const data = {
            "reviewvalue": [
                { "tag": e.target.tag.value }
            ]
        }
        addReview(id, rating, data)
            .then(res => {
                toast.success('Review Tag Added!')
            })
    }
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div>
                <h1>Add Review Tag</h1>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={50}
                    activeColor="#ffd700"
                />
                <form onSubmit={handleReview}>
                    <TextField required name="tag" id="filled-basic" variant="filled" /><br />
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <Button type='submit' style={{ background: "#6600FF", color: "white" }} variant="contained">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReviewTag;
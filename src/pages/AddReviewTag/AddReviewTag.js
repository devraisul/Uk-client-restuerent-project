import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { addReview, getRestaurentReview } from "../../Apis/Review";
import { useAuth } from "../../context/AuthContext";

const AddReviewTag = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState()
  const [rand, setRand] = useState(Math.random())
  const id = user.restaurant[0].id;
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    getRestaurentReview()
  }, [rand])
  
  const handleReview = (e) => {
    e.preventDefault();
    const data = {
      reviewvalue: [{ tag: e.target.tag.value }],
    };
    console.log(data);
    addReview(id, rating, data).then((res) => {
      toast.success("Review Tag Added!");
    }).then(()=>{
        setRand(Math.random())
    });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection:'column'}}>
      <Toaster position="top-right" reverseOrder={false} />
      <div style={{
        display:'flex',
        flexDirection:'column',
        justifyontent:'center',
        alignItems:'center'
      }}>
        <h1>Add Review Tag</h1>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={50}
          activeColor="#ffd700"
        />
        <form onSubmit={handleReview}>
          <TextField required name="tag" id="filled-basic" variant="filled" />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              type="submit"
              style={{ background: "#6600FF", color: "white" }}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div
        style={{
          backgroundColor: "red",
        }}
      >
        <Table className="mb-0">
      <TableHead>
        <TableRow>
          <TableCell>Tag</TableCell>
          <TableCell>Rating</TableCell>
          <TableCell>Show</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reviewData?.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="pl-3 fw-normal">{item?.name}</TableCell>
            <TableCell>{item?.description}</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell>
              {/* <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      </div>
    </div>
  );
};

export default AddReviewTag;

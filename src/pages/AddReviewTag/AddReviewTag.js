import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addReview, getReviewAll } from "../../Apis/Review";
import { useAuth } from "../../context/AuthContext";

const AddReviewTag = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState([])
  const [rand, setRand] = useState(Math.random())
  const [formDefaultValue, setFormDefaultValue] = useState("")


  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('data'))?.restaurant[0]?.id
    getReviewAll(id).then((res) => {
      setReviewData(res?.data)
    }).catch(err => {
      console.log(err);
    })
  }, [rand])

  const handleReview = (e) => {
    const id = JSON.parse(localStorage.getItem('data'))?.restaurant[0]?.id
    e.preventDefault();
    const data = {
      question: formDefaultValue,
      restaurant_id: id,
      is_active: 1
    };
    console.log('data-->', data);
    addReview(id, data).then((res) => {
      toast.success("Review Tag Added!");
      setFormDefaultValue("")
    }).then(() => {
      setRand(Math.random())
    });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
      <Toaster position="top-right" reverseOrder={false} />
      {/* <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyontent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ marginBottom: '20px' }}>Add Review Question</h1>
        <form onSubmit={handleReview}>
          <TextField onChange={event => setFormDefaultValue(event.target.value)} value={formDefaultValue} required name="question" id="filled-basic" placeholder="Review Que" variant="filled" />
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
              style={{ background: '#536DFE', color: "white", width: '100%', marginBottom: '50px' }}
              variant="contained" >
              Submit
            </Button>
          </div>
        </form>
      </div> */}
      <div >
        <h1 style={{
          textAlign: 'center',
          marginBottom: '20px'
        }} >Your Question</h1>
        <Table style={{
          background: '#ccc',
          textAlign: 'center'
        }} className="mb-0"
        >
          <TableHead style={{
            textAlign: 'center'
          }}>
            <TableRow style={{
              background: '#536DFE'
            }}>
              <TableCell style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                borderBottom: '3px solid #fff'
              }}>
                No
              </TableCell>
              <TableCell style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                borderBottom: '3px solid #fff'
              }}>
                Question
              </TableCell>
              <TableCell style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                borderBottom: '3px solid #fff'
              }}>
                Status
              </TableCell>
              <TableCell style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                borderBottom: '3px solid #fff'
              }}>
                Options
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewData?.map((item, index) => (
              <TableRow style={{
                textAlign: 'center',
                background: '#AFBBFF',

              }} key={index}>
                <TableCell style={{
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  {index}
                </TableCell>
                <TableCell style={{
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  {item?.question}
                </TableCell>
                <TableCell style={{
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  {item?.is_active ? 'Public' : 'Private'}
                </TableCell>
                <TableCell style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {
                    item?.is_active ?

                      <button onClick={()=>{}} style={{
                        padding: "5px 10px",
                        width: '100px',
                        background: '#536DFE',
                        margin: '0px 2px',
                        borderRadius: '30px',
                        color: 'white'
                      }}>Hide</button>
                      :
                      <button onClick={()=>{}} style={{
                        padding: "5px 10px",  
                        width: '100px',
                        background: '#536DFE',
                        margin: '0px 2px',
                        borderRadius: '30px',
                        color: 'white'
                      }}>Public</button>
                  }
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

import { Table, TableBody, TableCell, TableHead, TableRow,Button,TextField } from "@material-ui/core";
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
      <div style={{
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
      </div>
      <div >
        <h1 style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#0575B4'
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
              background: '#0575B4'
            }}>
              <TableCell style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                borderBottom: '3px solid #ccc'
              }}>
                No
              </TableCell>
              <TableCell style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                borderBottom: '3px solid #ccc'
              }}>
                Question
              </TableCell>
              <TableCell style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                borderBottom: '3px solid #ccc'
              }}>
                Status
              </TableCell>
              <TableCell style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                borderBottom: '3px solid #ccc'
              }}>
                Options
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewData?.map((item, index) => (
              <TableRow style={{
                textAlign: 'center',
                background: '#fff',

              }} key={index}>
                <TableCell style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  border: "1px solid #ccc"
                }}>
                  {index}
                </TableCell>
                <TableCell style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  border: "1px solid #ccc"
                }}>
                  {item?.question}
                </TableCell>
                <TableCell style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  border: "1px solid #ccc"
                }}>
                  {item?.is_active ? 'Public' : 'Private'}
                </TableCell>
                <TableCell style={{
                  textAlign: 'center',
                  fontWeight: '600',

                  border: "1px solid #ccc",
                }}>
                  {
                    item?.is_active ?
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}>
                        <button onClick={() => { }} style={{
                          padding: "5px 10px",
                          width: '100px',
                          background: '#0575B4',
                          margin: '0px 2px',
                          borderRadius: '30px',
                          color: 'white',
                          textAlign: 'center'
                        }}>
                          Hide
                        </button>
                      </div>


                      :
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}>
                        <button onClick={() => { }} style={{
                          padding: "5px 10px",
                          width: '100px',
                          background: '#0575B4',
                          margin: '0px 2px',
                          borderRadius: '30px',
                          color: 'white'
                        }}>
                          Public
                        </button>
                      </div>

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

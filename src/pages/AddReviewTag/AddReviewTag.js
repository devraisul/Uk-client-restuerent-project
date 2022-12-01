import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import { CloseOutlined, Dashboard } from "@material-ui/icons";
import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AiFillTag } from 'react-icons/ai';
import { BiEdit, BiMemoryCard } from 'react-icons/bi';
import { BsPatchQuestionFill } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { NavLink } from "react-router-dom";

import Popup from "reactjs-popup";
import { addReview, deleteSingleQuestion, editSingleQuestion, editSingleTag, getAllTag, getReviewAll, postTag } from "../../Apis/Review";
import Loading from '../../components/Loading/Loading';
import AddQuestion from "./AddQuestion/AddQuestion";

import styles from './AddReviewTag.module.css';
import EditQuestion from "./EditQuestion/EditQuestion";






const AddReviewTag = () => {
  const restaurant_id = JSON.parse(localStorage.getItem('data'))?.restaurant[0]?.id
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // REVIEW DATAS 
  const [allQuestion, setAllQuestion] = useState([])
  const [allQuestionsWithTags, setAllQuestionsWithTags] = useState({})
  const [singleQuestion, setSingleQuestion] = useState()
  const [allTag, setAllTag] = useState([])

  // ADD MODE 
  const [addMode, setAddMode] = useState(false)

  // UPDATE DETECT 
  const [isQuestionUpdated, setIsQuestionUpdated] = useState(Math.random())
  const [isTagUpdated, setIsTagUpdated] = useState(Math.random())
  const [isTabChanged, setIsTabChanged] = useState(Math.random())

  // POPUP 
  const [popupIsOpend, setPopupIsOpend] = useState(false)
  const [addPopupIsOpend, setAddPopupIsOpend] = useState(false)

  // LOADINGS 
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)
  const [isLoadingTag, setIsLoadingTag] = useState(true)
  const [isPopupLoading, setIsPopupLoading] = useState(true)

  // TABS 
  const [isOnQuestionTab, setIsOnQuestionTab] = useState(true)
  const [isOnTagTab, setIsOnTagTab] = useState(false)


  // EDITING STATES 
  const [editQuestion, setEditQuestion] = useState({
    mode: false,
    id: '',
    question: '',
    serial: ''
  })
  const [editTag, setEditTag] = useState({
    mode: false,
    id: '',
    tag: ''
  })



  // HANDLE TOGGLE TABS 
  const onQuestionTab = () => {
    setIsOnQuestionTab(true)
    setIsOnTagTab(false)
    setAddMode(false)
    setIsTabChanged(Math.random())
  }
  const onTagTab = () => {
    setIsOnQuestionTab(false)
    setIsOnTagTab(true)
    setAddMode(false)
    setIsTabChanged(Math.random())
  }


  // GET QUESTIONS 
  useEffect(() => {
    setIsLoadingQuestion(true)
    getReviewAll(restaurant_id)
      .then((res) => {
        setAllQuestion(res?.data)
        setAllQuestionsWithTags(res)
        setIsLoadingQuestion(false)
      }).catch(err => {
        console.log(err);
      })
  }, [isQuestionUpdated, isTabChanged])

  // EDIT QUESTION 
  useEffect(() => {
    editQuestion?.mode && setPopupIsOpend(true)
    !editQuestion?.mode && setPopupIsOpend(false)
  }, [editQuestion])

  // GET TAGS  
  useEffect(() => {
    const page_no = 1
    setIsLoadingTag(true)
    getAllTag(restaurant_id, page_no)
      .then(res => {
        setAllTag(res?.data);
        setIsLoadingTag(false)
      }).catch(err => console.log(err))
  }, [isTagUpdated, isTabChanged])


  // ADD QUESTION
  const onSubmitAddQuestion = (data) => {
    const id = JSON.parse(localStorage.getItem('data'))?.restaurant[0]?.id
    data.restaurant_id = id
    data.is_active = 1
    addReview(id, {
      question: data.question,
      restaurant_id: data.restaurant_id,
      is_active: data.is_active
    }).then((res) => {
      toast.success("Question Added Successfully!");
    }).then(() => {
      setIsQuestionUpdated(Math.random())
      setAddMode(false)
    });
  };
  // ADD TAG
  const onSubmitAddTag = (data) => {
    console.log(data);
    const id = JSON.parse(localStorage.getItem('data'))?.restaurant[0]?.id
    data.restaurant_id = id
    postTag({
      tag: data.tag,
      restaurant_id: data.restaurant_id
    }).then((res) => {
      toast.success("Tag Added Successfully!");
    }).then(() => {
      setIsTagUpdated(Math.random())
      setAddMode(false)
    });
  };



  // UPDATE QUESTION 
  const handleQuestionUpdate = (question_id, current_status, restaurant_id, question) => {
    editSingleQuestion({
      id: question_id,
      is_active: !current_status,
      restaurant_id: restaurant_id,
      question: question
    }).then((res) => {
      setIsQuestionUpdated(Math.random())
      setEditQuestion({
        mode: false,
        id: '',
        question: ''
      })
    })
  }
  // UPDATE TAG 
  const handleTagUpdate = (tag_id, tag) => {
    var data = {
      id: tag_id,
      tag: tag
    }
    editSingleTag(data)
      .then((res) => {
        if (res?.data?.id) {
          setIsQuestionUpdated(Math.random())
          setEditTag({
            mode: false,
            id: '',
            tag: ''
          })
        }
      }).catch(err => console.log(err))
  }
  // DELETE QUESTION 
  const handleDeleteQuestion = (id) => {
    deleteSingleQuestion(id).then(res=>{
      if(res?.data?.message){
        setIsQuestionUpdated(Math.random())
        toast.success('Question deleted successfully.')
      }
    })
  }


  return (
    <>
      {/* Add POPUP  */}
      <Popup open={addPopupIsOpend} closeOnDocumentClick onClose={() => { setAddPopupIsOpend(false) }} >
        <AddQuestion
          setAddPopupIsOpend={setAddPopupIsOpend}
          setIsQuestionUpdated={setIsQuestionUpdated}
        />
      </Popup>
      {/* EDIT POPUP  */}
      <Popup open={popupIsOpend} closeOnDocumentClick onClose={() => { setPopupIsOpend(false) }} >
        <EditQuestion
          allQuestionStars={allQuestionsWithTags[editQuestion?.serial]}
          editQuestion={editQuestion}
          setEditQuestion={setEditQuestion}
          setPopupIsOpend={setPopupIsOpend}
          setIsQuestionUpdated={setIsQuestionUpdated}
        />
      </Popup>

      <Toaster position="top-right" reverseOrder={false} />

      <>
        {!addMode &&
          <div
            className={`btn-center ${styles.navContainer}`} >
            <button
              title='Add Menu'
              className={`large btn ${styles.navButton}`}
              onClick={onQuestionTab}>
              <BsPatchQuestionFill className={styles.navIcon} />
              <span className={styles.menuNav}>
                Questions
              </span>
            </button>
            <button
              title='All Menu'
              className={`large btn ${styles.navButton}`}
              onClick={onTagTab}
            >
              <AiFillTag className={styles.navIcon} />
              <span
                className={styles.menuNav} >
                Tags
              </span>
            </button>

            <NavLink
              to={'/app/app/dashboard'}
              title='Back to dashboard'
              className={`large btn ${styles.navButton}`} >
              <Dashboard className={styles.navIcon} />
              <span className={styles.menuNav} >
                Dashboard
              </span>
            </NavLink>
          </div>
        }
        <>
          {isOnQuestionTab &&
            <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <h1 className={styles.title}> Your Question </h1>
                {/* ADD QUESTION BUTTON  */}
                <>
                  {
                    !addPopupIsOpend &&
                    <button onClick={() => setAddPopupIsOpend(true)} title='All Menu' className={`large btn ${styles.navButton}`} >
                      <Add className={styles.navIcon} />
                      <span className={styles.menuNav} > Add Question </span>
                    </button>
                  }
                </>

                {/* QUESTION TABLE  */}
                {isLoadingQuestion ?
                  <Loading />
                  :
                  <Table className={`mb-0 ${styles.table}`}>
                    <TableHead className={styles.tableHead}>
                      <TableRow className={styles.tableHeaderRow}>
                        <TableCell minWidth={'25%'} className={styles.tableHeaderCell}>
                          No
                        </TableCell>
                        <TableCell minWidth={'25%'} className={styles.tableHeaderCell}>
                          Question
                        </TableCell>
                        <TableCell minWidth={'25%'} className={styles.tableHeaderCell}>
                          Status
                        </TableCell>
                        <TableCell minWidth={'25%'} className={styles.tableHeaderCell}>
                          Options
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={styles.tableBody}>
                      {(allQuestion.length > 0) ?
                        <>
                          {allQuestion?.map((item, index) => (
                            <TableRow className={styles.tableBodyRow} key={index} >
                              <TableCell className={styles.tableBodyCell}>
                                {index + 1}
                              </TableCell>
                              <TableCell className={styles.tableBodyCell}>
                                {
                                  item?.question
                                }
                              </TableCell>
                              <TableCell className={styles.tableBodyCell}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                  }}>
                                  {item?.is_active ? 'Public' : 'Private'}
                                </div>
                              </TableCell>
                              <TableCell className={styles.optionCell}>
                                <Button
                                  onClick={() => {
                                    setEditQuestion({
                                      mode: true,
                                      id: item?.id,
                                      question: item?.question,
                                      serial: index
                                    });
                                    setPopupIsOpend(true)
                                  }}
                                  className={styles.editButtonDiv}
                                  title='Edit'>
                                  <BiEdit />
                                </Button>
                                <Button
                                  onClick={() => { handleDeleteQuestion(item?.id) }} 
                                  className={styles.deleteButtonDiv}
                                  title='Delete'>
                                  <MdOutlineDelete />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                        :
                        <>
                          <TableRow>
                            <TableCell colSpan={4}>
                              <h2 className={styles.notFoundTitle}>No Data Found!</h2>
                            </TableCell>
                          </TableRow>
                        </>
                      }
                    </TableBody>
                  </Table>}
              </div>
            </div>
          }
          {isOnTagTab &&
            <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
              {addMode &&
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyontent: 'center',
                    alignItems: 'center',
                    marginBottom: '50px'
                  }}
                >
                  <h1 style={{ marginBottom: '20px' }}>Add Tag</h1>
                  <form
                    style={{
                      display: 'flex',
                      width: '500px',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    onSubmit={handleSubmit(onSubmitAddTag)} >
                    <TextField
                      style={{
                        width: '300px',
                        marginRight: '5px'
                      }}
                      required
                      name="tag"
                      id="filled-basic"
                      label="Review Tag"
                      placeholder="Review Tag"
                      variant="outlined"
                      {...register("tag")} />

                    <Button
                      type="submit"
                      style={{
                        padding: '15px 30px',
                        color: '#fff',
                        backgroundColor: '#0575B4'
                      }}
                      variant="contained" >
                      Add
                    </Button>

                  </form>
                </div>
              }
              <div style={{ position: 'relative' }}>
                <h1
                  style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: '#0575B4',
                  }}
                >Your Tags</h1>

                {/* ADD QUESTION BUTTON  */}
                {!addMode &&
                  <Button style={{
                    background: '#0575B4',
                    color: '#fff',
                    position: 'absolute',
                    right: 0,
                    top: 0
                  }}
                    onClick={() => setAddMode(true)} >
                    <Add /> Add Tag
                  </Button>
                }
                {addMode &&
                  <Button style={{
                    background: '#ff2200',
                    color: '#fff',
                    position: 'absolute',
                    right: 0,
                    top: 0
                  }}
                    onClick={() => setAddMode(false)}>
                    <CloseOutlined /> Close
                  </Button>}



                {isLoadingTag ? <Loading />
                  :
                  <Table
                    style={{
                      background: '#ccc',
                      textAlign: 'center'
                    }} className="mb-0" >
                    <TableHead
                      style={{
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
                        }}

                        >
                          No
                        </TableCell>
                        <TableCell style={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: 'white',
                          borderBottom: '3px solid #ccc'
                        }}>
                          Tag
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
                      {allTag?.map((item, index) => (
                        <TableRow
                          style={{
                            textAlign: 'center',
                            background: '#fff',
                          }}
                          key={index}
                        >
                          <TableCell style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            border: "1px solid #ccc"
                          }}>
                            {index + 1}
                          </TableCell>

                          <TableCell style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            border: "1px solid #ccc"
                          }}>
                            <input
                              type={'text'}
                              disabled={(editTag.mode && editTag.id === item?.id) ? false : true}
                              style={{
                                width: '100%',
                                fontSize: '1rem',
                                padding: '5px 10px',
                                outline: 'none',
                                background: '#fff',
                                borderTop: 'none',
                                borderRight: 'none',
                                borderLeft: 'none',
                                borderBottom: (editTag.mode && editTag.id === item?.id) ? '2px solid #0575B4' : 'none',
                                fontWeight: 'bold'
                              }}
                              onChange={(e) => { editTag.tag = e.target.value }}
                              defaultValue={item?.tag}
                            />
                          </TableCell>

                          <TableCell style={{
                            textAlign: 'center',
                            border: "1px solid #ccc",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>

                            {
                              !(editTag.id === item?.id) &&
                              <Button
                                onClick={() => {
                                  setEditTag({
                                    mode: true,
                                    id: item?.id,
                                    tag: item?.question
                                  })
                                }}
                                style={{
                                  padding: "5px 10px",
                                  width: '100px',
                                  background: '#0575B4',
                                  margin: '0px 2px',
                                  borderRadius: '30px',
                                  color: 'white'
                                }}>
                                Edit
                              </Button>
                            }
                            {
                              editTag.mode === true && editTag.id === item?.id &&
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}
                              >
                                <Button
                                  onClick={() => { handleTagUpdate(item?.id, editTag.tag) }}
                                  style={{
                                    padding: "5px 10px",
                                    width: '100px',
                                    background: '#0575B4',
                                    margin: '0px 2px',
                                    borderRadius: '30px',
                                    color: 'white',
                                    marginBottom: '10px'
                                  }}
                                >
                                  <BiMemoryCard style={{ marginRight: '5px' }} /> Save
                                </Button>
                                <Button
                                  onClick={() => {
                                    setEditTag({
                                      mode: false,
                                      id: '',
                                      tag: ''
                                    })
                                  }}
                                  style={{
                                    padding: "5px 10px",
                                    width: '100px',
                                    background: '#ff1100',
                                    margin: '0px 2px',
                                    borderRadius: '30px',
                                    color: 'white'
                                  }}>
                                  Cancel
                                </Button>
                              </div>
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>}
              </div>
            </div>
          }
        </>
      </>

    </>
  );
};

export default AddReviewTag;

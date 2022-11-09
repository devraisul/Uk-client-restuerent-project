import { Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import { editSingleQuestion, getSingleQuestion } from '../../../Apis/Review';
import Loading from '../../../components/Loading/Loading';

export default function EditReviewTag() {
  const { id } = useParams()
  const userInfo =JSON.parse(localStorage.getItem("data"));

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const history = useHistory()
 
  const [singleQuestion, setSingleQuestion] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSingleQuestion(id).then((res) => {
      setSingleQuestion(res.data);
      setIsLoading(false)
    })
  }, [id])

  const onSubmit = data => {
    data.id = id
    data.restaurant_id = (userInfo?.restaurant[0]?.id);
    editSingleQuestion(data)
    .then(res=>{
      toast.success("Question Updated Successfully!")
    })
    .then(()=>{
      setTimeout(() => {
        history.goBack()
      }, 1000);
    })
    .catch(err=>console.log(err))
  };
  return (
    <>
      {isLoading?
      <Loading />
      :
        <div>
          <Toaster position="top-right" reverseOrder={false} />
          <Button onClick={() => history.goBack()} style={{ color: '#fff', background: '#0575B4' }}>
            <ArrowBack /> Go Back
          </Button>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '70vh'
          }}>
            {singleQuestion !== undefined &&
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50%'
                }}
              >
                <h1 style={{ textAlign: 'center', color: '#aaa' }}>Edit Question</h1>
                <input
                  style={{
                    width: '100%',
                    padding: '20px 30px',
                    marginTop: '20px',
                    fontSize: '1.1rem'
                  }}
                  {...register("question")}
                  type="text"
                  defaultValue={singleQuestion?.question}
                  placeholder="Edit Question Tag"
                />
                <select
                  style={{
                    width: '100%',
                    padding: '20px 30px',
                    marginTop: '20px',
                    fontSize: '1.1rem'
                  }}
                  {...register("is_active")}
                  type="text"
                  placeholder="Edit Status"
                  defaultValue={singleQuestion?.is_active}
                >
                  <option value={0}>Private</option>
                  <option value={1}>Public</option>
                </select>
                <input
                  style={{
                    width: '100%',
                    padding: '20px 30px',
                    marginTop: '20px',
                    fontSize: '1.1rem',
                    color: '#fff',
                    background: '#0575B4',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  type="submit"
                  value={'submit'}
                />
              </form>}
          </div>
        </div>
      }
    </>
 
  )
}

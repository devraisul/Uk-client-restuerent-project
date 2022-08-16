import React from 'react';
import { Fragment } from 'react';
import Star from './Star';
import './showReviews.css'
import { getReview, getReviewAll, getReviewRate } from '../../Apis/Review';
import { useAuth } from '../../context/AuthContext';
const ShowReviews = () => {
  const { user } = useAuth();
  const [reviewavg, setReviewavg] = React.useState();
  const [reviews, setReviews] = React.useState();

  React.useEffect(() => {
    getReview(user.restaurant[0].id, '2022-2-2', '2022-2-2')
      .then(res => {
        setReviewavg(res)
      })
    // getReviewAll(user.restaurant[0].id)
    //   .then(res => {
    //     (res)
    //   })
  }, [user]);
  console.log(reviewavg);
  console.log(reviews);
  const [gradeIndex, setGradeIndex] = React.useState(0);
  const [All, setAll] = React.useState(false);
  const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  const activeStar = {
    fill: 'yellow'
  };
  const GRADES2 = [
    ['Not Worth the price', 'Missed order notes', 'Unsustainable packing', 'Poorly packed'],
    ['Unsustainable packing', 'Poorly packed'],
    ['Not Worth the price', 'Poorly packed', 'Not so tasty', 'Too slow'],
    ['Not Worth the price', 'Missed order notes', 'Poorly packed', 'Not so tasty', 'Too slow'],
    ['Tasty food', 'Fast and reliable', 'Healthy', 'Good communication', 'Excellent quality', 'Great value']];
  const changeGradeIndex = (index) => {
    getReviewRate(9, index)
      .then(res => {
        setReviews(res);
      })

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // setAlert('Review given', 'success');

  }
  return (
    <>
      <div className="containerF">
        <h1 className="result">Reviews average {!reviewavg ? ('None') : (reviewavg.total)} </h1>
        <h3 className="result" onClick={() => setAll(true)}>All</h3>
        <div className="rowReview">
          <div className="columnReview">
            <div className="stars" onClick={() => changeGradeIndex(5)}>
              <div className="clip-star"></div>
              <div className="clip-star"></div>
              <div className="clip-star"></div>
              <div className="clip-star"></div>
              <div className="clip-star"></div>

            </div>

          </div>
          <div className="columnReview2" >
            <div className="w3-light-grey">
              <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg ? ('None') : (reviewavg?.five)}` }} >{!reviewavg ? ('None') : (reviewavg.five)}</div>
            </div><br></br>
          </div>
        </div>

        <div className="rowReview">
          <div className="columnReview">
            <div className="stars" onClick={() => changeGradeIndex(4)}>
              <div className="clip-star"></div>
              <div className="clip-star"></div>
              <div className="clip-star"></div>
              <div className="clip-star"></div>
              <div className="clip-star2"></div>

            </div>

          </div>
          <div className="columnReview2" >
            <div className="w3-light-grey">
              <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg ? ('None') : (reviewavg?.four)}` }} >{!reviewavg ? ('None') : (reviewavg.four)}</div>
            </div><br></br>
          </div>
        </div>

        <div className="rowReview">
          <div className="columnReview">
            <div className="stars" onClick={() => changeGradeIndex(3)}>
              <div className="clip-star"></div>
              <div className="clip-star"></div>
              <div className="clip-star"></div>
              <div className="clip-star2"></div>
              <div className="clip-star2"></div>

            </div>

          </div>
          <div className="columnReview2" >
            <div className="w3-light-grey">
              <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg ? ('None') : (reviewavg.three)}` }} >{!reviewavg ? ('None') : (reviewavg.three)}</div>
            </div><br></br>
          </div>
        </div>
        <div className="rowReview">
          <div className="columnReview">
            <div className="stars" onClick={() => changeGradeIndex(2)}>
              <div className="clip-star"></div>
              <div className="clip-star"></div>
              <div className="clip-star2"></div>
              <div className="clip-star2"></div>
              <div className="clip-star2"></div>

            </div>

          </div>
          <div className="columnReview2" >
            <div className="w3-light-grey">
              <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg ? ('None') : (reviewavg.two)}` }} >{!reviewavg ? ('None') : (reviewavg.two)}</div>
            </div><br></br>
          </div>
        </div>
        <div className="rowReview">
          <div className="columnReview">
            <div className="stars" onClick={() => changeGradeIndex(1)}>
              <div className="clip-star"></div>
              <div className="clip-star2"></div>
              <div className="clip-star2"></div>
              <div className="clip-star2"></div>
              <div className="clip-star2"></div>

            </div>

          </div>
          <div className="columnReview2" >
            <div className="w3-light-grey">
              <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg ? ('None') : (reviewavg.one)}` }} >{!reviewavg ? ('None') : (reviewavg.one)}</div>
            </div><br></br>
          </div>
        </div>



        <h1 className="result">{!gradeIndex ? (<Fragment>All Star Review </Fragment>) : (<Fragment>{gradeIndex + 1} Star Review </Fragment>)} </h1>

        {reviews === null ? ('loading...') : (<Fragment>{reviews && reviews.map((x, index) => (<Fragment>
          <div className='cardReview2'>
            <div className="stars">
              {
                GRADES.map((grade, index) => (

                  <Star
                    index={index}
                    key={grade}
                    style={x.rate - 1 >= index ? activeStar : {}}
                  />
                ))
              }
            </div>
            <div className="starsT">
              {x.value.map((v) => (<div id="ck-buttonR">
                <label>
                  <input type="checkbox" value="1" />
                  <span>{v}</span>
                </label>
              </div>))}
            </div>
          </div>
        </Fragment>))}</Fragment>)}



      </div>
    </>

  );
};

export default ShowReviews;
import axios from "axios";

// Add Review
export const addReview = async (id, rate, data) => {
  let addReviewResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  console.log("id:", id, "rate:", rate, "tag:", data);
  await axios.post(`/api/review/reviewvalue/${id}/${rate}`, data, config)
    .then(res => {
      addReviewResponse = res;
    })
    .then(err => console.log(err))
  return addReviewResponse;
}

// Get Review
export const getReview = async (id, fDate, sDate) => {
  let addReviewResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.get(`api/review/getavg/review/${id}/${fDate}/${sDate}`, config)
    .then(res => {
      addReviewResponse = res.data;
    })
    .catch(err => console.log(err));
  return addReviewResponse;
}
// Get Review
export const getReviewAll = async (id) => {
  let addReviewResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.get(`api/review/getreviewAll/${id}`, config)
    .then(res => {
      addReviewResponse = res.data;
      console.log(res);
    })
    .catch(err => console.log(err));
  return addReviewResponse;
}


export const getReviewRate = async (id, rate, start, end) => {
  let addReviewResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.get(`api/review/getreview/${id}/${rate}/${start}/${end}`, config)
    .then(res => {
      addReviewResponse = res.data;
    })
    .catch(err => console.log(err));
  return addReviewResponse;
}
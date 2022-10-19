import axios from "axios";

// /api/review/getvalues/1
// Get Review
export const getReview = async (id, fDate, sDate) => {
  let addReviewResponse;
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  };
  return await axios
    .get(`/api/review/getavg/review/${id}/${fDate}/${sDate}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};





// Get Review
export const getReviewAll = async (id) => {
  let addReviewResponse;
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  };
console.log('====================================');
console.log(id);
console.log('====================================');
  await axios
    .get(`/api/review-new/get/questions?restaurant_id=${id}`, config)
    .then((res) => {
      addReviewResponse = res.data;
      console.log(res);
    })
    .catch((err) => console.log(err));
  return addReviewResponse;
};






export const getReviewRate = async (id, rate, start, end) => {
  let addReviewResponse;
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  };
  await axios
    .get(`/api/review/getreview/${id}/${rate}/${start}/${end}`, config)
    .then((res) => {
      addReviewResponse = res.data;
    })
    .catch((err) => console.log(err));
  return addReviewResponse;
};

export const getRestaurentReview = async (id) => {
  let addReviewResponse;
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;
  const rastaurantId = JSON.parse(userInfo).restaurant[0].id;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  await axios
    .get(`/api/review/getvalues/${rastaurantId}`, config)
    .then((res) => {
      console.log(res);
      // addReviewResponse = res.data;
    })
    .catch((err) => console.log(err));
  return addReviewResponse;
};















// Add Review
export const addReview = async (id,data) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  };
  console.log("from api", data);
  return await axios
    .post(`/api/review-new/create/questions`, data, config)
    .then((res) => {
      return res;
    })
    .then((err) => console.log(err));
};
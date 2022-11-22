import axios from "axios";

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
export const addReview = async (id, data) => {
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



// =========================================================================


// QUESTION
export const postReviewQuestion = async (data) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  };

  const result = await axios.post(`/api/review-new/create/questions`, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return result;
};
export const getReviewAll = async (id) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  };
  const result = await axios
    .get(`/api/review-new/get/questions?restaurant_id=${id}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return result;
};
export const getReviewAllWithLinkedTags = async (id) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt.token}`,
    },
  };
  const result = await axios
    .get(`/api/review-new/get/questions-all?restaurant_id=${id}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return result;
};
export const getSingleQuestion = async (id) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  const result = await axios.get(`/api/review-new/get/questions/${id}`, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));

  return result;
}
export const editSingleQuestion = async (data) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  const result = await axios.put(`/api/review-new/update/questions`, data, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));

  return result;
}
export const deleteSingleQuestion = async (id) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios.delete(`/api/review-new/delete/questions/${id}`, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));
}




// TAG 
export const postTag = async (data) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  const result = await axios.post(`/api/review-new/create/tags`, data, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));

  return result;
}
export const getAllTag = async (restaurant_id) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  const result = await axios.get(`/api/review-new/get/tags?restaurant_id=${restaurant_id}`, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));

  return result;
}
export const editSingleTag = async (data) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  const result = await axios.put(`/api/review-new/update/tags`, data, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));

  return result;
}


// STAR
export const postStar = async (data) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const result = await axios.post(`/api/review-new/create/stars`, data, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));

  return result;
}
export const getAllStar = async (restaurant_id, page_no) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  const result = await axios.get(`/api/review-new/get/stars?restaurant_id=${restaurant_id}`, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));

  return result;
}
export const editSingleStar = async (data) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  const result = await axios.put(`/api/review-new/update/stars`, data, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));

  return result;
}






// LINK ALL 
export const linkReview = async (data) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const result = await axios.post(`/api/review-new/owner/create/questions`, data, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));

  return result;
}
export const updateLinkReview = async (data) => {
  const userInfo = localStorage.getItem("data");
  const jwt = JSON.parse(userInfo).token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const result = await axios.post(`/api/review-new/owner/update/questions?_method=PATCH`, data, config).then((res) => {
    return res;
  }).catch((err) => console.log(err));

  return result;
}











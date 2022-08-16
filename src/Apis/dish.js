import axios from "axios";

// Get Dish
export const getDish = async (id) => {
  let getDishResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.get(`/api/dishes/${id}`, config)
    .then(res => {
      getDishResponse = res.data;
    })
    .catch(err => {
      console.log(err);
    })
  return getDishResponse
}

// Get AllDish
export const getAllDish = async (id) => {
  let getDishResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.get(`/api/dishes/All/dishes/${id}`, config)
    .then(res => {
      getDishResponse = res.data;
    })
    .catch(err => {
      console.log(err);
    })
  return getDishResponse
}
// Add Dish Image
export const addDishImage = async (id) => {
  let getaddDishImage;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.post(`/api/dishes/uploadimage/${id}`, config)
    .then(res => {
      getaddDishImage = res;
    })
    .catch(err => {
      console.log(err);
    })
  return getaddDishImage
}
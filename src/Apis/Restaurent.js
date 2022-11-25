import axios from "axios";

// Add Restaurent
export const addRestaurent = async (data) => {
  console.log('from api',data);
  let addRestaurentResponse;
  const token = JSON.parse(localStorage?.token)
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  };
  await axios.post(`/api/restaurant/`, data, config)
    .then(res => {
      addRestaurentResponse = res;
    })
  return addRestaurentResponse
}
// Edit Restaurent
export const editRestaurent = async (id, data) => {
  let editRestaurentResponse;
  const token = localStorage.token;
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  };
  await axios.patch(`/restaurant/UpdateResturantDetails/${id}`, data, config)
    .then(res => {
      editRestaurentResponse = res;
    })
    .catch(err => console.log(err))
  return editRestaurentResponse
}

// get Restaurent by ID
export const getRestaurent = async (id) => {
  console.log('API --->',id);
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  const result = await axios.get(`/api/restaurant/${id}`, config)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err))
  return result
}

// GET ALL RESTAURANT 
export const getAllRestaurent = async () => {
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  const result = await axios.get(`/api/restaurant`, config)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err))
  return result
}


// get Restaurent by ID
export const getRestaurentByIdForCustomer = async (id) => {
  console.log('API --->',id);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    },
  };
  const result = await axios.get(`/api/restaurant/${id}`, config)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err))
  return result
}
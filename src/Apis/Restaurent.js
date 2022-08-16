import axios from "axios";

// Add Restaurent
export const addRestaurent = async (data) => {
  let addRestaurentResponse;
  const token = JSON.parse(localStorage.token)
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
  await axios.patch(`/api/restaurant/UpdateResturantDetails/${id}`, data, config)
    .then(res => {
      editRestaurentResponse = res;
    })
    .catch(err => console.log(err))
  return editRestaurentResponse
}

// get Restaurent
export const getRestaurent = async (id) => {
  let addRestaurentResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.get(`/api/restaurant/${id}`, config)
    .then(res => {
      addRestaurentResponse = res.data;
    })
    .catch(err => console.log(err))
  return addRestaurentResponse
}
import axios from "axios";

// Add Restaurent
export const addRestaurent = async (data) => {
  const token = JSON.parse(localStorage?.token)
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  };
  return await axios.post(`/api/restaurant/`, data, config)
    .then(res => {
      return res;
    })

}
// Edit Restaurent
export const editRestaurent = async (id, data) => {
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo)?.token;
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  const result = await axios.patch(`/api/restaurant/UpdateResturantDetails/${id}`, data, config)
    .then(res => {
      console.log('API->',res);
      return res;
    })
    .catch(err => console.log(err))
return result
}
// Edit Restaurent
export const editRestaurentLogo = async (id, data) => {

  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo)?.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  const result = await axios.post(`/api/restaurant/uploadimage/${id}?_method=PATCH`, data, config)
    .then(res => {
      console.log({res});
      return res;
    })
    .catch(err => console.log(err))
    return result
}

// get Restaurent by ID
export const getRestaurent = async (id) => {
  console.log('API --->', id);
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
  console.log('API --->', id);
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
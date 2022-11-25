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
// Get Dish By ID
export const getDishById = async (id) => {
  
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  const result = await axios.get(`/api/dishes/by-dishid/${id}`, config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
  return result
}

// Get AllDish
export const getAllDish = async (Rid) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    },
  };
  const result = await axios.get(`/api/dishes/All/dishes/${Rid}`, config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
  return result
}

// Get Dish
export const getdish = async (Rid) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    },
  };
  const result = await axios.get(`/api/dishes/${Rid}`,config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
  return result
}
// Add Dish Image
export const addDishImage = async (id,data) => {

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
  console.log('from api-->',{id,data});
  await axios.post(`/api/dishes/uploadimage/${id}`,data, config)
    .then(res => {
      getaddDishImage = res;
    })
    .catch(err => {
      console.log(err);
    })
  return getaddDishImage
}

// Add Dish 
export const addDishes = async (restId, data) => {

  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  console.log({ dishes: [data] });
  const result = await axios.post(`/api/dishes/multiple/${restId}`, { dishes: [data] }, config)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    })
  return result
}
// Add Dish 
export const getuserdeal = async () => {
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
  await axios.get(`/api/dishes/getusermenu/dealsdishes`, config)
    .then(res => {
      getaddDishImage = res;
    })
    .catch(err => {
      console.log(err);
    })
  return getaddDishImage
}
// UPDATE DISH
export const updateSingleDish = async (data) => {
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
   const result = await axios.patch(`/api/dishes/Updatedish`,data, config)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    })
  return result
}
// DELETE Dish 
export const deleteDish = async (id) => {
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
   const result = await axios.delete(`/api/dishes/${id}`, config)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    })
  return result
}
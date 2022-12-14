import axios from "axios";
// Add variation type

export const addVariation = async (id, data) => {
  let addVariationResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  console.log(data);
  await axios.post(`/api/variation/variation_type/multiple/${id}`, data, config)
    .then(res => {
      addVariationResponse = res;
    })
    .catch(err => console.log(err));
  return addVariationResponse
}

export const getVariation = async (id) => {
  let getVariationResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.get(`/api/variation/${id}/1`, config)
    .then(res => {
      getVariationResponse = res;
    })
    .catch(err => console.log(err));
  return getVariationResponse
}

export const delVariation = async (id) => {
  let delVariationResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.delete(`/api/variation/unlink/${id}/1`, config)
    .then(res => {
      delVariationResponse = res;
    })
    .catch(err => console.log(err));
  return delVariationResponse
}
// add linkVariation

export const Variationlink = async (id, varation) => {
  let addVariationResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  console.log(varation);
  await axios.post(`/api/variation/multiple/dish_variation/${id}`, varation, config)
    .then(res => {
      addVariationResponse = res;
    })
    .catch(err => console.log(err));
  return addVariationResponse
}
// get getvariation Type

export const gettype = async (id, did) => {
  let addVariationResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.get(`/api/variation/multiple/dish_variation/${id}/${did}`, config)
    .then(res => {
      addVariationResponse = res.data;
    })
    .catch(err => console.log(err));
  return addVariationResponse
}
// get getvariation Type

export const gettypecount = async (id) => {
  let addVariationResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.get(`/api/variation/type/count/${id}`, config)
    .then(res => {
      addVariationResponse = res.data;
    })
    .catch(err => console.log(err));
  return addVariationResponse
}
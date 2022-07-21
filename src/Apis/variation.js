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
import axios from "axios";

export const getCustOrer = async () => {
  let addMenuResponse;
  const userInfo = localStorage.getItem('customer_details')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt[0].customerToken}`
    },
  };
  // await axios.get(`/api/order/getorderby/customerid/${jwt[0].customer.id}`, config)
  await axios.get(`/api/order/getorderby/customerid/40}`, config)
    .then(res => {
      addMenuResponse = res;
    })
  return addMenuResponse
}

export const getAllOrerByRestID= async () => {
  let addMenuResponse;
  const userInfo = localStorage.getItem('customer_details')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt[0].customerToken}`
    },
  };
  // await axios.get(`/api/order/getorderby/customerid/${jwt[0].customer.id}`, config)
  await axios.get(`/api/order/getorderby/customerid/40}`, config)
    .then(res => {
      addMenuResponse = res;
    })
  return addMenuResponse
}
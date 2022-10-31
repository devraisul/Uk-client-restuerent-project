import axios from "axios";

export const getCustomerOrder = async (customer_id) => {
  const userInfo = localStorage.getItem('customer_details')
  const jwt = JSON.parse(userInfo)[0].customerToken;
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  const result = await axios.get(`/api/order/getorderby/customerid/${customer_id}`, config)
    .then(res => {
      return res;
    })
  return result
}

export const getAllOrerByRestID = async () => {
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


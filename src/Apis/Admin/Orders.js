import axios from "axios";

export const getAllOrers= async () => {
    const userInfo = localStorage.getItem('data')
    const jwt = JSON.parse(userInfo)?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Authorization": `Bearer ${jwt}`
      },
    };
    
    const result = await axios.get(`/api/order/All/order`, config)
      .then(res => {
        return res;
      })
    return result
  }
export const getOrerByOrderId = async (id) => {
    const userInfo = localStorage.getItem('data')
    const jwt = JSON.parse(userInfo)?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Authorization": `Bearer ${jwt}`
      },
    };
    
    const result = await axios.get(`/api/order/${id}`, config)
      .then(res => {
        return res;
      })
    return result
  }
export const deleteOrerById= async (id) => {
    const userInfo = localStorage.getItem('data')
    const jwt = JSON.parse(userInfo)?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Authorization": `Bearer ${jwt}`
      },
    };
    const result = await axios.delete(`/api/order/${id}`, config)
      .then(res => {
        return res;
      })
    return result
  }
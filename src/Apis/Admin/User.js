import axios from "axios";


export const getUserById= async (id) => {
    const userInfo = localStorage.getItem('data')
    const jwt = JSON.parse(userInfo)?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Authorization": `Bearer ${jwt}`
      },
    };
    
    const result = await axios.get(`/api/owner/${id}`, config)
      .then(res => {
        return res;
      })
    return result
  }
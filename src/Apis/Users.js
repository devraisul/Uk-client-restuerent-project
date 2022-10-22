import axios from "axios";

export const getAllUsers = async () => {
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  const result = await axios.get(`/api/owner/getAllowner/withourrestaurant`, config)
    .then(res => {
      return res;
    })
  return result
}
import axios from "axios";

// Get TableMenu
export const gettables = async (id) => {
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
  await axios.get(`/api/restaurant/Restuarant/tables/${id}`, config)
    .then(res => {
      getDishResponse = res.data;
    })
    .catch(err => {
      console.log(err);
    })
  return getDishResponse
}
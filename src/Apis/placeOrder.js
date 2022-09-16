import axios from "axios";
// Add variation type

export const placeOrder = async (id, data) => {
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

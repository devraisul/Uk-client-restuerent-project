import axios from "axios";
// Add variation type

export const placeOrder = async (id, data, dishes) => {
  const userInfo = localStorage.getItem('customer_details')
  const jwt = JSON.parse(userInfo)[0]?.customerToken;
  console.log(jwt);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  // console.log(JSON.parse(localStorage.getItem('cart_items')));
  // data.dishes = JSON.parse(localStorage.getItem('cart_items'))
  const orderData = {
    ...data, dishes
  }
  console.log(orderData);
  const addVariationResponse = await axios.post(`/api/order/${id}`, orderData, config)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  return addVariationResponse
}

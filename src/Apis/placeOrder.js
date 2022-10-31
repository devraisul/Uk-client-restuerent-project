import axios from "axios";
// Add variation type

export const placeOrder = async (rest_id, data, dishes) => {
  const userInfo = localStorage.getItem('customer_details')
  const jwt = JSON.parse(userInfo)[0]?.customerToken;
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  //======================= DONE =======================
  data.dishes = JSON.parse(localStorage.getItem('cart_items'))

  // ============ TEST ==================
  const orderData = {
    ...data, dishes: []
  }
  data.dishes.map(dish => {
    orderData.dishes.push({
      id: dish.id,
      qty: dish.quantity,
      variation: []
    })
  })
  data.dishes?.variations?.map(variation => {
    orderData.dishes.variation.push({
      id: variation.id
    })
  })

  // ============ TEST ==================

  console.log(orderData);

  const addVariationResponse = await axios.post(`/api/order/${rest_id}`, orderData, config)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  return addVariationResponse
}

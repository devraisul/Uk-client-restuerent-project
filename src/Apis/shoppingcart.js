
export const addproduct = (products, price, count, variation) => async (dispatch) => {

  if (variation) { variation.pop() }
  products.Qty = count
  products.Dish_Price = price
  console.log(price)
  console.log(variation)
  products.variation = variation
  products.Key = Math.floor((Math.random() * 100) + 1);
  console.log(products.Key)
  try {

    if (products) {
      return products
    }
    // dispatch(setAlert('Dish Added ', 'success'));
  } catch (err) {
    console.log(err);
  };
}

export const adduserdealproduct = (products, price, count, variation, dish) => {

  if (variation) { variation.pop() }
  //sort selected variations according to theri dish in string
  console.log("dish of deal")
  console.log(dish)
  var str = '';
  for (let i = 0; i < dish.length; i++) {
    str += `${dish[i].Dish_Name} : `
    for (let j = 0; j < variation.length; j++) {
      if (dish[i].Dish_Name === variation[j].Dish_Name) {
        str += `${variation[j].variation_Name.toString()}, `;
      }
    }
    str += '. '

  }

  products.Qty = count
  products.Dish_Price = price
  products.variation = str
  products.Key = Math.floor((Math.random() * 100) + 1);
  try {

    if (products) {
      return products
    }
    // dispatch(setAlert('Dish Added ', 'success'));
  } catch (err) {
    console.log(err);
  };
}
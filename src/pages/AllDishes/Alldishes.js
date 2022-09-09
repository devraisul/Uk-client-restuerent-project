import React from 'react';
import { getdish } from '../../Apis/dish';
import BuyDishes from '../TabMenu/BuyDishes';
import AlldishesUI from '../ViewMenu/AlldishesUI';

const Alldishes = ({ id }) => {
  const [dishes, setDishes] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  console.log(id);
  React.useEffect(() => {
    setLoading(true)
    getdish(id)
      .then(res => {
        setDishes(res);
        setLoading(false)
      })
  }, [id])
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <React.Fragment>
      {dishes.length === 0 ? (<p>No dish Added Yet!</p>) : (
        <React.Fragment>
          <div className="grid-containerUM">
            {dishes.map((dishes) => (
              <BuyDishes
                key={dishes.restaurant_id}
                dishes={dishes}
                id={id}
              />
            ))}
          </div>
        </React.Fragment>)}






    </React.Fragment>
  );
};

export default Alldishes;
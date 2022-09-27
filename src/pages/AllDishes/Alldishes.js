import React from 'react';
import { getdish } from '../../Apis/dish';
import Loading from '../../components/Loading/Loading';
import BuyDishes from '../TabMenu/BuyDishes';

const Alldishes = ({ id, setChangeCartItems }) => {
  const [dishes, setDishes] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    setLoading(true)
    getdish(id)
      .then(res => {
        setDishes(res);
        setLoading(false)
      })
  }, [id])
  return loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      {dishes.length === 0 ? (<p>No dish Added Yet!</p>) : (
        <React.Fragment>
          <div className="grid-containerUM">
            {dishes.map((dishes) => (
              <BuyDishes
                setChangeCartItems={setChangeCartItems}
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
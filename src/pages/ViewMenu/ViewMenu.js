import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getDish } from '../../Apis/dish';
import { useAuth } from '../../context/AuthContext';
import AlldishesUI from './AlldishesUI';
import './viewMenu.css'
const ViewMenu = () => {
  const { user } = useAuth()
  const [allDish, setAllDish] = React.useState();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true)
    getDish(user.restaurant[0].id)
      .then(res => {
        setLoading(false)
        setAllDish(res);
      })
  }, [user]);

  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
      <div className='padd'>

        <table className='servicesG'>

          {allDish?.map((dishes) => (
            <AlldishesUI
              key={dishes.ressult_id}
              dishes={dishes}
              id={user.restaurant[0].id}

            />
          ))}



        </table>
        <Link to="/app/dashboard">go back</Link>
      </div>

    </Fragment>
  );
};

export default ViewMenu;
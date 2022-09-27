import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getRestaurent } from '../../Apis/Restaurent';
import ImageComing from '../../assets/image-coming-soon.png';
import Menu from '../../assets/menu.png';
import Review from '../../assets/review.png';
import Loading from '../../components/Loading/Loading';
import './usermenu.css';
const UserMenu = () => {
  const [loading, setLoading] = React.useState(false)
  const [restaurant, setRestaurant] = React.useState()
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  React.useEffect(() => {
    setLoading(true)
    getRestaurent(id)
      .then(res => {
        setRestaurant(res.restaurant);
        setLoading(false)
      })
  }, [id]);
  console.log(restaurant);
  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <section className='landing2'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <div className='x-largeLogo2'>
              {restaurant?.Logo ? (<img
                className="centerImage2"
                src={ImageComing}
                alt="logo"
              />) : (<img
                className="centerImage2"
                src={ImageComing}
                alt='Logo'
              />)}

            </div>
            <p className='lead2'>{restaurant?.Name}</p>
            <Link className='aReview' to={`/review/${id}`} >
              Show review
            </Link>
          </div>
        </div>
      </section>
      <div className='containercenter'>
        <div className="containerBBU">
          <Link to={`/tabmenu/${restaurant?.Key_ID}?id=${id}`}>
            <img src={Menu} alt="image1" className="centerImage" />
          </Link>
          {restaurant?.Layout === 'cards' ? (<Link className='btnUser' to={`/menus/${restaurant?.Key_ID}/${id}`}>  View Menu</Link>) : (<Link className='btnUser' to={`/tabmenu/${restaurant?.Key_ID}?id=${id}`}>  View Menu</Link>)}
          {/*<Link className='btnUser'to={`/menus/${match.params.url}/${match.params.id}`}>  View Menu</Link>*/}

          <Link to={`/rating/${restaurant?.Key_ID}/${id}`}>
            <img src={Review} alt="image2" className="centerImage" />
          </Link>
          <Link to={`/rating/${restaurant?.Key_ID}/${id}`} className='btnUser'>Review us</Link>
          <p className='logoname'>Address</p>
          <p className='logoname2'>{restaurant?.Address}, PostCode: {restaurant?.PostCode}</p>

        </div>
      </div>


    </Fragment>
  );
};

export default UserMenu;
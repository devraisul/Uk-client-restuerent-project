import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { Fragment } from 'react';
import { RiLoginCircleLine } from 'react-icons/ri';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getRestaurentByIdForCustomer } from '../../Apis/Restaurent';
import ImageComing from '../../assets/image-coming-soon.png';
import Menus from '../../assets/menu.png';
import Review from '../../assets/review.png';
import Loading from '../../components/Loading/Loading';
import NotFound from '../NotFound/NotFound';
import './usermenu.css';
const UserMenu = () => {
  const [loading, setLoading] = React.useState(false)
  const [restaurant, setRestaurant] = React.useState();
  const [isRestaurantNotFound, setIsRestaurantNotFound] = React.useState(false)
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');

  React.useEffect(() => {
    setLoading(true)
    getRestaurentByIdForCustomer(id)
      .then(res => {
        console.log(res);
        setRestaurant(res.restaurant);
        setIsRestaurantNotFound(false)
        setLoading(false)
      }).catch(err => {
        if (err) {
          setIsRestaurantNotFound(true)
          setLoading(false)
        }
      })
  }, [id]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSign = () => {
    handleClose()
    localStorage.removeItem("customer_details")
  }
  const [customerHave, setCustomerhave] = React.useState(false)
  const customer = JSON.parse(localStorage.getItem("customer_details"))
  const restOwner = JSON.parse(localStorage.getItem("data"))
  React.useEffect(() => {
    if (customer && (customer.length > 0)) {
      setCustomerhave(true)
    }
    else setCustomerhave(false)
  }, [customer])

  return loading ? <Loading /> :
    isRestaurantNotFound ?
      <NotFound />
      :
      <Fragment>
        {
          customerHave ?
            <div style={{ position: "fixed", zIndex: 1, display: "flex", justifyContent: "end", marginLeft: "10px", marginTop: "10px" }} id='myTopnav1' >
              <Button
                style={{ background: "white", color: '#F5882F', borderRadius: "10px" }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <AccountBoxIcon />
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <Link to={`/customerOrder/${customer[0]?.customer?.id}`} style={{ textDecoration: "none", color: "black" }}><MenuItem onClick={handleClose}>Your Order</MenuItem></Link>
                <MenuItem onClick={handleClose}>Current Order</MenuItem>
                <MenuItem onClick={handleSign}>Logout</MenuItem>
              </Menu>
            </div>


            :


            <div style={{
              width: '100%',

              position: 'relative',

              margin: 0
            }}>
              <NavLink
                title='Log In As Customer'
                to={'/customerlogin'}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  left: 10,
                  top: 10,
                  zIndex: 10,
                  background: '#fff',
                  padding: '10px 10px',
                  borderRadius: '10px',
                  margin: 0
                }}>
                <RiLoginCircleLine style={{ fontSize: '1.2rem' }} />
              </NavLink>
            </div>
        }
        <section className='landing2'>
          {
            (restOwner?.type === "restaurant_Owner") &&
            <div style={{
              width: '100%',
              position: 'relative'
            }}>
              <NavLink
                title='Go Dashboard'
                to={'/'}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  zIndex: 10,
                  background: '#fff',
                  padding: '10px 10px',
                  borderRadius: '10px'
                }}>
                <TbLayoutDashboard style={{ fontSize: '1.2rem' }} />
              </NavLink>
            </div>
          }
          <div className='dark-overlay'>
            <div className='landing-inner'>
              <div className='x-largeLogo2'>
                {restaurant?.Logo ? (
                  <img
                    className="centerImage2"
                    src={ImageComing}
                    alt="logo"
                  />
                ) : (
                  <img
                    className="centerImage2"
                    src={ImageComing}
                    alt='Logo'
                  />
                )}

              </div>
              <h1 className='lead2'>{restaurant?.Name}</h1>
              <Link className='aReview' to={`/review/${id}`} >
                Show review
              </Link>
            </div>
          </div>
        </section>
        <br />
        <br />
        <br />
        <br />
        <div className='containercenter'>
          <div className="containerBBU">
            <Link to={`/tabmenu/${restaurant?.Key_ID}?id=${id}`}>
              <img src={Menus} alt="image1" className="centerImage" />
            </Link>
            {
              restaurant?.Layout === 'cards' ? (
                <Link className='btnUser' to={`/menus/${restaurant?.Key_ID}/${id}`}>  View Menu</Link>
              ) : (
                <Link className='btnUser' to={`/tabmenu/${restaurant?.Key_ID}?id=${id}`}>  View Menu</Link>
              )
            }
            {/*<Link className='btnUser'to={`/menus/${match.params.url}/${match.params.id}`}>  View Menu</Link>*/}

            <NavLink to={`/rating/${restaurant?.Key_ID}/${id}`}>
              <img src={Review} alt="image2" className="centerImage" />
            </NavLink>
            <Link to={`/rating/${restaurant?.Key_ID}/${id}`} className='btnUser'>Review us</Link>

            <p className='logoname'>Address</p>
            <p className='logoname2'>{restaurant?.Address}, PostCode: {restaurant?.PostCode}</p>

          </div>
        </div>
      </Fragment>
};

export default UserMenu;
import React, { Fragment, useEffect, useState } from 'react';
import Shoppingcart from './Shoppingcart';
import './review.css'
import { addproduct } from '../../Apis/shoppingcart';
import { useAuth } from '../../context/AuthContext';
const Cart = ({ id }) => {
  const { product } = useAuth()
  const [count, setcount] = useState(0)
  const [rand, setRand] = useState(0)
  // const Menudata = useSelector(state => notifications.number)

  //now set this array into your initial array

  useEffect(() => {
    setcount(product?.Qty)
  }, [product.Qty]);


  // toggle menu list
  function toggleMenu() {
    setRand(Math.random())
    var x = document.getElementById('navbarr2');
    if (x.className === 'sidenavv') {
      x.className += ' active';
    } else {
      x.className = 'sidenavv';
    }
  }

  return (
    <Fragment>
      <div>
        <div className='cart-icon' id='myTopnav1' onClick={toggleMenu}>
          <i className='fa fa-shopping-cart'></i>
          <span className='products-count'>{count}</span>
        </div>



        <aside className='sidenavv' id='navbarr2'>
          <aside>
            <div
              className='sidenavv__close-icon'
              id='closeMenu'
              onClick={() => toggleMenu()}
            >
              <i className='fa fa-times sidenavv__brand-close'></i>
            </div>
            <div className='cart__header'>

              <i className="fas fa-shopping-bag"></i>
              <h1 className='large text-primary'>Cart</h1>
            </div>
            <Shoppingcart rand={rand} id={id} />
          </aside>
        </aside>

      </div>
    </Fragment>
  );
};

export default Cart;
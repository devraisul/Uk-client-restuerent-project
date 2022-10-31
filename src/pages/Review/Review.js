import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './review.css';
const Review = ({ page, url, id }) => {
  return (
    <Fragment>
      {page === 'tabmenu' ? (
        <Link to={`/rating/${url}/${id}`} className='cart-iconn' >
          <i className="fas fa-star-half-alt"></i>
        </Link>
      ) : (
        <Link to={`/rating/${url}/${id}`} className='cart-iconn' >
          <i className="fas fa-star-half-alt"></i>
        </Link>
      )}
    </Fragment>
  );
};

export default Review;
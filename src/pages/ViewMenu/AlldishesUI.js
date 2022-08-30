import React, { Fragment } from 'react';
import { addDishImage } from '../../Apis/dish';
import LinkVariation from './linkvariationform';
import './viewMenu.css'

const AlldishesUI = ({
  dishes,menuId,index }) => {
    console.log({dishes});
  const [showuploader, setsshowuploader] = React.useState(false);
  const [showlink, setsshowlink] = React.useState(false);
  const [image, setimage] = React.useState();
  //set uploaded image in state
  const onFileChange = (e) => {
    e.preventDefault();
    const Data = new FormData();
    if (e.target.files[0] !== undefined) {
      Data.append('image', e.target.files[0], e.target.files[0].name);
      addDishImage(Data, dishes.id)
      setimage(e.target.files[0]);
    }
  };

  const handleLinkClick = () => {
    if (showlink) {
      setsshowlink(false)
    }
    else {
      setsshowlink(true)
    }
  }
  //submit the image to API

  return (
    <tr>
      <td>
        {index}
      </td>
      <td>
        {!dishes.image ? (
            <img
              className='roundimgg2'
              src={`/no-image.png`}
              alt='dish'
            />
            ) : (
            <img
              className='roundimgg2'
              src={`${process.env.REACT_APP_BACKEND_HOST}/${dishes.image}`}
              alt={dishes.name}
            />
            )
        }
      </td>
      <td>
        <h2>{dishes.name}</h2>
      </td>
      <td> 
        <p>
          {dishes.description}
        </p> 
        </td>
        <td>
        <h4>{dishes.price} £ </h4>
        </td>
        <td>   
        
        <div className='form-group'>
                <input
                  style={{display:'none'}}
                  type='file'
                  id='image'
                  name='image'
                  onChange={(e) => onFileChange(e)}
                />
                <label  className='btn btn-primary-submit' for='image'>
                
                    Upload Image
              
                </label>
              </div>
    
        </td>
        <td>
        <button className='btn btn-primary-submit' onClick={(e) => handleLinkClick(e)}>
          Link Variation
        </button>
        {//show upload image option on click
          showuploader ? (
            <Fragment>
              
            </Fragment>
          ) : null}

        {//show upload image option on click
          showlink ? (
            <LinkVariation id={dishes.id} rid={menuId} />
          ) : null}
      </td>
    </tr>


  )
};

export default AlldishesUI;
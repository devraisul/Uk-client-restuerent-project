import React, { Fragment } from 'react';
import { addDishImage } from '../../Apis/dish';
import LinkVariation from './linkvariationform';
import './viewMenu.css'

const AlldishesUI = ({
  dishes: { Dish_id, Dish_Name, Dish_Price, Dish_Description, image },
  id }) => {
  const [showuploader, setsshowuploader] = React.useState(false);
  const [showlink, setsshowlink] = React.useState(false);
  const [dishimage, setimage] = React.useState();
  //set uploaded image in state
  const onFileChange = (e) => {
    setimage(
      e.target.files[0]);
  };
  // show upload option
  const handleAddClick = () => {
    if (showuploader) {
      setsshowuploader(false)
    }
    else {
      setsshowuploader(true)
    }
  }

  const handleLinkClick = () => {
    if (showlink) {
      setsshowlink(false)
    }
    else {
      setsshowlink(true)
    }
  }


  //submit the image to API
  const onSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    console.log(dishimage)
    if (dishimage !== undefined) {
      Data.append('image', dishimage, dishimage.name);
      addDishImage(Data, Dish_id)
    }

  };
  return (


    <tr>
      <td><h1>{Dish_Name}</h1>
        <p>
          {Dish_Description}</p> <h4>{Dish_Price} £ </h4>   <button className='btn btn-primary-submit' onClick={(e) => handleAddClick(e)}>
          Upload Image
        </button>
        <button className='btn btn-primary-submit' onClick={(e) => handleLinkClick(e)}>
          Link Variation
        </button>
        {//show upload image option on click
          showuploader ? (
            <Fragment>
              <div className='form-group'>
                <input
                  type='file'
                  id='image'
                  name='image'
                  onChange={(e) => onFileChange(e)}
                />
                <label for='customFile'>Choose Image</label>
              </div>

              <input type='submit' className='btn btn-primary' value='Add ' onClick={(e) => onSubmit(e)} />
            </Fragment>
          ) : null}

        {//show upload image option on click
          showlink ? (
            <LinkVariation id={Dish_id} rid={id} />
          ) : null}
      </td>

      <tb>

        {!image ? (<img
          className='roundimgg2'

          // src={configData.SERVER_URL + '/public/f5a38c06-8301-427d-bdec-0fba15540a54-dc2781ef-1782-4efb-8918-e4aa4b1f4efb-image-coming-soon2.png'}
          alt='dish'
        />) : (<img
          className='roundimgg2'
          // src={configData.SERVER_URL + image}
          alt='dish img'
        />)}

      </tb>

    </tr>


  )
};

export default AlldishesUI;
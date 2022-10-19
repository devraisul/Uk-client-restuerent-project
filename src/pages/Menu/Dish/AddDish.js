import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDishes, addDishImage } from '../../../Apis/dish';
import './AddDish.css';
const AddDish = ({ menuId, restaurentId, menuName, setIsChangeMenu, closeModal }) => {
  const [imageUrl, setImageUrl] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false)
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false)
  // TAB NAMES 
  const [onDetailsTab, setOnDetailsTab] = useState(true);
  const [onInformationTab, setOnInformationTab] = useState(false);
  const [onVariationTab, setOnVariationTab] = useState(false);


  // TOGGOLE BETWEEN TABS FUNCTIONS 
  const shitToDetailsTab = () => {
    setOnDetailsTab(true)
    setOnInformationTab(false)
    setOnVariationTab(false)
  }
  const shitToInformationTab = () => {
    setOnDetailsTab(false)
    setOnInformationTab(true)
    setOnVariationTab(false)
  }
  const shitToVariationTab = () => {
    setOnDetailsTab(false)
    setOnInformationTab(false)
    setOnVariationTab(true)
  }



  const onSubmit = data => {
    setIsLoading(true)
    const dishData = {};
    dishData.calories = data?.calories
    dishData.delivery = data?.delivery
    dishData.description = data?.description
    dishData.ingredients = data?.ingredients
    dishData.name = data?.DishName
    dishData.price = data?.price
    dishData.delivery = data?.delivery
    dishData.take_away = data?.take_away
    dishData.menu_id = menuId

    addDishes(restaurentId, dishData).then(res => {
      if (res.data.length > 0) {
        var Data = new FormData()
        if (data?.image[0] !== undefined) {
          Data.append('image', data?.image[0], data?.image[0].name);
          addDishImage(res.data[0]?.id, Data).then((res) => {
            if (res.data) {
              closeModal()
            }
          })
        }
        setIsLoading(false)
        setSubmittedSuccessfully(true);
        setTimeout(() => {
          setIsChangeMenu(Math.random())
          closeModal()
        }, 2000);
      }
    })
  };
  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      setOnDetailsTab(true)
      setOnInformationTab(false)
      setOnVariationTab(false)
    }
  }, [errors])

  return (
    <>
    {submittedSuccessfully?
    (<div className='SubmitedMessage'>
      <img src="https://i.postimg.cc/MGXQ6w85/13-pizza-outline.gif" alt="done" className='doneImage' />
      <p>Submitted!</p> 
    </div>)
    :
    (<div>
      
      
      {/* POPUP CLOSE BUTTON  */}
      <div className='crossPopup'>
        <button onClick={closeModal}>X</button>
      </div>

      {/* TAB TOGGLE BUTTONS  */}
      <div className='buttonsContainer'>
        <Button
          onClick={shitToDetailsTab}
          style={{
            background: `${onDetailsTab ? "#0575B4" : ""}`,
            color: `${onDetailsTab ? "#fff" : ""}`
          }}
        >Details</Button>
        <Button
          disabled={(errors?.DishName || errors?.description) && true}
          onClick={shitToInformationTab}
          style={{
            background: `${onInformationTab ? "#0575B4" : ""}`,
            color: `${onInformationTab ? "#fff" : ""}`
          }}
        >Imformations</Button>
        <Button
          disabled={(errors?.DishName || errors?.description) && true}
          onClick={shitToVariationTab}
          style={{
            background: `${onVariationTab ? "#0575B4" : ""}`,
            color: `${onVariationTab ? "#fff" : ""}`
          }}
        >Variations</Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* DETAILS TAB  */}
        <div style={{ display: `${onDetailsTab ? "block" : "none"}` }} className='container' >
          <h1>Add Dish</h1>
          <div className='addDishForm'>
            <div className="inputWrapper">
              <label htmlFor="DishName">Dish Name <span className='errorMsg'>{errors?.DishName && "Dish Name is required! "}</span></label>
              <input type="text" placeholder="Dish name" id='DishName' {...register("DishName", { required: true })} />
            </div>
            <div className="inputWrapper">
              <label htmlFor="description">Description <span className='errorMsg'>{errors?.description && "Description is required! "}</span></label>
              <input type="text" placeholder="description" id='description' {...register("description", { required: true })} />
            </div>
            <div className="inputWrapper">
              <label htmlFor="price">Price <span className='errorMsg'>{errors?.price && "Price is required! "}</span></label>
              <input type="number" defaultValue={0} placeholder="price" id='price' {...register("price", { required: false })} />
            </div>
            <div className="inputWrapper">
              <label htmlFor="take_away">Delivery <span className='reqMessage'>(optional) </span></label>
              <input type="number" placeholder="delivery" id='delivery' {...register("delivery", { required: false })} />
            </div>
            <div className="inputWrapper">
              <label htmlFor="take_away">Take Away <span className='reqMessage'>(optional) </span></label>
              <input type="number" placeholder="take_away" id='take_away' {...register("take_away", { required: false })} />
            </div>
            <div className="inputWrapper">
              <span>Image <span className='reqMessage'>(optional) </span></span>
            </div>
            <label title='upload image' htmlFor="image" >
              <div className='imageDropper'>
                {!imageUrl ?
                  <img className='imageUpPlaceholder'
                    alt={"profile_pic"}
                    src={"https://i.postimg.cc/rFzvBdw7/gallery.png"}
                  /> :
                  <img className='imageUp'
                    alt={"profile_pic"}
                    src={imageUrl}
                  />
                }
                {!imageUrl && <>
                  <p>Click to upload a file</p>
                  <p style={{ fontSize: '0.7rem', color: '#ccc' }}>Only JPG, JPEG & PNG image supported</p>
                </>}
              </div>
            </label>
            <input type={"file"} accept={"image/x-png,image/jpg,image/jpeg"} style={{ display: 'none' }} placeholder="image" id='image' {...register("image", {
              onChange: (e) => {
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              },
              required: false,
            })} />

          </div>
        </div>

        {/* INFORMATION TAB  */}
        <div style={{ display: `${onInformationTab ? "block" : "none"}` }} className='container' >
          <h1>Add Informations</h1>
          <div className='addDishForm'>
            <div className="inputWrapper">
              <label htmlFor="ingredients">Ingredients <span className='reqMessage'>(optional) </span></label>
              <input type="text" placeholder="ingredients" id='ingredients' {...register("ingredients", {})} />
            </div>
            <div className="inputWrapper">
              <label htmlFor="calories">Calories <span className='reqMessage'>(optional) </span></label>
              <input type="number" placeholder="calories" id='calories' {...register("calories", {})} />
            </div>

          </div>
        </div>

        {/* VARIATION TAB  */}
        <div style={{ display: `${onVariationTab ? "block" : "none"}` }} className='container' >
          <h1>Add Variations</h1>
          <div className='addDishForm'>
            <div className="inputWrapper">
              <label htmlFor="name">Dish Name <span className='errorMsg'>{errors?.name && "Dish Name is required! "}</span></label>
              <input type="text" placeholder="name" id='name' {...register("name", { required: false })} />
            </div>

          </div>
        </div>
        {isLoading?<div className='loading'>Loading ...</div>:
        <input className='submitButton' type="submit" />}
      </form>

    </div>)
    }
    </>
  );
};

export default AddDish;
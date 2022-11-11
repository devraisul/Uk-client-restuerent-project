import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDishes, addDishImage } from '../../../Apis/dish';
import { addSingleDishVaiation, getVariation } from '../../../Apis/variation';
import { useAuth } from '../../../context/AuthContext';
import styles from './AddDish.module.css';
const AddDish = ({ menuId, restaurentId, menuName, setIsChangeMenu, closeModal }) => {
  const user = useAuth()

  const [imageUrl, setImageUrl] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false)
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false)

  // TAB NAMES 
  const [onDetailsTab, setOnDetailsTab] = useState(true);
  const [onInformationTab, setOnInformationTab] = useState(false);
  const [onVariationTab, setOnVariationTab] = useState(false);

  // VARIATION DATA 
  const [variations, setVariations] = useState([])
  const [vtype, setVtype] = useState({})
  const [vAllowed, setVAllowed] = useState({})


  const handleVariation = (e) => {
    const { name, value } = e.target
    console.log({ name, value });
    if (name === "no_of_varation_allowed") {
      setVAllowed({ name: value })
    } else {
      setVtype({ name: value })
    }
  }
  const addVariationHandle = () => {
  }
  useEffect(() => {
    console.log('====================================');
    console.log({ vtype });
    console.log('====================================');
    console.log('====================================');
    console.log({ vAllowed });
    console.log('====================================');
  }, [vAllowed, vtype])

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

  // HANDLE FORM SUBMISSION 
  const onSubmit = data => {
    console.log({ data });
    setIsLoading(true)
    const variationsData = [];

    variationsData.type_id = (data?.type_id !== "0") ? data?.type_id : null
    variationsData.no_of_varation_allowed = (data?.no_of_varation_allowed !== "0") ? data?.no_of_varation_allowed : null


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
        if ((variationsData?.no_of_varation_allowed !== null) && (variationsData?.type_id !== null)) {
          variationsData.dish_id = res.data[0]?.id;
          addSingleDishVaiation(variationsData).then((res) => {
            if (res?.data?.id) {
              setIsLoading(false)
              setSubmittedSuccessfully(true);
              setTimeout(() => {
                setIsChangeMenu(Math.random())
                closeModal()
              }, 2000);
            }
          })
        } else {
          setIsLoading(false)
          setSubmittedSuccessfully(true);
          setTimeout(() => {
            setIsChangeMenu(Math.random())
            closeModal()
          }, 2000);
        }
      }
    })
  };

  // HANDLE FORM VALIDATIONS 
  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      setOnDetailsTab(true)
      setOnInformationTab(false)
      setOnVariationTab(false)
    }
  }, [errors])

  // GET VARIATIONS 
  useEffect(() => {
    getVariation(user?.user?.restaurant[0]?.id).then(res => {
      setVariations(res.data)
    })
  }, [user]);

  return (
    <>
      {submittedSuccessfully ?
        (
          <div className={styles.SubmitedMessage}>
            <img src="https://i.postimg.cc/MGXQ6w85/13-pizza-outline.gif" alt="done" className='doneImage' />
            <p>Submitted!</p>
          </div>
        )
        :
        (
          <div>
            {/* POPUP CLOSE BUTTON  */}
            <div className={styles.crossPopup}>
              <button onClick={closeModal}>X</button>
            </div>

            {/* TAB TOGGLE BUTTONS  */}
            <div className={styles.buttonsContainer}>
              <Button
                className={styles.tabButton}
                onClick={shitToDetailsTab}
                style={{
                  background: `${onDetailsTab ? "#0575B4" : ""}`,
                  color: `${onDetailsTab ? "#fff" : ""}`
                }}
              >Details</Button>
              <Button
                className={styles.tabButton}
                disabled={(errors?.DishName || errors?.description) && true}
                onClick={shitToInformationTab}
                style={{
                  background: `${onInformationTab ? "#0575B4" : ""}`,
                  color: `${onInformationTab ? "#fff" : ""}`
                }}
              >Imformations</Button>
              <Button
                className={styles.tabButton}
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
                <div className={styles.addDishForm}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="DishName">Dish Name <span className={styles.errorMsg}>{errors?.DishName && "Dish Name is required! "}</span></label>
                    <input type="text" placeholder="Dish name" id='DishName' {...register("DishName", { required: true })} />
                  </div>
                  <div className={styles.inputWrapper} >
                    <label htmlFor="description">Description <span className='errorMsg'>{errors?.description && "Description is required! "}</span></label>
                    <input type="text" placeholder="description" id='description' {...register("description", { required: true })} />
                  </div>
                  <div className={styles.inputWrapper} >
                    <label htmlFor="price">Price <span className='errorMsg'>{errors?.price && "Price is required! "}</span></label>
                    <input type="number" defaultValue={0} placeholder="price" id='price' {...register("price", { required: false })} />
                  </div>
                  <div className={styles.inputWrapper} >
                    <label htmlFor="take_away">Delivery <span className='reqMessage'>(optional) </span></label>
                    <input type="number" placeholder="delivery" id='delivery' {...register("delivery", { required: false })} />
                  </div>
                  <div className={styles.inputWrapper} >
                    <label htmlFor="take_away">Take Away <span className='reqMessage'>(optional) </span></label>
                    <input type="number" placeholder="take_away" id='take_away' {...register("take_away", { required: false })} />
                  </div>
                  <div className={styles.inputWrapper} >
                    <span>Image <span className='reqMessage'>(optional) </span></span>
                  </div>
                  <label title='upload image' htmlFor="image" >
                    <div className={styles.imageDropper} >
                      {!imageUrl ?
                        <img className={styles.imageUpPlaceholder}
                          alt={"profile_pic"}
                          src={"https://i.postimg.cc/rFzvBdw7/gallery.png"}
                        /> :
                        <img className={styles.imageUp}
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
              <div style={{ display: `${onInformationTab ? "block" : "none"}` }} className={styles.container}  >
                <h1>Add Informations</h1>
                <div className={styles.addDishForm}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="ingredients">Ingredients <span className={styles.reqMessage}>(optional) </span></label>
                    <input type="text" placeholder="ingredients" id='ingredients' {...register("ingredients", {})} />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="calories">Calories <span className={styles.reqMessage}>(optional) </span></label>
                    <input type="number" placeholder="calories" id='calories' {...register("calories", {})} />
                  </div>

                </div>
              </div>

              {/* VARIATION TAB  */}
              <div style={{ display: `${onVariationTab ? "block" : "none"}` }} className={styles.container}  >
                <h1>Add Variations</h1>
                <div>
                  <button onClick={addVariationHandle}>Add More</button>
                </div>
                <div className='addDishForm'>
                  <select name='type_id' onChange={(e) => { handleVariation(e) }} className={styles.selectVariations} >
                    <option value={0}>* Select a type</option>
                    {variations?.map((item, i) => {
                      return (
                        <option key={i} value={item?.id} >{item?.name}</option>
                      )
                    })}
                  </select>
                  <select name='no_of_varation_allowed' onChange={(e) => { handleVariation(e) }} className={styles.selectVariations} >
                    <option value={0}>* Select No of Variation Allowed</option>
                    <option value={1} >1</option>
                    <option value={2} >2</option>
                    <option value={3} >3</option>
                    <option value={4} >4</option>
                    <option value={5} >5</option>
                  </select>
                </div>
              </div>
              {isLoading ? <div className='loading'>Loading ...</div> :
                <input className={styles.submitButton} type="submit" />}
            </form>

          </div>)
      }
    </>
  );
};

export default AddDish;
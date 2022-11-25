import { Button } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { addDishes, addDishImage, getDishById, updateSingleDish } from '../../../Apis/dish';
import { getVariation, getVariationByRestaurantIdAndDishId, Variationlink } from '../../../Apis/variation';
import Loading from '../../../components/Loading/Loading';
import { useAuth } from '../../../context/AuthContext';
import styles from './AddDish.module.css';
const AddDish = ({ menuId, restaurentId, menuName, setIsChangeMenu, closeModal, inEditMode }) => {
  const user = useAuth()


  // ===================== FROM API ========================
  // SINGLE DISH DATA ======================================
  const [singleDish, setSingleDish] = useState({})
  // Variations ============================================
  const [singleVariation, setSingleVariation] = useState()

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
  const [isChecked, setIsChecked] = useState([{
    type_id: 0, no_of_varation_allowed: 0
  }])
  const [variationTypeForVariationNumber, setVariationTypeForVariationNumber] = useState([])


  // LOADINGS 
  const [isDishLoading, setIsDishLoading] = useState(true)


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

  const handleAllowedVariation = (e, vId) => {
    const { name, value } = e.target;
    console.log('drom', { vId, name, value });
    const objID = isChecked.findIndex((obj => obj.type_id === vId));

    isChecked[objID].no_of_varation_allowed = parseInt(value)

    variations.map(variation => {
      if (variation.type_id === parseInt(vId)) {
        variation.no_of_varation_allowed = value
      }
    })
  }

  const handleCkeckBox = (e, allowed) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecked([...isChecked, { type_id: parseInt(value), no_of_varation_allowed: parseInt(allowed) }]);
    }
    if (!checked) {
      setIsChecked(isChecked.filter(e => e.type_id !== parseInt(value)))
    }
  }



  // HANDLE FORM SUBMISSION 
  const onSubmit = (data, e) => {
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

    if (inEditMode?.status) {
      // UPDATE DISH 
      dishData.id = inEditMode?.dish_id;
      console.log({ dishData });
      updateSingleDish(dishData).then(res => {
        console.log('single', res);
        const variationArray = isChecked.filter(data => data.type_id !== 0)
        var Data = new FormData()
        // IF HAVE IMAGE AND HAVE VARIATIONS
        if (data?.image[0] !== undefined) {
          Data.append('image', data?.image[0], data?.image[0].name);

          addDishImage(res?.data?.id, Data).then((resImg) => {
            if (resImg?.data) {
              // IF IMAGE AND VARIATION HAVE 
              if (variationArray.length > 0) {
                Variationlink(res.data[0].id, { varation: variationArray }).then((res) => {
                  if (res?.data.length > 0) {
                    setIsLoading(false)
                    setSubmittedSuccessfully(true);
                    toast.success("Dish added succeffully!")
                    setTimeout(() => {
                      setIsChangeMenu(Math.random())
                      closeModal()
                    }, 2000);
                  }
                })
              } else {
                setIsLoading(false)
                toast.success("Dish added successfully!")
                setSubmittedSuccessfully(true);
                setTimeout(() => {
                  setIsChangeMenu(Math.random())
                  closeModal()
                }, 2000);
              }
            } else {
              toast.error("Dish add but iamge throw an error!")
            }
          })
        } else {
          // IF HAVE NO IMAGE AND HAVE VARIATION
          if (variationArray.length > 0) {
            console.log(res);
            Variationlink(res?.data?.id, { varation: variationArray })
              .then((res) => {
                if (res?.data.length > 0) {
                  setIsLoading(false)
                  toast.success('Dish added successfully!')
                  setSubmittedSuccessfully(true);
                  setTimeout(() => {
                    setIsChangeMenu(Math.random())
                    closeModal()
                  }, 2000);
                } else {
                  toast.error("Dish added but variation throw an error!")
                }
              })
          } else {
            // NO ADITIONAL INFO FOUND 
            setIsLoading(false)
            toast.success("Dish added successfully!")
            setSubmittedSuccessfully(true);
            setTimeout(() => {
              setIsChangeMenu(Math.random())
              closeModal()
            }, 2000);

          }
        }
      });
    } else {
      // ADD DISH 
      addDishes(restaurentId, dishData).then(res => {
        const variationArray = isChecked.filter(data => data.type_id !== 0)
        var Data = new FormData()
        // IF HAVE IMAGE AND HAVE VARIATIONS
        if (data?.image[0] !== undefined) {
          Data.append('image', data?.image[0], data?.image[0].name);
          addDishImage(res.data[0]?.id, Data).then((resImg) => {
            console.log('imageData: ', resImg);
            if (resImg.data) {
              // IF IMAGE AND VARIATION HAVE 
              if (variationArray.length > 0) {
                Variationlink(res.data[0].id, { varation: variationArray }).then((res) => {
                  if (res?.data.length > 0) {
                    setIsLoading(false)
                    setSubmittedSuccessfully(true);
                    toast.success("Dish added succeffully!")
                    setTimeout(() => {
                      setIsChangeMenu(Math.random())
                      closeModal()
                    }, 2000);
                  }
                })
              } else {
                setIsLoading(false)
                toast.success("Dish added successfully!")
                setSubmittedSuccessfully(true);
                setTimeout(() => {
                  setIsChangeMenu(Math.random())
                  closeModal()
                }, 2000);
              }
            } else {
              toast.error("Dish add but iamge throw an error!")
            }
          })
        } else {
          // IF HAVE NO IMAGE AND HAVE VARIATION
          if (variationArray.length > 0) {
            Variationlink(res.data[0].id, { varation: variationArray })
              .then((res) => {
                if (res?.data.length > 0) {
                  setIsLoading(false)
                  toast.success('Dish added successfully!')
                  setSubmittedSuccessfully(true);
                  setTimeout(() => {
                    setIsChangeMenu(Math.random())
                    closeModal()
                  }, 2000);
                } else {
                  toast.error("Dish added but variation throw an error!")
                }
              })
          } else {
            // NO ADITIONAL INFO FOUND 
            setIsLoading(false)
            toast.success("Dish added successfully!")
            setSubmittedSuccessfully(true);
            setTimeout(() => {
              setIsChangeMenu(Math.random())
              closeModal()
            }, 2000);

          }
        }
      });
    }
  };

  // GET VARIATIONS 
  useEffect(() => {
    getVariation(user?.user?.restaurant[0]?.id).then(res => {
      setVariationTypeForVariationNumber(res?.data)
      setVariations(res?.data.map(v => {
        return { type_id: parseInt(v.id), name: v.name, no_of_varation_allowed: 0 }
      }))
    })
  }, [user]);

  // GET SINGLE DISH 
  useEffect(() => {
    if (inEditMode?.status) {
      setIsDishLoading(true)
      getDishById(inEditMode?.dish_id)
        .then(res => {
          console.log('data', res);
          setSingleDish(res);
          console.log("dishData", res?.id);
          if (res.id) {
            getVariationByRestaurantIdAndDishId(res?.id)
              .then(res => {
                res.map(variation => {
                  setIsChecked([...isChecked, {
                    type_id: variation?.type_id
                    , no_of_varation_allowed: variation?.no_of_varation_allowed
                  }])
                })

                setSingleVariation(res);
                setIsDishLoading(false)
              })
          }
        })
    }

  }, [inEditMode])


  const history = useHistory()
  useEffect(() => {
    console.log({ isChecked })
  },[isChecked])

  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />

      {submittedSuccessfully ?
        (<div className={styles.SubmitedMessage}>
          <img src="https://i.postimg.cc/MGXQ6w85/13-pizza-outline.gif" alt="done" className='doneImage' />
          <p>Submitted!</p>
        </div>)
        :
        (
          <>
            {inEditMode.status ?
              // ======= ON EDIT DISH MODE ========
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

                {/* MAIN FORM  */}
                {isDishLoading ?
                  <Loading />
                  :
                  <div className={styles.containerOfForm}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* DETAILS TAB  */}
                      <div style={{ display: `${onDetailsTab ? "block" : "none"}` }} className={styles.container} >
                        <h1>Add Dish</h1>
                        <div className={styles.addDishForm}>
                          <div className={styles.inputWrapper}>
                            <label
                              htmlFor="DishName">
                              Dish Name
                              <span
                                className={styles.errorMsg}>
                                {errors?.DishName && "Dish Name is required! "}
                              </span>
                            </label>
                            <input
                              defaultValue={singleDish?.name}
                              type="text"
                              placeholder="Dish name"
                              id='DishName'
                              {...register("DishName", { required: true })} />
                          </div>
                          <div
                            className={styles.inputWrapper} >
                            <label
                              htmlFor="description">
                              Description <span className={styles.errorMsg}>
                                {errors?.description && "Description is required! "}
                              </span>
                            </label>
                            <input
                              defaultValue={singleDish?.description}
                              type="text"
                              placeholder="description"
                              id='description'
                              {...register("description", { required: true })} />
                          </div>
                          <div
                            className={styles.inputWrapper} >
                            <label
                              htmlFor="price">
                              Price <span className={styles.errorMsg}>
                                {errors?.price && "Price is required! "}
                              </span>
                            </label>
                            <input
                              defaultValue={singleDish?.price}
                              onWheel={(e) => e.target.blur()}
                              type="number"
                              placeholder="price"
                              id='price'
                              {...register("price", { required: false })} />
                          </div>
                          <div className={styles.inputWrapper} >
                            <label
                              htmlFor="take_away">
                              Delivery <span
                                className={styles.reqMessage}>
                                (optional)
                              </span>
                            </label>
                            <input
                              defaultValue={singleDish?.delivery}
                              onWheel={(e) => e.target.blur()}
                              type="number"
                              placeholder="delivery"
                              id='delivery'
                              {...register("delivery", { required: false })} />
                          </div>
                          <div className={styles.inputWrapper} >
                            <label
                              htmlFor="take_away">Take Away <span className={styles.reqMessage}>(optional) </span>
                            </label>
                            <input
                              defaultValue={singleDish?.delivery}
                              onWheel={(e) => e.target.blur()}
                              type="number"
                              placeholder="take_away"
                              id='take_away'
                              {...register("take_away", { required: false })} />
                          </div>
                          <div className={styles.inputWrapper} >
                            <span>Image <span className='reqMessage'>(optional) </span></span>
                          </div>
                          <label title='upload image' htmlFor="image" >
                            <div className={styles.imageDropper} >
                              {!imageUrl ?
                                <img className={styles.imageUpPlaceholder}
                                  alt={"profile_pic"}
                                  src={`https://mughalsignandprint.co.uk/restaurant2/${singleDish?.image}`}
                                /> :
                                <img className={styles.imageUp}
                                  alt={"profile_pic"}
                                  src={imageUrl}
                                />
                              }
                              {!imageUrl && <>
                                <p>Click to upload a new file</p>
                                <p style={{ fontSize: '0.7rem', color: '#ccc' }}>Only JPG, JPEG & PNG image supported</p>
                              </>}
                            </div>
                          </label>
                          <input
                            type={"file"}
                            accept={"image/x-png,image/jpg,image/jpeg"}
                            style={{ display: 'none' }}
                            placeholder="image"
                            id='image'
                            {...register("image", {
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
                            <input defaultValue={singleDish?.ingredients} type="text" placeholder="ingredients" id='ingredients' {...register("ingredients", {})} />
                          </div>
                          <div className={styles.inputWrapper}>
                            <label htmlFor="calories">Calories <span className={styles.reqMessage}>(optional) </span></label>
                            <input defaultValue={singleDish?.calories} onWheel={(e) => e.target.blur()} type="number" placeholder="calories" id='calories' {...register("calories", {})} />
                          </div>

                        </div>
                      </div>


                      {/* VARIATION TAB  */}
                      <div style={{ display: `${onVariationTab ? "block" : "none"}` }} className={styles.container}  >
                        <h1 style={{ marginBottom: '10px' }}>Add Variations</h1>
                        <>
                          <Table>
                            <TableHead>
                              <TableRow style={{ background: '#0575B4' }}>
                                <TableCell style={{ color: '#fff' }} width="2%">Linked</TableCell>
                                <TableCell style={{ color: '#fff' }} width="59%">Variation Type</TableCell>
                                <TableCell style={{ color: '#fff' }} width="39%">Allowed</TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {variations.map((variation, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    <input
                                      defaultValue={variation?.type_id}
                                      defaultChecked={variation?.type_id === singleVariation[index]?.type_id ? true : false}
                                      onChange={(e) => { handleCkeckBox(e, variation?.no_of_varation_allowed ? variation?.no_of_varation_allowed : singleVariation.no_of_varation_allowed) }}
                                      type="checkbox"
                                      name="" />
                                  </TableCell>
                                  <TableCell>{variation?.name}{console.log({ variation })}</TableCell>
                                  <TableCell>
                                    <select
                                      disabled={isChecked.filter(data => data.type_id === variation?.type_id).length > 0 ? false : true}

                                      name='no_of_varation_allowed'

                                      defaultValue={
                                        {}
                                        // variation?.type_id === isChecked[index]?.type_id? 
                                        // {value:isChecked[index].type_id,label:variation?.name}
                                        //  : 
                                        // {value:0,label:'* Select No of Variation Allowed'}
                                      }

                                      onChange={(e) => { handleAllowedVariation(e, variation.type_id) }}

                                      className={styles.selectVariations} >

                                      <option value={0}>* Select No of Variation Allowed</option>
                                      {
                                        [...Array(variationTypeForVariationNumber[index]?.variation_count)].map((elementInArray, index) => (<option key={index} value={index + 1}>{index + 1}</option>))
                                      }
                                    </select>
                                  </TableCell>
                                </TableRow>

                              ))}
                            </TableBody>
                          </Table>
                        </>
                      </div>
                      <input id='sunmitBtn' hidden type="submit" />
                    </form>
                  </div>}

                {isLoading ?
                  <div className={styles.loading}>Loading ...</div> :
                  <label className={styles.submitButton} htmlFor="sunmitBtn">Submit</label>
                }
              </div>
              :
              // ======= ON ADD DISH MODE ========
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


                <div className={styles.containerOfForm}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* DETAILS TAB  */}
                    <div style={{ display: `${onDetailsTab ? "block" : "none"}` }} className={styles.container} >
                      <h1>Add Dish</h1>
                      <div className={styles.addDishForm}>
                        <div className={styles.inputWrapper}>
                          <label htmlFor="DishName">Dish Name <span className={styles.errorMsg}>{errors?.DishName && "Dish Name is required! "}</span></label>
                          <input type="text" placeholder="Dish name" id='DishName' {...register("DishName", { required: true })} />
                        </div>
                        <div className={styles.inputWrapper} >
                          <label htmlFor="description">Description <span className={styles.errorMsg}>{errors?.description && "Description is required! "}</span></label>
                          <input type="text" placeholder="description" id='description' {...register("description", { required: true })} />
                        </div>
                        <div className={styles.inputWrapper} >
                          <label htmlFor="price">Price <span className={styles.errorMsg}>{errors?.price && "Price is required! "}</span></label>
                          <input onWheel={(e) => e.target.blur()} type="number" defaultValue={0} placeholder="price" id='price' {...register("price", { required: false })} />
                        </div>
                        <div className={styles.inputWrapper} >
                          <label htmlFor="take_away">Delivery <span className={styles.reqMessage}>(optional) </span></label>
                          <input onWheel={(e) => e.target.blur()} type="number" placeholder="delivery" id='delivery' {...register("delivery", { required: false })} />
                        </div>
                        <div className={styles.inputWrapper} >
                          <label htmlFor="take_away">Take Away <span className={styles.reqMessage}>(optional) </span></label>
                          <input onWheel={(e) => e.target.blur()} type="number" placeholder="take_away" id='take_away' {...register("take_away", { required: false })} />
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
                          <input onWheel={(e) => e.target.blur()} type="number" placeholder="calories" id='calories' {...register("calories", {})} />
                        </div>

                      </div>
                    </div>


                    {/* VARIATION TAB  */}
                    <div style={{ display: `${onVariationTab ? "block" : "none"}` }} className={styles.container}  >
                      <h1 style={{ marginBottom: '10px' }}>Add Variations</h1>

                      <>
                        <Table>
                          <TableHead>
                            <TableRow style={{ background: '#0575B4' }}>
                              <TableCell style={{ color: '#fff' }} width="2%">Linked</TableCell>
                              <TableCell style={{ color: '#fff' }} width="59%">Variation Type</TableCell>
                              <TableCell style={{ color: '#fff' }} width="39%">Allowed</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {variations.length > 0 ? variations.map((variation, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <input
                                    value={variation?.type_id}
                                    checked={variation.isChecked}
                                    onChange={(e) => { handleCkeckBox(e, variation?.no_of_varation_allowed) }} type="checkbox"
                                    name="" />
                                </TableCell>
                                <TableCell>{variation?.name}</TableCell>
                                <TableCell>

                                  <select
                                    disabled={isChecked.filter(data => data.type_id === variation?.type_id).length > 0 ? false : true}
                                    name='no_of_varation_allowed'
                                    onChange={(e) => { handleAllowedVariation(e, variation.type_id) }}
                                    className={styles.selectVariations} >
                                    <option value={0}>* Select No of Variation Allowed</option>
                                    {
                                      [...Array(variationTypeForVariationNumber[index]?.variation_count)].map((elementInArray, index) => (<option key={index} value={index + 1}>{index + 1}</option>))
                                    }
                                  </select>
                                </TableCell>
                              </TableRow>
                            )) :
                              <TableRow>
                                <TableCell colSpan={3}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', color: '#aaa' }}>
                                    <span>No Dish Option Found!</span> <br />
                                    <span>Add Dish Options To Link With Dishes</span> <br />
                                    <Button onClick={() => { history.push('/app/dish-options/') }} style={{ background: '#0575B4', color: '#fff' }}>Add Dish Options</Button>
                                  </div>

                                </TableCell>
                              </TableRow>
                            }
                          </TableBody>
                        </Table>
                      </>
                    </div>
                    <input id='sunmitBtn' hidden type="submit" />
                  </form>

                </div>

                {isLoading ?
                  <div className={styles.loading}>Loading ...</div> :
                  <label className={styles.submitButton} htmlFor="sunmitBtn">Submit</label>
                }
              </div>}
          </>
        )
      }
    </>
  );
};

export default AddDish;
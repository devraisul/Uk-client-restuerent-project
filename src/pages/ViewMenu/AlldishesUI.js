import React, { Fragment, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FiLoader, FiSave, FiTrash2, FiUploadCloud } from 'react-icons/fi';
import { IoCloudDoneOutline } from 'react-icons/io5';
// import configData from "../../config.json";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { addDishImage, deleteDish, updateSingleDish } from '../../Apis/dish';
import { getVariationByRestaurantIdAndDishId } from '../../Apis/variation';
import { useAuth } from '../../context/AuthContext';
import LinkVariation from './LinkVariation';
//all dishes show UI in owner dashboard
const AlldishesUI = ({ dishes, menuId, index, rid, setIsChangeMenu, handleEditDish }) => {
  const [showuploader, setsshowuploader] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [editflag, setseditflag] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const closeModal2 = () => setOpen2(false);
  const [dishimage, setimage] = useState();
  const { user } = useAuth();
  const [variationData, setVariationData] = useState([])
  const [isUploaded, setIsUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState("")
  const [isVariationChanged, setIsVariationChanged] = useState(Math.random())

  React.useEffect(() => {
    getVariationByRestaurantIdAndDishId(dishes?.id).then(res => {
      setVariationData(res?.data);
    })
  }, [user, isVariationChanged])

  const [formData, setFormData] = useState({
    id: dishes?.id,
    name: dishes?.name,
    price: dishes?.price,
    description: dishes?.description,
  });
  const { id, name, price, description } = formData;
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
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleLinkClick = () => {
    if (showLink) {
      setShowLink(false)
      setOpen(false)
    }
    else {
      setShowLink(true)
      setOpen(true)
    }
  }
  const handlepopup = () => {
    if (showLink) {
      setShowLink(false)
      setOpen(false)
    }
    else {
      setShowLink(true)
      setOpen(true)
    }
  }
  const handleSaveDish = async (e) => {
    e.preventDefault();
    updateSingleDish(formData).then(res => {
      if (res.data.id) {
        setIsChangeMenu(Math.random())
        setseditflag(!editflag)
      }
    })
  };
  const onSubmit3 = async (e, id) => {
    e.preventDefault();
    // unlink(id, dishes?.id)
    // window.location.reload(false)
  };
  const handleDeleteDish = async (e) => {
    e.preventDefault();
    deleteDish(dishes?.id).then(res => {
      if (res.data.message === "ok") {
        setIsChangeMenu(Math.random())
      }
    })
  };
  //submit the image to API
  const onSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const Data = new FormData();
    if (dishimage !== undefined) {
      Data.append('image', dishimage, dishimage.name);
      addDishImage(dishes?.id, Data).then((res) => {
        if (res.data) {
          setErrors("")
          setIsUploaded(true)
          setIsLoading(false)
          setTimeout(() => { setsshowuploader(true) }, 200)
        }
      })
    }
    if (dishimage === undefined) {
      setIsLoading(false)
      setErrors("Please add an image")
    }
  };
  const trimString = (string, length = 15) => {
    return string
      .slice(0, string.length >= length - 3 ? length - 3 : string.length)
      .padEnd(string.length >= length - 3 ? length : string.length,
        '.')
  }
  // STYLES 
  const Styles = {
    uploadImageButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    variationButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    variationButton: {
      display: 'block',
      cursor: 'pointer',
      textAlign: 'center',
      color: '#fff',
      background: '#0575B4',
      padding: '15px 5px',

      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      width: '140px',
    }
  }

  return (
    <Fragment>
      {editflag ? (
        <tbody>
          <tr>
            <td width="2%" >
              {index}
            </td>
            <td width="15%">

              {/* NAME  */}
              <form className='form' >
                <div className='form-groupnopadding'>
                  <input
                    style={{
                      outline: 'none',
                      fontSize: '0.8rem'
                    }}
                    type='text'
                    placeholder='Enter Restaurant Name'
                    name='name'
                    value={name}
                    onChange={(e) => onChange(e)}
                  //required
                  />
                </div>
              </form>

            </td>
            <td width="14%">
              {/* PRICE  */}
              <form className='form' >
                <div className='form-groupnopadding'>
                  <input
                    style={{
                      outline: 'none',
                      fontSize: '0.8rem',
                    }}
                    type='number'
                    placeholder='Enter Price'
                    name='price'
                    value={price}
                    onChange={(e) => onChange(e)}
                  //required
                  />
                </div>
              </form>
            </td>
            <td width="22%">
              <form className='form' >
                <div className='form-groupnopadding'>
                  <input
                    style={{
                      outline: 'none',
                      fontSize: '0.8rem'
                    }}
                    type='text'
                    placeholder='Enter Description'
                    name='description'
                    value={description}
                    onChange={(e) => onChange(e)}
                  //required
                  />
                </div>
              </form>
            </td>
            <td width="5%">
              {isUploaded ?
                <>
                  <div>
                    <IoCloudDoneOutline style={{ fontSize: "1.4rem", color: 'green' }} />
                  </div>
                </>
                :
                <>
                  {
                    !showuploader &&
                    <button title='upload image' style={{ background: '#0575B4' }} className='btn btn-primary2' onClick={(e) => handleAddClick(e)} >
                      <FiUploadCloud color='white' style={{ fontSize: "1.4rem" }} />
                    </button>
                  }
                  {isLoading &&
                    <button title='upload image' style={{ background: '#0575B4' }} className='btn btn-primary2'>
                      <FiLoader style={{ fontSize: "1.4rem" }} color='white' />
                    </button>
                  }
                  {
                    //show upload image option on click
                    showuploader ? (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                      }}>
                        <input
                          required
                          type='file'
                          id='image'
                          name='image'
                          onChange={(e) => onFileChange(e)}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                          {
                            errors && <span style={{ background: '#ffcccc', color: '#ff0000', padding: '2px 5px', borderRadius: '10px', marginTop: '5px' }} >
                              {errors && errors}
                            </span>
                          }
                          <input type='submit' className='btn btn-primary2' value='Add ' onClick={(e) => onSubmit(e)} />
                        </div>
                      </div>
                    ) : null}
                </>
              }
            </td>
            <td width="15%">
              <div>
                <ul>
                  {
                    variationData?.map((variation, i) => (
                      <li key={i} style={{
                        padding: '1px 4px',
                        background: '#0575B4',
                        color: '#ffffff',
                        margin: '1px 0px',
                        borderRadius: '30px',
                        justifyContent: 'space-between',
                        display: 'flex'
                      }}>

                        <span style={{ width: '20%' }} >{i + 1}</span>
                        <span style={{ width: '80%', textAlign: "left" }} >{variation?.variation_type?.name}</span>
                        {/* <span style={{ width: '20%' }} >{variation.no_of_varation_allowed}</span> */}
                      </li>
                    ))
                  }
                </ul>
                {/* <button
                  title='Link Variation'
                  style={{
                    textAlign: 'center',
                    width: '100%'
                  }}
                  onClick={(e) => handleLinkClick(e)} >
                  <AiOutlinePlus style={{
                    height: '25px',
                    width: '25px',
                    background: '#0575B4',
                    padding: '5px',
                    borderRadius: '50%',
                    fontSize: '2rem',
                    color: '#fff',
                    marginTop: '10px',
                    fontWeight: 'bold'
                  }} />
                </button> */}
                {
                  //show upload image option on click
                  showLink && (
                    <Fragment>
                      <Popup style={{ borderRadius: '30px' }} open={open} closeOnDocumentClick onClose={(e) => (handlepopup())}>
                        <button style={{ color: '#0575B4', marginRight: '15px' }} className="close" onClick={(e) => {
                          setOpen(false)
                          setIsVariationChanged(Math.random())
                        }}>
                          &times;
                        </button>
                        <div className='padding20px'>
                        </div>
                        <LinkVariation id={dishes?.id} rid={dishes?.restaurant_id} />
                      </Popup>
                    </Fragment>
                  )}
              </div>
            </td>
            <td width="2%">
              <div>
                <button title='update' className='btn btn-primary2' onClick={(e) => handleSaveDish(e)}><FiSave /></button>
              </div>
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td width="5%">{dishes?.id}</td>
            <td width="15%">{dishes?.name}</td>
            <td width="10%">£ {dishes?.price}</td>
            <td width="15%">{trimString(dishes?.description)}</td>
            <td style={{ padding: '0' }} width="30%">
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {(dishes?.image) ? (
                  <img
                    style={{
                      objectFit: 'cover',
                      height: '100px'
                    }}
                    height={'100px'}
                    className="roundimgg"
                    src={`https://mughalsignandprint.co.uk/restaurant/${dishes?.image}`}
                    alt={`${dishes?.name}`}
                    onClick={(e) => setOpen2(true)}
                  />
                ) : (dishes?.image)}
              </div>
              {/* <button className='btn btn-primary2' onClick={(e) => handleAddClick(e)}>
                  Upload Image
                </button>
                {//show upload image option on click
                  showuploader ? (
                    <Fragment>
                      <div className='form-groupnopaddingnopadding'>
                        <input
                          type='file'
                          id='image'
                          name='image'
                          onChange={(e) => onFileChange(e)}
                        />
                      </div>
                      <input type='submit' className='btn btn-primary2' value='Add ' onClick={(e) => onSubmit(e)} />
                    </Fragment>
                  ) : null} */}
            </td>
            <td width="10%">
              <div>
                <ul>
                  {
                    variationData?.map((variation, i) => (
                      <li key={i} style={{
                        padding: '1px 4px',
                        background: '#0575B4',
                        color: '#ffffff',
                        margin: '1px 0px',
                        borderRadius: '30px',
                        justifyContent: 'space-between',
                        display: 'flex'
                      }}>

                        <span style={{ width: '20%' }} >{i + 1}</span>
                        <span style={{ width: '80%', textAlign: "left" }} >{variation?.variation_type?.name}</span>
                        {/* <span style={{ width: '20%' }} >{variation.no_of_varation_allowed}</span> */}
                      </li>
                    ))
                  }
                </ul>
                {showLink && (
                  <Fragment>
                    <Popup style={{ borderRadius: '30px' }} open={open} closeOnDocumentClick onClose={(e) => (handlepopup())}>
                      <button style={{ color: '#0575B4', marginRight: '15px' }} className="close" onClick={(e) => {
                        setOpen(false)
                        setIsVariationChanged(Math.random())
                      }}>
                        &times;
                      </button>
                      <div className='padding20px'>
                      </div>
                      <LinkVariation id={dishes?.id} rid={dishes?.restaurant_id} />
                    </Popup>
                  </Fragment>
                )}
              </div>
            </td>
            <td width="5%">
              <div>
                <AiFillEdit 
                title='edit' 
                style={{ fontSize: '1.2rem', margin: '2px', color: 'green', cursor: 'pointer' }} 
                onClick={(e) => handleEditDish(dishes?.id)}
                ></AiFillEdit>
                <FiTrash2 
                title='delete' 
                style={{ fontSize: '1.2rem', margin: '2px', color: 'red', cursor: 'pointer' }} 
                onClick={(e) => handleDeleteDish(e)}
                ></FiTrash2>
              </div>
            </td>
          </tr>
        </tbody>
      )}
    </Fragment>
  )
};

export default AlldishesUI;
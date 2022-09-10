import React, { Fragment, useState } from 'react';
// import configData from "../../config.json";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { getVariation } from '../../Apis/variation';
import { useAuth } from '../../context/AuthContext';
import LinkVariation from './linkvariationform';
//all dishes show UI in owner dashboard
const AlldishesUI = ({ dishes,
  menuId, index, id }) => {
  const [showuploader, setsshowuploader] = useState(false);
  const [showlink, setsshowlink] = useState(false);
  const [editflag, setseditflag] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const closeModal2 = () => setOpen2(false);
  const [dishimage, setimage] = useState();
  const { user } = useAuth();
  const [variationData, setVariationData] = useState([])
  React.useEffect(() => {
    getVariation(user.restaurant[0].id)
      .then(res => {
        console.log(res?.data);
        setVariationData(res?.data);
      })
  }, [])
  const [formData, setFormData] = useState({
    Did: dishes?.id,
    Name: dishes?.name,
    Price: dishes?.price,
    Description: dishes?.description,
  });
  const { Did, Name, Price, Description } = formData;
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
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleLinkClick = () => {
    if (showlink) {
      setsshowlink(false)
      setOpen(false)
    }
    else {
      setsshowlink(true)
      setOpen(true)
    }
  }

  const handlepopup = () => {
    if (showlink) {
      setsshowlink(false)
      setOpen(false)
    }
    else {
      setsshowlink(true)
      setOpen(true)
    }
  }

  const onSubmit2 = async (e) => {
    e.preventDefault();
    setseditflag(!editflag)
    // Editdishsingle(formData)

    // window.location.reload(false)


  };

  const onSubmit3 = async (e, id) => {
    e.preventDefault();
    // unlink(id, dishes?.id)

    // window.location.reload(false)


  };

  const onSubmit4 = async (e) => {
    e.preventDefault();

    // await deletedish(dishes?.id)
    // window.location.reload(false)


  };
  //submit the image to API
  const onSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    console.log(dishimage)
    if (dishimage !== undefined) {
      Data.append('image', dishimage, dishimage.name);
      // addimage(Data, dishes?.id)
    }

  };
  return (
    <Fragment>
      {editflag ? (<tbody>

        <tr>


          <td>

            <form className='form' >
              <div className='form-groupnopadding'>
                <input
                  type='text'
                  placeholder='Enter Restaurant Name'
                  name='Name'
                  value={Name}
                  onChange={(e) => onChange(e)}
                //required
                />
              </div>
            </form>
          </td>
          <td>
            <form className='form' >
              <div className='form-groupnopadding'>
                <input
                  type='number'
                  placeholder='Enter Restaurant Name'
                  name='Price'
                  value={Price}
                  onChange={(e) => onChange(e)}
                //required
                />
              </div>
            </form>
          </td>
          <td>
            <form className='form' >
              <div className='form-groupnopadding'>
                <input
                  type='text'
                  placeholder='Enter Restaurant Name'
                  name='Description'
                  value={Description}
                  onChange={(e) => onChange(e)}
                //required
                />
              </div>
            </form>
          </td>

          <td>

            <button className='btn btn-primary2' onClick={(e) => handleAddClick(e)} disabled>
              Upload Image
            </button>
            {//show upload image option on click
              showuploader ? (
                <Fragment>
                  <div className='form-groupnopadding'>
                    <input
                      type='file'
                      id='image'
                      name='image'
                      onChange={(e) => onFileChange(e)}
                    />

                  </div>

                  <input type='submit' className='btn btn-primary2' value='Add ' onClick={(e) => onSubmit(e)} />
                </Fragment>
              ) : null}
          </td>

          <td>
            <button className='btn btn-primary2' onClick={(e) => handleLinkClick(e)} disabled>
              Link Variation
            </button>

            {//show upload image option on click
              showlink ? (<Fragment>
                <Popup open={open} closeOnDocumentClick onClose={(e) => (handlepopup())}>


                  <a className="close" onClick={(e) => (setOpen(false))}>
                    &times;
                  </a>
                  <div className='padding20px'>

                  </div>





                </Popup>

              </Fragment>) : null}
          </td>
          <td>{index}</td>
          <td>
            {variationData?.map((variation, i) => (<Fragment>

              <button className='btn btn-primary2'>{variation?.description}</button>
            </Fragment>))}
          </td>
          <td>

            <div>
              <button className='btn btn-primary2' onClick={(e) => onSubmit2(e)}>Update</button>
            </div>
          </td>
          <td>
            <i className="fas fa-times" onClick={(e) => onSubmit4(e)}></i>
          </td>
        </tr>
      </tbody>) : (<tbody>

        <tr>
          <td>{index}</td>
          <td>{dishes?.name}</td>
          <td>
            {dishes?.price} £
          </td>
          <td>{dishes?.description}</td>

          <td>
            <button className='btn btn-primary2' onClick={(e) => handleAddClick(e)}>
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
              ) : null}
          </td>

          <td>
            <button className='btn btn-primary2' onClick={(e) => handleLinkClick(e)}>
              Link Variation
            </button>

            {//show upload image option on click
              showlink ? (<Fragment>

                <Popup open={open} closeOnDocumentClick onClose={(e) => (handlepopup())}>


                  <a className="close" onClick={(e) => (setOpen(false))}>
                    &times;
                  </a>
                  <div className='padding20px'>

                  </div>
                  <LinkVariation id={dishes?.id} rid={dishes?.restaurant_id} />
                </Popup>

              </Fragment>) : null}
          </td>
          <td>
            {variationData?.map((variation, i) => (<Fragment>

              {/* <button className='btn btn-primary2' > {variation?.description} <i className="fas fa-times" onClick={(e) => onSubmit3(e, variation?.id)} ></i></button> */}
              {<Fragment>

                <Popup open={open2} closeOnDocumentClick onClose={(e) => (setOpen2(false))}>


                  <a className="close" onClick={(e) => (setOpen2(false))}>
                    &times;
                  </a>
                  <div className='padding20px'>

                  </div>
                  <form className='form' >
                    <div className='form-groupnopadding'>
                      <p>No of Variation Allowed</p>
                      <input
                        type='text'
                        placeholder='Enter Restaurant Name'
                        name='va'
                        value={variation.allowed}
                        onChange={(e) => onChange(e)}
                      //required
                      />
                    </div>
                  </form>


                </Popup>

              </Fragment>}
            </Fragment>))}

          </td>
          <td style={{ cursor: "pointer" }}>
            <i className="fas fa-pen" onClick={(e) => setseditflag(!editflag)}></i>

          </td>
          <td>
            <i style={{ cursor: "pointer" }} className="fas fa-times" onClick={(e) => onSubmit4(e)}></i>
          </td>


        </tr>
      </tbody>)}

    </Fragment>
  )
};

export default AlldishesUI;
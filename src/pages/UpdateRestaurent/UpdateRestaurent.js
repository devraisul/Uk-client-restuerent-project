import { Button, TextField } from '@material-ui/core';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { Fragment, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { editRestaurent, getRestaurent } from '../../Apis/Restaurent';
import Loading from '../../components/Loading/Loading';
import { useAuth } from '../../context/AuthContext';
import styles from './updateRestaurent.module.css';
//Edit restaurant by owner Form
const UpdateRestaurent = () => {
  const { user } = useAuth()

  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    GoogleMapApi: '',
    Name: '',
    About: '',
    EmailAddress: '',
    PhoneNumber: '',
    Address: '',
    PostCode: '',
    Webpage: '',
    homeText: '',
    totalTables: 0,
    AdditionalInformation: '',
    Layout: ''
  });
  const [imageUrl, setImageUrl] = useState();
  const [formImageUrl, setFormImageUrl] = useState('');

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    setFormImageUrl(e.target.files[0]);
  };
  // submit the formdata to API
  const onSubmit = async (e) => {
    e.preventDefault();

    const Data = new FormData();
    if (formImageUrl) {

      Data.append('Logo', formImageUrl, formImageUrl.name);
      // Editrestaurant(formData, Data, match.params.id)
      console.log(formData, Data);
      editRestaurent(user.restaurant[0].id, formData, Data)
        .then(res => {
          toast.success(res.data?.message);
        })
        .catch(err => console.log(err))
    }
    else {
      console.log(formData);
      editRestaurent(user.restaurant[0].id, formData)
        .then(res => {
          toast.success(res.data.message);
        })
        .catch(err => console.log(err))
    }
  };

  const fetchdistance = (x) => {
    setFormData({ ...formData, Address: x.address.freeformAddress, PostCode: x.address.postalCode });
  }

  // GET RESTAURANT DETAILS 
  useEffect(() => {
    setIsLoading(true)
    getRestaurent(user?.restaurant[0]?.id).then((res) => {
      console.log(res?.restaurant?.Logo);
      setImageUrl(res?.restaurant?.Logo)
      setFormData({
        GoogleMapApi: res?.restaurant?.GoogleMapApi,
        Name: res?.restaurant?.Name,
        About: res?.restaurant?.About,
        EmailAddress: res?.restaurant?.EmailAddress,
        PhoneNumber: res?.restaurant?.PhoneNumber,
        Address: res?.restaurant?.Address,
        PostCode: res?.restaurant?.PostCode,
        Webpage: res?.restaurant?.Webpage,
        homeText: res?.restaurant?.homeText,
        totalTables: res?.restaurant?.totalTables,
        AdditionalInformation: res?.restaurant?.AdditionalInformation,
        Layout: res?.restaurant?.Layout
      });
      setIsLoading(false)
    })
  }, [user])


  console.log(formData?.Name);
  return (
    <>
      {isLoading ?
        <Loading />
        :
        <Fragment>
          <Toaster
            position="top-right"
            reverseOrder={false} />
          <div className={styles.container}>
            <h1 style={{ margin: '0', fontSize: '2rem', color: '#aaa' }} className='large'>Edit Restaurant</h1>
            <form style={{ width: '500px' }} onSubmit={(e) => onSubmit(e)}>

              {/* LOGO  */}
              <div className={styles.imageUpDropdownContainer}>
                <label title='upload image' htmlFor="image" >
                  <div className={styles.imageDropper} >
                    {!imageUrl ?
                      <img className={styles.imageUpPlaceholder}
                        alt={"profile_pic"}
                        src={"https://i.postimg.cc/rFzvBdw7/gallery.png"}
                      /> :
                      <img className={styles.imageUp}
                        alt={"profile_pic"}
                        src={`https://mughalsignandprint.co.uk/restaurant2/${imageUrl}`}
                      />
                    }
                    {!imageUrl && <>
                      <p>Click to upload a logo</p>
                      <p style={{ fontSize: '0.6rem', color: '#aaa' }}>Only JPG, JPEG & PNG image supported</p>
                    </>}
                  </div>
                </label>
                <input
                  type={"file"}
                  accept={"image/x-png,image/jpg,image/jpeg"}
                  style={{ display: 'none' }}
                  placeholder="image"
                  id='image'
                  onChange={(e) => {
                    onFileChange(e)
                    setImageUrl(URL.createObjectURL(e.target.files[0]));
                  }} />
              </div>

              {/* NAME  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextField
                  id="filled-basic"
                  label="Name"
                  variant="outlined"
                  type='text'
                  placeholder='Enter Restaurant Name'
                  name='Name'
                  value={formData?.Name || ''}
                  onChange={(e) => onChange(e)}
                  style={{ width: '100%' }}
                />
              </div>
              {/* ABOUT  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextareaAutosize
                  minRows={8}
                  id="filled-basic"
                  label="About"
                  variant="outlined"
                  type='text'
                  placeholder='About'
                  name='About'
                  value={formData?.About || ''}
                  onChange={(e) => onChange(e)}
                  style={{ minWidth: '100%', maxWidth: '100%', padding: '10px', border: '1px solid #bbb', borderRadius: "5px" }}
                />
              </div>
              {/* EMAIL  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextField
                  id="filled-basic"
                  label="Email"
                  variant="outlined"
                  type='text'
                  placeholder='Enter restaurant email'
                  name='EmailAddress'
                  value={formData?.EmailAddress || ''}
                  onChange={(e) => onChange(e)}
                  style={{ width: '100%' }}
                />
              </div>
              {/* PONE  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextField
                  id="filled-basic"
                  label="Phone Number"
                  variant="outlined"
                  type='number'
                  placeholder='Enter restaurant phone number'
                  name='PhoneNumber'
                  value={formData?.PhoneNumber || ''}
                  onChange={(e) => onChange(e)}
                  style={{ width: '100%' }}
                />
              </div>
              {/* ADDRESS  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextField
                  id="filled-basic"
                  label="Address"
                  variant="outlined"
                  type='text'
                  placeholder='Enter Restaurant Address'
                  name='Address'
                  value={formData?.Address || ''}
                  onChange={(e) => onChange(e)}
                  style={{ width: '100%' }}
                />
              </div>
              {/* POST CODE  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextField
                  id="filled-basic"
                  label="Enter PostCode"
                  variant="outlined"
                  type='text'
                  placeholder='Enter PostCode'
                  name='PostCode'
                  value={formData?.PostCode || ''}
                  onChange={(e) => onChange(e)}
                  style={{ width: '100%' }}
                />
              </div>
              {/* Web Page  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextField
                  id="filled-basic"
                  label="Web Page Url"
                  variant="outlined"
                  type='text'
                  placeholder='Enter restaurant web page url'
                  name='Webpage'
                  value={formData?.Webpage || ''}
                  onChange={(e) => onChange(e)}
                  style={{ width: '100%' }}
                />
              </div>
              {/* HOME TEXT  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextField
                  id="filled-basic"
                  label="Home Text"
                  variant="outlined"
                  type='text'
                  placeholder='Enter restaurant home text'
                  name='homeText'
                  value={formData?.homeText || ''}
                  onChange={(e) => onChange(e)}
                  style={{ width: '100%' }}
                />
              </div>
              {/* TOTAL TABLES  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextField
                  id="filled-basic"
                  label="Total Tables"
                  variant="outlined"
                  type='text'
                  placeholder='Enter restaurant total tables'
                  name='totalTables'
                  value={formData?.totalTables || 0}
                  onChange={(e) => onChange(e)}
                  style={{ width: '100%' }}
                />
              </div>
              {/* ADDITIONAL INFO  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextField
                  id="filled-basic"
                  label="Additional Information"
                  variant="outlined"
                  type='text'
                  placeholder='Enter additional information'
                  name='AdditionalInformation'
                  value={formData?.AdditionalInformation || ''}
                  onChange={(e) => onChange(e)}
                  style={{ width: '100%' }}
                />
              </div>
              {/* GOOGLE MAP API  */}
              <div style={{ marginBottom: '10px' }} className='form-group'>
                <TextField
                  id="filled-basic"
                  label="Google Map Api"
                  variant="outlined"
                  type='text'
                  placeholder='Enter your google map api'
                  name='GoogleMapApi'
                  value={formData?.GoogleMapApi || ''}
                  onChange={(e) => onChange(e)}
                  style={{ width: '100%' }}
                />
              </div>
              {/* <div className='form-group' style={{ margin: '10px 0px' }}>
            <p style={{ fontSize: '1rem' }}>Address: {Address}</p>
          </div>
          <div className='form-group'>
            <p>Enter Address to Update</p>
            <SearchBox
              onResultChoose={(result) => fetchdistance(result)}
              style={{ paddingTop: '15px', width: '100%' }}
              searchOptions={{
                key: 'l2nwZ2J9wGbTZRb9C8OyAzv7pv0E30iY',
                language: 'en-Gb',
                countrySet: 'GB',
                limit: 5,
                typeahead: true
              }}
            />
          </div> */}


              {/* LAYOUT  */}
              <div className='form-group'>
                <p>Select Menu View Layout:</p>
                <label className="radio-img">
                  <input
                    type="radio"
                    name="Layout"
                    value="cards"
                    onChange={(e) => onChange(e)}
                    checked={formData?.Layout === 'cards' ? (true) : (false)} />
                  <div className="imageR " ><i className="fas fa-grip-horizontal icon-radio-btn"></i></div>
                </label>

                <label className="radio-img">
                  <input
                    type="radio"
                    name="Layout"
                    value="accordion"
                    onChange={(e) => onChange(e)}
                    checked={formData?.Layout === 'accordion' ? (true) : (false)} />
                  <div className="imageR"> <i className="fas fa-bars icon-radio-btn"></i></div>
                </label>
              </div>



              <div className='centerbtn' style={{ marginTop: "20px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  style={{ width: "100%" }}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Fragment>
      }
    </>
  );
};
export default UpdateRestaurent;
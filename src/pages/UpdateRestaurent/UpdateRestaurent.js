import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from 'tomtom-react-searchbox';
import { editRestaurent } from '../../Apis/Restaurent';
import { useAuth } from '../../context/AuthContext';
import './updateRestaurent.css'
import toast, { Toaster } from 'react-hot-toast';
//Edit restaurant by owner Form
const UpdateRestaurent = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    Name: !user.restaurant[0].Name ? '' : user.restaurant[0].Name,
    Address: !user.restaurant[0].Address ? '' : user.restaurant[0].Address,
    PostCode: !user.restaurant[0].PostCode ? '' : user.restaurant[0].PostCode,
    Layout: !user.restaurant[0].Layout ? '' : user.restaurant[0].Layout
  });
  const [logoimage, setimage] = useState();

  const { Name, Address, PostCode, Layout } = formData;
  // set the entered data into state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onFileChange = (e) => {
    setimage(
      e.target.files[0]);
  };
  // submit the formdata to API
  const onSubmit = async (e) => {
    e.preventDefault();

    const Data = new FormData();
    if (logoimage) {

      Data.append('Logo', logoimage, logoimage.name);
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


  return (
    <Fragment>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className='container'>
        <div className='card'>
          {!user.restaurant[0].Logo ? (
            "Don't Have image"
          ) : (<img
            // className='roundimgE2'
            src={user.restaurant[0].Logo}
            alt='Logo'
          />)}
          <h1 className='large text-primary'>Edit Restaurant</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <TextField
                id="filled-basic"
                label="Enter Restaurant Name"
                variant="filled"
                type='text'
                placeholder='Enter Restaurant Name'
                name='Name'
                value={Name}
                onChange={(e) => onChange(e)}
                style={{ paddingTop: '15px',width:'100%' }}

              />
            </div>
            <div className='form-group'>
              <p>Address: {Address}</p>

            </div>
            <div className='form-group'>
              <p>Enter Address to Update</p>
              <SearchBox
                onResultChoose={(result) => fetchdistance(result)}
                style={{ paddingTop: '15px',width:'100%' }}
                searchOptions={{
                  key: 'l2nwZ2J9wGbTZRb9C8OyAzv7pv0E30iY',
                  language: 'en-Gb',
                  countrySet: 'GB',
                  limit: 5,
                  typeahead: true
                }}
              />
            </div>
            <div className='form-group'>
              <p>Enter PostCode</p>
              <TextField
                id="filled-basic"
                label="Enter PostCode"
                variant="filled"
                type='text'
                placeholder='Enter PostCode'
                name='PostCode'
                value={PostCode}
                onChange={(e) => onChange(e)}
                style={{ paddingTop: '15px',width:'100%' }}
              />
              {/* <input
               
              required
              /> */}
            </div>
            {/* <div className='form-group'>
              <p>Select Menu View Layout:</p>
              <label className="radio-img">
                <input type="radio" name="Layout" value="cards" onChange={(e) => onChange(e)} checked={Layout === 'cards' ? (true) : (false)} />
                <div className="imageR " ><i className="fas fa-grip-horizontal icon-radio-btn"></i></div>
              </label>

              <label className="radio-img">
                <input type="radio" name="Layout" value="accordion" onChange={(e) => onChange(e)} checked={Layout === 'accordion' ? (true) : (false)} />

                <div className="imageR"> <i className="fas fa-bars icon-radio-btn"></i></div>
              </label>
            </div> */}

            <div className='form-group'>
              <p>Choose Logo to Update:</p>
            </div>

            <div className='form-group'>

              <input
                type='file'
                id='image'
                name='image'
                style={{ width: "100%" }}

                onChange={(e) => onFileChange(e)}
              />

            </div>
            <div className='centerbtn' style={{ marginTop: "50px" }}>
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
      </div>
    </Fragment>
  );
};
export default UpdateRestaurent;
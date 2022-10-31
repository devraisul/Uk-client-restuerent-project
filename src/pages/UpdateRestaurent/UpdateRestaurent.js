import { Button, TextField } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBox from 'tomtom-react-searchbox';
import { editRestaurent } from '../../Apis/Restaurent';
import ImageComing from '../../assets/image-coming-soon.png';
import { useAuth } from '../../context/AuthContext';
import './updateRestaurent.css';
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
        <h1 style={{ margin: '0',fontSize:'2rem',color:'#aaa' }} className='large'>Edit Restaurant</h1>
        {!user.restaurant[0].Logo ? (
          <img
            style={{ margin: '30px 0px' }}
            className="centerImage2"
            src={ImageComing}
            alt='Logo'
          />
        ) : (
          <img
            style={{ margin: '30px 0px' }}
            src={user.restaurant[0].Logo}
            alt='Logo'
          />
        )}

        <form style={{width:'500px'}} onSubmit={(e) => onSubmit(e)}>
          <div style={{ marginBottom: '10px' }} className='form-group'>
            <TextField
              id="filled-basic"
              label="Enter Restaurant Name"
              variant="outlined"
              type='text'
              placeholder='Enter Restaurant Name'
              name='Name'
              value={Name}
              onChange={(e) => onChange(e)}
              style={{ width: '100%' }}

            />
          </div>
          <div className='form-group' style={{ margin: '10px 0px' }}>
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
          </div>
          <div style={{ marginTop: '20px' }} className='form-group'>
            <TextField
              id="filled-basic"
              label="Enter PostCode"
              variant="outlined"
              type='text'
              placeholder='Enter PostCode'
              name='PostCode'
              value={PostCode}
              onChange={(e) => onChange(e)}
              style={{ width: '100%' }}
            />
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

          <div style={{ marginTop: '10px' }} className='form-group'>
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
  );
};
export default UpdateRestaurent;
import { Button, IconButton, TextField } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { addMultipleVariation, addVariation, getVariation } from '../../Apis/variation';
import { useAuth } from '../../context/AuthContext';
import AllVariationType from './AllVariationType';

const Addveriation = () => {
  const [inputList, setInputList] = React.useState([{ name: "", description: "" }]);
  const [inputList2, setInputList2] = React.useState([{ name: "", description: "", type_id: '', price: '' }]);
  const [isChangeDetect, setIsChangeDetect] = useState(Math.random())
  const { user } = useAuth();


  const [allVariationTypes, setAllVariationTypes] = useState([])

  const [isOnAllTypeMode, setIsOnAllTypeMode] = useState(true)
  const [isOnAddTypeMode, setIsOnAddTypeMode] = useState(false)
  const [isOnAddVariationMode, setIsOnAddVariationMode] = useState(false)
  // const [isOnAllVariationMode, setIsOnAllVariationMode] = useState(false)

  // handle input change for variation type
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };


  // handle input change for variation
  const handleInputChange2 = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList2];
    list[index][name] = value;
    setInputList2(list);
  };


  const onAllType = () => {
    setIsOnAllTypeMode(true)
    setIsOnAddTypeMode(false)
    setIsOnAddVariationMode(false)
  }
  const onAddType = () => {
    setIsOnAllTypeMode(false)
    setIsOnAddTypeMode(true)
    setIsOnAddVariationMode(false)
  }
  const onAddVariation = () => {
    setIsOnAllTypeMode(false)
    setIsOnAddTypeMode(false)
    setIsOnAddVariationMode(true)
    setIsChangeDetect(Math.random())
  }
  const onAllVariation = () => {
    setIsOnAllTypeMode(false)
    setIsOnAddTypeMode(false)
    setIsOnAddVariationMode(false)
  }

  // HANDLE ADD MORE VARIATION TYPE
  const handleAddClick = (y) => {
    let x = 0;
    let i;
    let msg = '';
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].name === '') {
        x++;
        msg = msg + `Please add a variation Name at row no: ${i + 1}. `
      }
      if (inputList[i].description === '') {

        x++;
        msg = msg + `Please add a variation description at row no: ${i + 1}. `
      }
    }
    if (x > 0) {
      toast.error(msg)
    }
    else {
      //send the data to API
      setInputList([...inputList, { name: "", description: "" }]);
    };
  };
  // HANDLE ADD MORE VARIATION
  const handleAddClick2 = (y) => {
    let x = 0;
    let i;
    let msg = '';
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList2.length; i++) {
      if (inputList2[i].name === '') {
        x++;
        msg = msg + `2 Please add a variation Name at row no: ${i + 1}. `
      }
      if (inputList2[i].description === '') {
        x++;
        msg = msg + `2 Please add a variation description at row no: ${i + 1}. `
      }
      if (inputList2[i].price === '') {
        x++;
        msg = msg + `2 Please add a variation price at row no: ${i + 1}. `
      }
      if (inputList2[i].type_id === '') {
        x++;
        msg = msg + `2 Please add a variation type at row no: ${i + 1}. `
      }
    }
    if (x > 0) {
      toast.error(msg)
    }
    else {
      //send the data to API
      setInputList2([...inputList2, { name: "", description: "", type_id: '', price: '' }]);
    };
  };


  // HANDLE DELETE VARIATION TYPE
  const handledeleteClick = (i) => {
    const list2 = [...inputList];
    list2.splice(i, 1);
    setInputList(list2);
  };
  // HANDLE DELETE VARIATION
  const handledeleteClick2 = (i) => {
    const list2 = [...inputList2];
    list2.splice(i, 1);
    setInputList2(list2);
  };

  // HANDLE SUBMIT VARIATION TYPE
  const onSubmitVariationType = async (e) => {
    e.preventDefault();
    let x = 0;
    let i;
    let msg = ''
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].name === '') {
        x++;
        msg = msg + `Please add a variation Name at row no: ${i + 1}. `
      }
      if (inputList[i].description === '') {
        x++;
        msg = msg + `Please add a variation description at row no: ${i + 1}. `
      }
    }
    if (x > 0) {
      toast.error(msg);
    }
    else {
      //send the data to API
      let VarationType = inputList
      const variation = {
        "VarationType": VarationType
      }
      console.log(variation);
      addVariation(user.restaurant[0].id, variation)
        .then(
          res => {
            toast.success('Successfully Added Variation Type ')
            setInputList([{ name: "", description: "", type_id: '', price: '' }])
            onAllVariation(true)
            setIsChangeDetect(Math.random())
          }
        )

    };
  };
  // HANDLE SUBMIT VARIATION 
  const onSubmitVariation = async (e) => {
    e.preventDefault();
    let x = 0;
    let i;
    let msg = ''
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList2.length; i++) {
      if (inputList2[i].name === '') {
        x++;
        msg = msg + `Please add a variation Name at row no: ${i + 1}. `
      }
      if (inputList2[i].description === '') {
        x++;
        msg = msg + `Please add a variation description at row no: ${i + 1}. `
      }
    }
    if (x > 0) {
      toast.error(msg);
    }
    else {
      //send the data to API
      let Varation = inputList2
      const data = {
        "varation": Varation
      }
      console.log(data);
      addMultipleVariation(data)
        .then(res => {
          if (res.data.length > 0) {
            toast.success('Variation Added Successfully!')
            setInputList([{ name: "", description: "" }])
            onAllType(true)
            setIsChangeDetect(Math.random())
          }
        }
        )

    };
  };


  // GET ALL VVARIATION TYPE
  useEffect(() => {
    getVariation(user.restaurant[0].id)
      .then(res => {
        setAllVariationTypes(res.data);
      })
  }, [isChangeDetect])

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-evenly'
        }}
          className='btn-center'
        >
          <button
            title='Add Types'
            style={{ display: 'flex', alignItems: 'center', background: '#0575B4', color: '#fff' }} className='large btn' onClick={(e) => onAddType(e)}
          >
            <AiOutlinePlus style={{ fontSize: '1.5rem' }} />
            <span style={{ marginLeft: '10px' }} className="menuNav">
              Add Types
            </span>
          </button>
          <button
            title='All Menu'
            style={{ display: 'flex', alignItems: 'center', background: '#0575B4', color: '#fff' }} className='large btn'
            onClick={(e) => onAllType(e)}
          >
            <BiFoodMenu style={{ fontSize: '1.5rem' }} />
            <span style={{
              marginLeft: '10px'
            }} className="menuNav">
              All Types
            </span>
          </button>
          <button
            title='Add Variations'
            style={{ display: 'flex', alignItems: 'center', background: '#0575B4', color: '#fff' }} className='large btn' onClick={(e) => onAddVariation(e)}
          >
            <AiOutlinePlus style={{ fontSize: '1.5rem' }} />
            <span style={{ marginLeft: '10px' }} className="menuNav">
              Add Variation
            </span>
          </button>
          {/* <button
            title='All Variations'
            style={{ display: 'flex', alignItems: 'center', background: '#0575B4', color: '#fff' }} className='large btn'
            onClick={(e) => onAllVariation(e)}
          >
            <BiFoodMenu style={{ fontSize: '1.5rem' }} />
            <span style={{
              marginLeft: '10px'
            }}
              className="menuNav">
              All Variations
            </span>
          </button> */}
          <Link title='Back to dashboard' style={{
            display: 'flex',
            alignItems: 'center',
            background: '#0575B4',
            color: '#fff'
          }} className='large btn' to={`/app/dashboard`}>
            <TbLayoutDashboard style={{ fontSize: '1.5rem' }} />
            <span style={{ marginLeft: '10px' }} className="menuNav">
              Back to dashboard
            </span>
          </Link>
        </div>
      </div>


      {/* VERIATION TYPE SECTION  */}
      {
        isOnAddTypeMode &&
        <div className='table-wrapper' >
          <h1 className='large text-center' style={{ color: '#aaa' }}>Add Variation Type</h1>
          <table className="fl-table">
            <thead>
              <tr>
                <th >#</th>
                <th>Variation Name</th>
                <th>Variation Description</th>
                <th></th>
                <th>Add more</th>
              </tr>
            </thead>

            {inputList.map((x, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <td>
                      <p >{i + 1}</p>
                    </td>
                    <td>
                      <TextField
                        style={{ marginTop: "15px", marginRight: "15px" }}
                        name="name"
                        placeholder="Enter Name"
                        value={x.name}
                        onChange={e => handleInputChange(e, i)}
                        required
                        id="outlined-basic" label="Name" variant="outlined" />
                      {' '}
                    </td>
                    <td>
                      <TextField
                        style={{ marginTop: "15px", marginRight: "15px" }}
                        name="description"
                        placeholder="Enter  Description"
                        value={x.description}
                        onChange={e => handleInputChange(e, i)}
                        rows={1}
                        required
                        id="outlined-basic" label="Description" variant="outlined" />
                    </td>

                    <td>
                      {i > 0 ? (
                        <IconButton style={{ marginTop: "15px", marginRight: "15px" }} onClick={(e) => handledeleteClick(i)} aria-label="delete">
                          <Delete />
                        </IconButton>
                      ) : ('')
                      }
                    </td>
                    <td>
                      {
                        inputList[i].name || inputList[i].description === !'' ?
                          <Fragment>
                            {
                              inputList.length - 1 === i &&
                              <Button style={{ marginTop: "15px", marginRight: "15px" }} variant="outlined" onClick={(e) => handleAddClick(i)}>
                                <Add />Add More
                              </Button>
                            }
                          </Fragment> :
                          <Fragment>
                            <Button style={{ marginTop: "15px", marginRight: "15px" }} variant="outlined" disabled>
                              <Add />Add More
                            </Button>
                          </Fragment>
                      }
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginLeft: "15px" }}>
            <Button
              onClick={(e) => onSubmitVariationType(e)}
              style={{ background: "#0575B4", color: "white", width: '150px' }}
              variant="contained">Submit</Button>
          </div>
        </div>
      }

      {isOnAllTypeMode &&
        <div style={{ marginTop: "50px" }}>
          <div>
            <h1 className='large text-center' style={{ color: '#aaa' }}>All Variation</h1>
          </div>
          <AllVariationType setIsChangeDetect={setIsChangeDetect} />
        </div>
      }




      {/* VARIATION SECTION  */}
      {
        isOnAddVariationMode &&
        <div className='table-wrapper' >
          <h1 className='large text-center' style={{ color: '#aaa' }}>Add Variation</h1>
          <table className="fl-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Variation Name</th>
                <th>Variation Description</th>
                <th>Price</th>
                <th>Type</th>
                <th>Add more</th>
              </tr>
            </thead>

            {inputList2.map((x, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <td>
                      <p >{i + 1}</p>
                    </td>
                    <td>
                      <TextField
                        style={{ marginTop: "5px", marginRight: "5px" }}
                        name="name"
                        type={'text'}
                        placeholder="Enter Name"
                        value={x.name}
                        onChange={e => handleInputChange2(e, i)}
                        required
                        id="outlined-basic" label="Name" variant="outlined" />
                      {' '}
                    </td>
                    <td>
                      <TextField
                        style={{ marginTop: "5px", marginRight: "5px" }}
                        name="description"
                        type={'text'}
                        placeholder="Enter Description"
                        value={x.description}
                        onChange={e => handleInputChange2(e, i)}
                        rows={1}
                        required
                        id="outlined-basic" label="Description" variant="outlined" />
                    </td>
                    <td>
                      <TextField
                        style={{ marginTop: "5px", marginRight: "5px" }}
                        name="price"
                        type={'number'}
                        placeholder="Enter Price"
                        value={x.price}
                        onChange={e => handleInputChange2(e, i)}
                        rows={1}
                        required
                        id="outlined-basic" label="Price" variant="outlined" />
                    </td>
                    <td>
                      <select
                        style={{ padding: '10px 10px', width: '100%', fontSize: '1rem' }}
                        name="type_id"
                        value={x.type_id}
                        onChange={e => handleInputChange2(e, i)}>
                        {allVariationTypes.map(type => (
                          <option value={type?.id}>{type?.name}</option>
                        ))
                        }
                      </select>
                    </td>
                    <td>
                      {i > 0 &&
                        <IconButton
                          style={{ marginTop: "5px", marginRight: "5px" }}
                          onClick={(e) => handledeleteClick2(i)} aria-label="delete">
                          <Delete />
                        </IconButton>
                      }
                      {
                        (inputList2[i].name !== '' &&
                          inputList2[i].description !== '' &&
                          inputList2[i].price !== '' &&
                          inputList2[i].type_id !== '')
                          ?
                          <Fragment>
                            {
                              inputList2.length - 1 === i &&
                              <Button style={{ marginTop: "5px", marginRight: "5px" }} variant="outlined" onClick={(e) => handleAddClick2(i)}>
                                <Add />Add More
                              </Button>
                            }
                          </Fragment> :
                          <Fragment>
                            <Button style={{ marginTop: "5px", marginRight: "5px" }} variant="outlined" disabled>
                              <Add />Add More
                            </Button>
                          </Fragment>
                      }
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginLeft: "15px" }}>
            <Button
              onClick={(e) => onSubmitVariation(e)}
              style={{ background: "#0575B4", color: "white", width: '150px' }}
              variant="contained">Submit</Button>
          </div>
        </div>
      }
      {/* {isOnAllVariationMode &&
        <div style={{ marginTop: "50px" }}>
          <div>
            <h1 className='large text-center' style={{ color: '#aaa' }}>All Variation</h1>
          </div>
          <AllVariation setIsChangeDetect={setIsChangeDetect} />
        </div>
      } */}
    </>
  );
};

export default Addveriation;
import { Button, IconButton, TextField } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { addVariation } from '../../Apis/variation';
import { useAuth } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import AllVariation from './AllVariation';

const Addveriation = () => {
  const [inputList, setInputList] = React.useState([{ name: "", description: "" }]);
  const { user } = useAuth();

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Add button
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
  const handledeleteClick = (i) => {

    const list2 = [...inputList];
    list2.splice(i, 1);
    setInputList(list2);
  };
  const onSubmit = async (e) => {
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
            setInputList([{ name: "", description: "" }])
          }
        )

    };
  };
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className='table-wrapper' >

        <h1 className='large text-center text-primary'>Add Variation Type</h1>
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

              <tbody>
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
                      id="outlined-basic" label="Menu Name" variant="outlined" />
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
                      id="outlined-basic" label="Menu Description" variant="outlined" />
                  </td>

                  <td>{i > 0 ? (<IconButton style={{ marginTop: "15px", marginRight: "15px" }} onClick={(e) => handledeleteClick(i)} aria-label="delete">
                    <Delete />
                  </IconButton>) : ('')}</td>
                  <td>
                    {inputList[i].name || inputList[i].description === !'' ? <Fragment> {inputList.length - 1 === i && <Button style={{ marginTop: "15px", marginRight: "15px" }} variant="outlined" onClick={(e) => handleAddClick(i)}><Add />Add More</Button>}</Fragment> : <Fragment><Button style={{ marginTop: "15px", marginRight: "15px" }} variant="outlined" disabled><Add />Add More</Button></Fragment>}
                  </td>



                </tr>
              </tbody>

            );
          })}
        </table>
        <div style={{ display: "flex", justifyContent: "start", marginTop: "20px", marginLeft: "15px" }}>
          <Button onClick={(e) => onSubmit(e)} style={{ background: "#6600FF", color: "white" }} variant="contained">Submit</Button>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <div>
          <h1 className='large text-center text-primary'>All Variation</h1>
        </div>
        <AllVariation />
      </div>
    </>
  );
};

export default Addveriation;
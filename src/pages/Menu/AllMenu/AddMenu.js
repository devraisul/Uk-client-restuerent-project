import { Button, IconButton, TextField } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { addMenu } from '../../../Apis/Menu';


//Add menu Form
const AddMenu = ({ id }) => {
  console.log(id);
  const [inputList, setInputList] = useState([{ name: "", description: "" }]);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };



  // handle click event of the Add button
  const handleAddClick = (y) => {
    let msg = '';
    let x = 0;
    let i = 0
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].description === '') {
        x++;
        msg = msg + `Please add a Description for your menu at row no: ${i + 1}. `
        // setAlert(`Please add a Description for your menu at row no: ${i+1}`, 'danger');

      }
      if (inputList[i].name === '') {
        x++;
        msg = msg + `Please add the menu name at row no: ${i + 1}. `
        // setAlert(`Please add the menu name at row no: ${i+1}`, 'danger');

      }

    }
    if (x > 0) { 
      toast.error(`${msg}`); 
  }else {


      setInputList([...inputList, { name: "", description: "" }]);
    }

  }
  const handledeleteClick = (i) => {
    const list2 = [...inputList];
    list2.splice(i, 1);
    setInputList(list2);
  };


  //validation of Result and submit to API
  const onSubmit = async (e) => {
    e.preventDefault();
    let x = 0;
    let i;
    let msg = '';
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].description === '') {
        x++;
        msg = msg + `Please add a Description for your menu at row no: ${i + 1}. `
        // setAlert(`Please add a Description for your menu at row no: ${i+1}`, 'danger');
      }
      if (inputList[i].name === '') {
        x++;
        msg = msg + `Please add the menu name at row no: ${i + 1}. `
        // setAlert(`Please add the menu name at row no: ${i+1}`, 'danger');
      }
    }
    if (x > 0) {
      toast.error(`${msg}`);
    }
    else {
      let menu = inputList
      const makeMenu = {
        "menu": menu
      }
      console.log(makeMenu);
      addMenu(id, makeMenu)
        .then(
          res => {
            console.log(res);
            toast.success("Menu Added Successfully");
            setInputList([{ Menu_Name: "", Menu_Description: "" }])
            e.target.reset()
          }
        )

    };
  };
  return (

    <div className='table-wrapper'>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <h1 className='large text-center text-primary'>ADD Menu</h1>
      <table className="fl-table">
        {/* <thead>
          <tr>
            <th width="10%">id</th>
            <th>Menu Name</th>
            <th>Menu Description</th>
            
          </tr>
        </thead> */}
        {inputList.map((x, i) => {
          return (
            <tbody>
              <tr>
                <td>
                  {i + 1}
                </td>
                <td>
                  <TextField
                    style={{ marginTop: "15px", marginRight: "15px" }}
                    name="name"
                    placeholder="Enter Menu Name"
                    value={x.name}
                    onChange={e => handleInputChange(e, i)}
                    required
                    id="outlined-basic" label="Menu Name" variant="outlined" />
                </td>
                <td>
                  <TextField
                    style={{ marginTop: "15px", marginRight: "15px" }}
                    name="description"
                    placeholder="Enter Menu Description"
                    value={x.description}
                    onChange={e => handleInputChange(e, i)}
                    rows={1}
                    required
                    id="outlined-basic" label="Menu Description" variant="outlined" />
                </td>
                <td >
                  {i > 0 ? (<IconButton style={{ marginTop: "15px", marginRight: "15px" }} onClick={(e) => handledeleteClick(i)} aria-label="delete">
                    <Delete />
                  </IconButton>) : ('')}
                </td>
                <td>
                  {inputList[i].name || inputList[i].description === !'' ? <Fragment> {inputList.length - 1 === i && <Button style={{ marginTop: "15px", marginRight: "15px" }} variant="outlined" onClick={(e) => handleAddClick(i)}><Add />Add More</Button>}</Fragment> : <Fragment><Button style={{ marginTop: "15px", marginRight: "15px" }} variant="outlined" disabled><Add />Add More</Button></Fragment>}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div style={{ marginLeft: "200px", marginTop: "50px" }}>
        <Button style={{ background: "#6600FF", color: "white" }} variant="contained" onClick={(e) => onSubmit(e)}>Submit</Button>
      </div>
    </div>

  );
};

export default AddMenu;
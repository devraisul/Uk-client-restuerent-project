import { TextField } from '@material-ui/core';
import { Add, Delete } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React, { Fragment } from 'react';

export default function AddVariation({inputList2,handleInputChange2,allVariationTypes,handleDeleteClick2,handleAddClick2,onSubmitVariation}) {
  return (
    <div style={{background:'#fff',padding:'20px 10px',borderRadius:'10px',boxShadow:'2px 2px 10px #ddd'}} className='table-wrapper' >
          <h1 className='large text-center' style={{color:'#aaa'}}>Add Dish Variation</h1>
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
                        style={{ marginTop: "5px", marginRight: "5px"}}
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
                        defaultValue={0}
                        onChange={e => handleInputChange2(e, i)}>
                          <option value={0}>Select a variation type</option>
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
                          onClick={(e) => handleDeleteClick2(i)} aria-label="delete">
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
  )
}

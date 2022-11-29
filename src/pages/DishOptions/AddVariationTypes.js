import { TextField } from '@material-ui/core';
import { Add, Delete } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import React, { Fragment } from 'react';

export default function AddVariationTypes({inputList,handleInputChange,handleDeleteClick,handleAddClick,onSubmitVariationType}) {
  return (
    <div style={{background:'#fff',padding:'20px 10px',borderRadius:'10px',boxShadow:'2px 2px 10px #ddd'}}  className='table-wrapper' >
          <h1 className='large text-center' style={{ color: '#aaa' }}>Add Variation Type</h1>
          <table className="fl-table">
            <thead>
              <tr style={{padding:'0px'}}>
                <th>#</th>
                <th style={{textAlign:'left'}}>Variation Name</th>
                <th style={{textAlign:'left'}}>Variation Description</th>
                <th></th>
                <th>Add more</th>
              </tr>
            </thead>

            {inputList.map((x, i) => {
              return (
                <tbody key={i}>
                  <tr style={{padding:'0px'}}>
                    <td
                    style={{
                      border: 'none',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      height:'100%',
                      marginTop: "30px",
                    }}>
                      <Typography>{i + 1}</Typography>
                    </td>
                    <td>
                      <TextField
                        style={{ marginTop: "15px", marginRight: "15px",width:'100%' }}
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
                        style={{ marginTop: "15px", marginRight: "15px",width:'100%' }}
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
                        <IconButton style={{ marginTop: "15px", marginRight: "15px" }} onClick={(e) => handleDeleteClick(i)} aria-label="delete">
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
  )
}

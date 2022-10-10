import { Button } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { Editmenumultiple, getMenu } from '../../../Apis/Menu';
import Loading from '../../../components/Loading/Loading';

const Editmenu = ({ id, setChangeMonitor,seteditall }) => {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = React.useState(false);
  const [inputList, setInputList] = useState([{ name: "", description: "", id: "", Totaldishes: "" }]);
  React.useEffect(() => {
    setLoading(true)
    getMenu(id)
      .then(res => {
        setMenus(res)
        setLoading(false)
      })
  }, [id])

  useEffect(() => {
    let stateDtata = menus?.map((res) => {
      return {
        name: res.name,
        description: res.description,
        id: res.id,
      }
    }
    );
    setInputList(stateDtata);
  }, [menus])

  // initial array 

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  //submit the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    let menu = inputList;
    Editmenumultiple({ menu: menu })
      .then(res => {
        if (res.data.length > 0) {
          setChangeMonitor(Math.random())
          seteditall(false)
        }
      })
  }
  return loading ? (
    <Loading />
  ) : (
    <div className='table-wrapper'>
      {inputList?.length === 0 ? (<p>Add Menu first to Edit!</p>) : (
        <Fragment>
          <h1 style={{
            color: '#0575B4',
            marginBottom: '10px'
          }}>Edit Dish</h1>
      
              <table className="fl-table">
                <thead>
                  <tr>
                    <th width="50px">#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th></th>
                  </tr>
                </thead>

                {inputList === undefined ? '' : (
                  inputList?.map((x, i) => {
                    return (
                      <tbody>
                        <tr>
                          <td>
                            {i + 1}
                          </td>
                          <td>
                            <input
                              type='text'
                              name="name"
                              placeholder="Enter Menu Name"
                              value={x?.name}
                              className="form-control form-control-lg"
                              //set the changes in the inital state
                              onChange={e => handleInputChange(e, i)}
                              required
                            />
                          </td>
                          <td>
                            <textarea
                              name="description"
                              placeholder="Enter Menu Description"
                              value={x?.description}
                              //set the changes in the inital state
                              className="form-control form-control-lg"
                              onChange={e => handleInputChange(e, i)}
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    );
                  }))}

              </table>
              <div style={{ marginTop: "50px", display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                <Button style={{ background: "#0575B4", width: '200px', color: "white" }} onClick={(e) => onSubmit(e)}>Save changes</Button>
              </div>
        </Fragment>
      )}
    </div>
  );
};

export default Editmenu;
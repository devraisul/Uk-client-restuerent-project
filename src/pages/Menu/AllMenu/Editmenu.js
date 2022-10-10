import React, { Fragment, useEffect, useState } from 'react';
import { Editmenumultiple, getMenu } from '../../../Apis/Menu';
import Loading from '../../../components/Loading/Loading';

const Editmenu = ({ id }) => {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = React.useState(false);
  const [inputList, setInputList] = useState([{ Menu_Name: "", Menu_Description: "", Menu_id: "", Totaldishes: "" }]);

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
        Menu_Name: res.name,
        Menu_Description: res.description,
        Menu_id: res.id,
        Totaldishes: res.dishes.length
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

  console.log(inputList);

  //submit the data to API
  const onSubmit = async (e) => {
    e.preventDefault();
    let menu = inputList;

    Editmenumultiple(menu)
      .then(res => {
        console.log();
      })
  }
  return loading ? (
    <Loading />
  ) : (
    <div className='table-wrapper'>
      {inputList?.length === 0 ? (<p>Add Menu first to Edit!</p>) : (
        <Fragment>
          <h1 className='large text-center text-primary'>Edit Dish</h1>
          <table className="fl-table">
            <thead>
              <tr>
                <th width="50px">#</th>
                <th>Menu Name</th>
                <th>Menu_Description</th>
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
                          name="Menu_Name"
                          placeholder="Enter Menu Name"
                          value={x?.Menu_Name}
                          className="form-control form-control-lg"
                          //set the changes in the inital state
                          onChange={e => handleInputChange(e, i)}
                          required
                        />
                      </td>
                      <td>
                        <textarea
                          name="Menu_Description"
                          placeholder="Enter Menu Description"
                          value={x?.Menu_Description}
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
            <button className='btn btn-primary-submit' onClick={(e) => onSubmit(e)}>Save changes</button>
          </table>
        </Fragment>
      )}
    </div>
  );
};

export default Editmenu;
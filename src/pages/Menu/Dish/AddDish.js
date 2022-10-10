import { Button } from '@material-ui/core';
import React, { Fragment } from 'react';
import { adddish } from '../../../Apis/dish';

const AddDish = ({ menuId, restaurentId, menuName, setIsChangeMenu }) => {
  // console.log({restaurentId,menuId });

  const [inputList, setInputList] = React.useState([{
    name: "",
    price: 0,
    take_away: 0,
    delivery: 0,
    restaurant_id: restaurentId,
    description: "",
    ingredients: "",
    calories: "",
    menu_id: menuId
  }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(inputList);
  };

  // handle click event of the Add button
  const handleAddClick = (y) => {
    let x = 0;
    let i;
    let msg = ''
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].Dish_Name === '') {
        x++;
        msg = msg + `Please add a Dish Name at row no: ${i + 1}. `
      }
      if (inputList[i].Dish_Price === '') {
        x++;
        msg = msg + `Please add a Dish Price at row no: ${i + 1}. `
      }
    }
    if (x > 0) {
      alert(`${msg}`, 'danger');
    } else {
      //send the data to API
      setInputList([...inputList, {
        name: "",
        price: 0,
        take_away: 0,
        delivery: 0,
        restaurant_id: restaurentId,
        description: "",
        ingredients: "",
        calories: "",
        menu_id: menuId
      }]);
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

      if (inputList[i].Dish_Name === '') {
        x++;
        msg = msg + `Please add a Dish Name at row no: ${i + 1}. `
      }

      if (inputList[i].Dish_Description === '') {
        x++;
        msg = msg + `Please add a Dish Description at row no: ${i + 1}. `
      }

      if (inputList[i].Dish_Price === '') {
        x++;
        msg = msg + `Please add a Dish Price at row no: ${i + 1}. `
      }

      if (inputList[i].TakeAway === '') {
        const list = [...inputList];
        list[i]['TakeAway'] = inputList[i].Dish_Price;
        setInputList(list);
      }

      if (inputList[i].Delivery === '') {
        const list = [...inputList];
        list[i]['Delivery'] = inputList[i].Dish_Price;
        setInputList(list);
      }
    }

    if (x > 0) {
      alert(`${msg}`, 'danger');
    } else {
      //send the data to API
      let dishes = inputList
      adddish(restaurentId, dishes)
        .then(res => {
          if (res.data.length === 1) {
            setInputList([{
              name: "",
              price: 0,
              take_away: 0,
              delivery: 0,
              restaurant_id: restaurentId,
              description: "",
              ingredients: "",
              calories: "",
              menu_id: menuId
            }])
            setIsChangeMenu(Math.random())
          }
        })
    };
  };
  const buttonStyle = {
    textAlign: 'center',
    width: '170px',
    background: '#0575B4',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
    <div>
      <div className='table-wrapper'>
        <h1 style={{
          color: '#0575B4',
          marginBottom: '10px'
        }}>ADD Dish for {menuName} Menu</h1>
        <table className="fl-table">
          <thead>
            <tr>
              <th >#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Ingredients</th>
              <th>Calories</th>
              <th>Price</th>
              <th>Delivery</th>
              <th>TakeAway Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {inputList.map((x, i) => {
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
                      placeholder="Enter Dish Name"
                      value={x.Dish_Name}
                      className="form-control form-control-lg"
                      onChange={e => handleInputChange(e, i)}
                    />
                  </td>
                  <td>
                    <textarea
                      maxLength={255}
                      name="description"
                      placeholder="Enter Dish Description"
                      className="form-control form-control-lg"
                      value={x.Dish_Description}
                      rows={1}
                      onChange={e => handleInputChange(e, i)}
                    />
                  </td>
                  <td>
                    <textarea
                      maxLength={255}
                      name="ingredients"
                      placeholder="Enter Ingredients"
                      value={x.ingredients}
                      className="form-control form-control-lg"
                      onChange={e => handleInputChange(e, i)}
                      rows={1}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      name="calories"
                      placeholder="Enter Calories"
                      value={x.calories}
                      className="form-control form-control-lg"
                      onChange={e => handleInputChange(e, i)}
                    />
                  </td>
                  <td>
                    {' '}
                    <input
                      type='number'
                      name="price"
                      placeholder="Enter Price"
                      value={x.Dish_Price}
                      className="form-control form-control-lg"
                      onChange={e => handleInputChange(e, i)}
                    />
                  </td>
                  <td>
                    {' '}
                    <input
                      type='number'
                      name="delivery"
                      placeholder="Enter Delivery Price"
                      className="form-control form-control-lg"
                      value={x.Delivery}
                      onChange={e => handleInputChange(e, i)}
                    />
                  </td>
                  {' '}
                  <td>
                    <input
                      type='number'
                      name="take_away"
                      placeholder="Enter TakeAway Price"
                      className="form-control form-control-lg"
                      value={x.TakeAway}
                      onChange={e => handleInputChange(e, i)}
                    />
                  </td>
                  <td>
                    {
                      i > 0 ? (
                        <i className="fas fa-trash-alt largei" onClick={(e) => handledeleteClick(i)}></i>
                      ) : ('')
                    }
                  </td>
                  <td>
                    {
                      inputList[i].name || inputList[i].description === !'' ?
                        <Fragment>
                          {
                            inputList.length - 1 === i &&
                            <button className='btn btn-primary2' onClick={(e) => handleAddClick(i)}> Add More</button>}
                        </Fragment> :
                        <Fragment>
                          <button className='btn btn-primary2' disabled  > Add More</button>
                        </Fragment>
                    }
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <div style={{ marginTop: "50px", display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
          <Button style={{ background: "#0575B4", width: '200px', color: "white" }} variant="contained" onClick={(e) => onSubmit(e)}>Submit</Button>

        </div>
      </div>
    </div>
  );
};

export default AddDish;
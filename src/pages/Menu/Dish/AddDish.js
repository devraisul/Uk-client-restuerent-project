import React, { Fragment } from 'react';
import { adddish } from '../../../Apis/dish';

const AddDish = ({ id, rid, name }) => {
  const [inputList, setInputList] = React.useState([{ name: "", description: "Description is coming soon!", price: "", restaurant_id: [rid], take_away: "", delivery: "", ingredients: "", calories: "" }]);

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
    }
    else {
      //send the data to API
      setInputList([...inputList, { name: "", description: "Description is coming soon!", price: "", restaurant_id: [rid], take_away: "", delivery: "" }]);
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
    }
    else {
      //send the data to API
      let dishes = inputList
      console.log(dishes)
      adddish(id, dishes)
        .then(res => {
          console.log(res);
          setInputList([{ name: "", description: "Description is coming soon!", price: "", restaurant_id: [rid], take_away: "", delivery: "", ingredients: "", calories: "" }])
        })
    };
  };
  return (
    <div>

      <div className='table-wrapper'>
        <h1 className='large text-center text-primary'>ADD Dish for {name} Menu</h1>
        <table className="fl-table">

          <thead>
            <tr>
              <th >#</th>
              <th>Dish_Name</th>
              <th>Dish Description</th>
              <th>Enter Ingredients</th>
              <th>Enter Calories</th>
              <th>Enter Price</th>
              <th>Delivery Price</th>
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
                      name="Dish_Name"
                      placeholder="Enter Dish Name"
                      value={x.Dish_Name}
                      className="form-control form-control-lg"
                      onChange={e => handleInputChange(e, i)}
                    />

                  </td>
                  <td>

                    <textarea

                      name="Dish_Description"
                      placeholder="Enter Dish Description"
                      className="form-control form-control-lg"
                      value={x.Dish_Description}
                      rows={1}
                      onChange={e => handleInputChange(e, i)}
                    />
                  </td>
                  <td>
                    <textarea

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
                      name="Dish_Price"
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
                      name="Delivery"
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
                      name="TakeAway"
                      placeholder="Enter TakeAway Price"
                      className="form-control form-control-lg"
                      value={x.TakeAway}
                      onChange={e => handleInputChange(e, i)}
                    />

                  </td>



                  <td>{i > 0 ? (<i className="fas fa-trash-alt largei" onClick={(e) => handledeleteClick(i)}></i>) : ('')}</td>
                  <td>


                    {inputList[i].Dish_Name || inputList[i].Dish_Description === !'' ? <Fragment> {inputList.length - 1 === i && <button className='btn btn-primary2' onClick={(e) => handleAddClick(i)}> Add More</button>}</Fragment> : <Fragment><button className='btn btn-primary2' disabled  > Add More</button></Fragment>}

                  </td>

                </tr>
              </tbody>
            );
          })}

          <button className='btn btn-primary-submit' onClick={(e) => onSubmit(e)}>Submit</button>


        </table>
      </div>
    </div>


  );
};

export default AddDish;
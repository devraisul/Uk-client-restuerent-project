import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gettype, gettypecount, Variationlink } from '../../Apis/variation';
import './viewMenu.css'
//Add dish Form
const LinkVariation = ({ rid, id }) => {

  const [variations, setVaration] = useState()
  const [loading, setLoading] = useState(false)
  const [loading_count, setLoading_count] = useState(false)
  const [variations_count, setVariations_count] = useState()
  useEffect(() => {
    setLoading(true)
    gettype(rid, id)
      .then(res => {
        setVaration(res)
        setLoading(false)
      })
  }, [id, rid]);
  const [inputList, setInputList] = useState([{ no_of_varation_allowed: "", typeID: "", Type: "" }]);


  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    if (name === 'Type') {
      handleInputChangeType(e, index, value)
    }
    setInputList(list);

  };
  const handleInputChangeType = (e, index, value) => {
    setLoading_count(true)
    var x = variations?.filter(item => item.name === value);
    console.log(x);

    const list = [...inputList];
    list[index]['typeID'] = x[0].varation_type_id;
    setInputList(list);
    gettypecount(x[0].id)
      .then(res => {
        setVariations_count(res);
        setLoading_count(false)
      })
  };
  // handle click event of the Add button
  const handleAddClick = (i) => {




    if (inputList[i].Price !== "") {

      setInputList([...inputList, { no_of_varation_allowed: "", typeID: "", Type: "" }]);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    let x = 0;
    let msg = ''
    let i = 0;
    console.log(inputList)
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].no_of_varation_allowed === '') {

        x++;
        msg = msg + `Please select no of Variation Allowed. `
      }
      if (inputList[i].Type === '') {

        x++;
        msg = msg + `Please Select Type. `
      }



    }
    if (x > 0) {
      alert(`${msg}`, 'danger');
    }
    else {

      //send the data to API
      let varation = inputList
      alert('Variation LInked', 'success');
      Variationlink(varation, id)
    }

  };

  return loading ? (
    <div>Loading ....</div>
  ) : (
    <div className='containerLBB'>
      {variations?.x?.length === 0 ? (<Fragment>
        <div className='form'>Add Some Variations First To Continue!
          <Link to={`/AddVariationtype/${rid}`} className='btn btn-primary-submit'>
            Variations
          </Link>
        </div>
      </Fragment>) : (
        <div>

          {inputList?.map((x, i) => {
            return (
              <div className='form'>

                <p>no: {i + 1}</p>

                <div className='form-group'>

                  <select name='Type' value={x?.Type}
                    onChange={e => handleInputChange(e, i)}>
                    <option value='0'>* Select a type</option>
                    {variations?.map((item, i) => {

                      return (

                        <option value={item?.name} >{item?.name}</option>
                      )
                    })}

                  </select>
                </div>

                <div className='form-group'>

                  <select type='number' name='no_of_varation_allowed' value={x?.no_of_varation_allowed}
                    onChange={e => handleInputChange(e, i)}>
                    <option value='0'>* Select No of Variation Allowed</option>
                    {loading_count ? (<option>loading....</option>) : (<Fragment>{variations_count?.results?.map((item, i) => {

                      return (
                        <option value={i + 1} >{i + 1}</option>
                      )
                    })}</Fragment>)}

                  </select>

                </div>


              </div>

            );
          })}

          <button className='btn btn-primary-submit' onClick={(e) => onSubmit(e)}>Submit</button>

        </div>)}
    </div>

  );
};


export default LinkVariation;
import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlineFileDone } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { addSingleDishVaiation, gettypecount, getVariation } from '../../Apis/variation';
import Loading from '../../components/Loading/Loading';
import { useAuth } from '../../context/AuthContext';
import './viewMenu.css';
//Add dish Form
const LinkVariation = ({ rid, id }) => {
  const user = useAuth()
  const [variations, setVaration] = useState([])
  const [loading, setLoading] = useState(false)
  const [loading_count, setLoading_count] = useState(false)
  const [variations_count, setVariations_count] = useState()
  const [isSubmited, setIsSubmited] = useState(false)
  useEffect(() => {
    setLoading(true)
    getVariation(user?.user?.restaurant[0]?.id).then(res => {
      setVaration(res.data)
      setLoading(false)
    })
  }, [rid]);
  const [inputList, setInputList] = useState([{ no_of_varation_allowed: "", type_id: "" }]);


  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    if (name === 'type_id') {
      handleInputChangeType(e, index, value)
    }
    setInputList(list);

  };
  const handleInputChangeType = (e, index, value) => {
    setLoading_count(true)
    var x = variations?.filter(item => item.name === value);
    console.log(x);

    const list = [...inputList];
    // list[index]['typeID'] = x[0].varation_type_id;
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
      setInputList([...inputList, { no_of_varation_allowed: "", type_id: "" }]);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let x = 0;
    let msg = ''
    let i = 0;
    inputList[0].dish_id = id;

    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].no_of_varation_allowed === '') {

        x++;
        msg = msg + `Please select no of Variation Allowed. `
      }
      if (inputList[i].type_id === '') {

        x++;
        msg = msg + `Please Select Type. `
      }
    }
    if (x > 0) {
      alert(`${msg}`, 'danger');
    }
    else {
      addSingleDishVaiation(inputList[0]).then((res) => {
        if (res?.data?.id) {
          setIsSubmited(true)
        }
      })
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className='containerLBB'>
      {variations?.x?.length === 0 ? (
        <Fragment>
          <div className='form'>Add Some Variations First To Continue!
            <Link to={`/AddVariationtype/${rid}`} className='btn btn-primary-submit'>
              Variations
            </Link>
          </div>
        </Fragment>
      ) : (
        <div>
          {inputList?.map((x, i) => {
            return (
              <>
                {
                  isSubmited ?
                    <div style={{
                      width:'100%',
                      height:'200px',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      flexDirection:'column',
                      marginLeft:'10px'
                    }}>
                      <div style={{
                        width:'100px',
                        height:'100px',
                        padding:'10px',
                        background:'#0575B4',
                        borderRadius:'30px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center'
                      }}>
                        <AiOutlineFileDone style={{
                        fontSize:'2.5rem',
                        color:'white'
                      }} />
                      </div>
                      <h2 style={{marginTop:"20px"}}>
                        Added Successfully
                      </h2>
                    </div> :

                    <div className='form'>
                      <div className='form-group'>
                        <select name='type_id' value={x?.type_id}
                          onChange={e => handleInputChange(e, i)}>
                          <option value='0'>* Select a type</option>
                          {variations?.map((item, i) => {
                            return (

                              <option value={item?.id} >{item?.name}</option>

                            )
                          })}
                        </select>
                      </div>
                      <div className='form-group'>
                        <select type='number' name='no_of_varation_allowed' value={x?.no_of_varation_allowed}
                          onChange={e => handleInputChange(e, i)}>
                          <option value='0'>* Select No of Variation Allowed</option>
                          <option value={1} >1</option>
                          <option value={2} >2</option>
                          <option value={3} >3</option>
                          <option value={4} >4</option>
                          <option value={5} >5</option>
                          {/* {loading_count ? (
                      <option>loading....</option>
                    ) : (
                      <Fragment>
                        {variations_count?.results?.map((item, i) => {
                          return (
                            <option value={i + 1} >{i + 1}</option>
                          )
                        })}
                      </Fragment>
                    )} */}
                        </select>
                      </div>
                    </div>
                }
              </>
            );
          })}
          {!isSubmited&&<button style={{
            background: '#0575B4',
            color: 'white'
          }} className='btn' onClick={(e) => onSubmit(e)}>
            Submit
          </button>}
        </div>
      )}
    </div>

  );
};


export default LinkVariation;
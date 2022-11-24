import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { addMultipleVariation, addVariation, getVariation } from '../../Apis/variation';
import { useAuth } from '../../context/AuthContext';
import AddVariation from './AddVariation';
import AddVariationTypes from './AddVariationTypes';
import AllVariationType from './AllVariationType';

const DishOptions = () => {
  const [inputList, setInputList] = React.useState([{ name: "", description: "" }]);
  const [inputList2, setInputList2] = React.useState([{ name: "", description: "", type_id: '', price: '' }]);
  const [isChangeDetect, setIsChangeDetect] = useState(Math.random())
  const { user } = useAuth();


  const [allVariationTypes, setAllVariationTypes] = useState([])

  const [isOnAllTypeMode, setIsOnAllTypeMode] = useState(true)
  const [isOnAddTypeMode, setIsOnAddTypeMode] = useState(false)
  const [isOnAddVariationMode, setIsOnAddVariationMode] = useState(false)
  // const [isOnAllVariationMode, setIsOnAllVariationMode] = useState(false)

  // handle input change for variation type
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };


  // handle input change for variation
  const handleInputChange2 = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList2];
    list[index][name] = value;
    setInputList2(list);
  };


  const onAllType = () => {
    setIsOnAllTypeMode(true)
    setIsOnAddTypeMode(false)
    setIsOnAddVariationMode(false)
  }
  const onAddType = () => {
    setIsOnAllTypeMode(false)
    setIsOnAddTypeMode(true)
    setIsOnAddVariationMode(false)
  }
  const onAddVariation = () => {
    setIsOnAllTypeMode(false)
    setIsOnAddTypeMode(false)
    setIsOnAddVariationMode(true)
    setIsChangeDetect(Math.random())
  }
  const onAllVariation = () => {
    setIsOnAllTypeMode(false)
    setIsOnAddTypeMode(false)
    setIsOnAddVariationMode(false)
  }

  // HANDLE ADD MORE VARIATION TYPE
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
  // HANDLE ADD MORE VARIATION
  const handleAddClick2 = (y) => {
    let x = 0;
    let i;
    let msg = '';
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList2.length; i++) {
      if (inputList2[i].name === '') {
        x++;
        msg = msg + `2 Please add a variation Name at row no: ${i + 1}. `
      }
      if (inputList2[i].description === '') {
        x++;
        msg = msg + `2 Please add a variation description at row no: ${i + 1}. `
      }
      if (inputList2[i].price === '') {
        x++;
        msg = msg + `2 Please add a variation price at row no: ${i + 1}. `
      }
      if (inputList2[i].type_id === '') {
        x++;
        msg = msg + `2 Please add a variation type at row no: ${i + 1}. `
      }
    }
    if (x > 0) {
      toast.error(msg)
    }
    else {
      //send the data to API
      setInputList2([...inputList2, { name: "", description: "", type_id: '', price: '' }]);
    };
  };


  // HANDLE DELETE VARIATION TYPE
  const handleDeleteClick = (i) => {
    const list2 = [...inputList];
    list2.splice(i, 1);
    setInputList(list2);
  };
  // HANDLE DELETE VARIATION
  const handleDeleteClick2 = (i) => {
    const list2 = [...inputList2];
    list2.splice(i, 1);
    setInputList2(list2);
  };

  // HANDLE SUBMIT VARIATION TYPE
  const onSubmitVariationType = async (e) => {
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
      addVariation(user.restaurant[0].id, variation)
        .then(res => {
          toast.success('Successfully Added Variation Type ')
          setInputList([{ name: "", description: "" }])
          onAllType()
          setIsChangeDetect(Math.random())
        }
        )

    };
  };
  // HANDLE SUBMIT VARIATION 
  const onSubmitVariation = async (e) => {
    e.preventDefault();
    let x = 0;
    let i;
    let msg = ''
    //validation if all the feilds are filled when submit button is clicked
    for (i = 0; i < inputList2.length; i++) {
      if (inputList2[i].name === '') {
        x++;
        msg = msg + `Please add a variation Name at row no: ${i + 1}. `
      }
      if (inputList2[i].description === '') {
        x++;
        msg = msg + `Please add a variation description at row no: ${i + 1}. `
      }
    }
    if (x > 0) {
      toast.error(msg);
    }
    else {
      //send the data to API
      let Varation = inputList2
      const data = {
        "varation": Varation
      }
      console.log(data);
      addMultipleVariation(data)
        .then(res => {
          if (res.data.length > 0) {
            toast.success('Variation Added Successfully!')
            setInputList2([{ name: "", description: "", type_id: '', price: '' }])
            onAllType(true)
            setIsChangeDetect(Math.random())
          }
        }
        )

    };
  };


  // GET ALL VVARIATION TYPE
  useEffect(() => {
    getVariation(user.restaurant[0].id)
      .then(res => {
        setAllVariationTypes(res.data);
      })
  }, [isChangeDetect])

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      {/* =================== TAB NAV ================= */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly'
          }}
          className='btn-center' >
          <button
            title='Dish Variations Type'
            style={{ display: 'flex', alignItems: 'center', background: '#0575B4', color: '#fff' }} className='large btn'
            onClick={(e) => onAddType(e)} >
            <AiOutlinePlus style={{ fontSize: '1.5rem' }} />
            <span style={{ marginLeft: '10px' }} className="menuNav">
              Dish Variations Type
            </span>
          </button>
          <button
            title='All Dish Variations Type'
            style={{ display: 'flex', alignItems: 'center', background: '#0575B4', color: '#fff' }} className='large btn'
            onClick={(e) => onAllType(e)}>
            <BiFoodMenu style={{ fontSize: '1.5rem' }} />
            <span
              style={{
                marginLeft: '10px'
              }}
              className="menuNav">
              All Dish Variations Type
            </span>
          </button>
          <button
            title='Dish Variations'
            style={{ display: 'flex', alignItems: 'center', background: '#0575B4', color: '#fff' }} className='large btn' onClick={(e) => onAddVariation(e)}>
            <AiOutlinePlus style={{ fontSize: '1.5rem' }} />
            <span style={{ marginLeft: '10px' }} className="menuNav">
              Dish Variations
            </span>
          </button>
          {/* <button
            title='All Variations'
            style={{ display: 'flex', alignItems: 'center', background: '#0575B4', color: '#fff' }} className='large btn'
            onClick={(e) => onAllVariation(e)}
          >
            <BiFoodMenu style={{ fontSize: '1.5rem' }} />
            <span style={{
              marginLeft: '10px'
            }}
              className="menuNav">
              All Variations
            </span>
          </button> */}
          <Link
            title='Back to dashboard'
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#0575B4',
              color: '#fff'
            }}
            className='large btn' to={`/app/dashboard`}>
            <TbLayoutDashboard style={{ fontSize: '1.5rem' }} />
            <span style={{ marginLeft: '10px' }} className="menuNav">
              Back to dashboard
            </span>
          </Link>
        </div>
      </div>


      {/* =============== VERIATION TYPE TAB =============== */}

      {/* ADD VARIATION TYPE  */}
      {isOnAddTypeMode &&
        <AddVariationTypes
          handleAddClick={handleAddClick}
          handleInputChange={handleInputChange}
          handleDeleteClick={handleDeleteClick}
          inputList={inputList}
          onSubmitVariationType={onSubmitVariationType} />}
      {/* ALL VARIATION TIPES  */}
      {isOnAllTypeMode &&
        <div style={{ marginTop: "50px" }}>
          <div>
            <h1 className='large text-center' style={{ color: '#aaa' }}>Dish Options</h1>
          </div>
          <AllVariationType setIsChangeDetect={setIsChangeDetect} />
        </div>}

      {/* =================== VARIATION TAB ================ */}
      {isOnAddVariationMode &&
        <AddVariation
          allVariationTypes={allVariationTypes}
          handleAddClick2={handleAddClick2}
          handleInputChange2={handleInputChange2}
          handleDeleteClick2={handleDeleteClick2}
          inputList2={inputList2}
          onSubmitVariation={onSubmitVariation} />}
      {/* {isOnAllVariationMode &&
        <div style={{ marginTop: "50px" }}>
          <div>
            <h1 className='large text-center' style={{ color: '#aaa' }}>All Variation</h1>
          </div>
          <AllVariation setIsChangeDetect={setIsChangeDetect} />
        </div>
      } */}
    </>
  );
};

export default DishOptions;
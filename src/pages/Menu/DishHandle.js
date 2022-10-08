import React, { Fragment } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { TbArrowBack, TbLayoutDashboard } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AddDish from './Dish/AddDish';
import Alldish from './Dish/Alldish';
const DishHandle = () => {
  const { user } = useAuth()
  const [showaddmenu, setshowaddmenu] = React.useState(false);
  const [showallmenu, setshowallmenu] = React.useState(true);
  const [isChangeMenu, setIsChangeMenu] = React.useState(Math.random());
  const [editall, seteditall] = React.useState(false);
  const params = useParams()

  const onshowmenu = (e) => {
    setshowaddmenu(!showaddmenu)
    seteditall(false)
  };

  const oneditall = (e) => {
    setshowaddmenu(false)
    seteditall(!editall)
  };
  const onAllmenu = (e) => {
    setshowaddmenu(false)
    seteditall(false)
  }
const buttonStyle = {
  textAlign:'center',
  width:'170px',
  background: '#0575B4',
  color: '#fff',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  textAlign:'left'
}
const buttonIcon = {
  fontSize:'1.5rem',
  margin:'0px 10px 0px 0px'
}
  return (
    <Fragment>
      <div>
        <div style={{
          display:'flex',
          justifyContent:'center'
        }}>
          <button className='large btn'
            style={buttonStyle}
            onClick={(e) => onshowmenu(e)}>
            <AiOutlinePlus style={buttonIcon} /> Add Dish
          </button>
          <button
            style={buttonStyle}
            className='large btn' onClick={(e) => onAllmenu(e)}>
            <IoFastFoodOutline style={buttonIcon} /> All dishes
          </button>
          <button
            style={buttonStyle}
            className='large btn' onClick={(e) => oneditall(e)}>
            {!editall ? (
              <Fragment>
                <BiEdit style={buttonIcon} /> Edit All
              </Fragment>
            ) : ('Back to dishes')}
          </button>
          <Link
            style={buttonStyle}
            className='large btn' to={`/dashboard/${user.restaurant[0].id}`}>
            <TbLayoutDashboard style={buttonIcon} /> Go to dashboard
          </Link>
          <Link
            style={buttonStyle}
            className='large btn' to={`/app/menu`}>
            <TbArrowBack style={buttonIcon} /> Back to Menu
          </Link>
        </div>
      </div>
      {showaddmenu ? (
        <AddDish setIsChangeMenu={setIsChangeMenu} menuId={params.menuId} restaurentId={params.restaurentId} menuName={params.menuName} />
      )
        :
        ('')
      }
      {showallmenu ? (
        <Alldish isChangeMenu={isChangeMenu} menuId={params.menuId} restaurentId={params.restaurentId} menuName={params.menuName} />
      )
        :
        ('')
      }
    </Fragment>
  );
};

export default DishHandle;
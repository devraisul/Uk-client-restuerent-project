import React, { Fragment, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AddMenu from './AllMenu/AddMenu';
import AllMenu from './AllMenu/AllMenu';
import Editmenu from './AllMenu/Editmenu';
const MenuHandle = () => {
  const { user } = useAuth()
  const [showaddmenu, setshowaddmenu] = useState(false);
  const [editall, seteditall] = useState(false);

  const [showallmenu, setshowallmenu] = useState(true);
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



  //show all menu
  return (
    <Fragment>
      <div>
        <div style={{
          display: 'flex',
          justifyContent:'space-evenly'
        }} className='btn-center'>
          <button style={{ display: 'flex', alignItems: 'center',background:'#0575B4',color:'#fff' }} className='large btn' onClick={(e) => onshowmenu(e)}>
            <AiOutlinePlus style={{fontSize:'1.5rem'}} />
            <span style={{marginLeft:'10px'}} className="menuNav">
              Add Menu
            </span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center',background:'#0575B4',color:'#fff' }} className='large btn' onClick={(e) => onAllmenu(e)}>
            <IoFastFoodOutline style={{fontSize:'1.5rem'}} />
            <span style={{
              marginLeft:'10px'
              }} className="menuNav">
              All Menu
            </span>
          </button>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center',
            background:'#0575B4',
            color:'#fff'
             }} className='large btn' onClick={(e) => oneditall(e)}>
            <BiEdit style={{
              fontSize:'1.5rem'
              }} />
            <span style={{
              marginLeft:'10px'
              }} className="menuNav">
              Edit All
            </span>
          </button>
          <Link style={{ 
            display: 'flex', 
            alignItems: 'center',
          background:'#0575B4',
          color:'#fff'
           }} className='large btn' to={`/dashboard/}`}>
            <TbLayoutDashboard style={{fontSize:'1.5rem'}} />
            <span style={{marginLeft:'10px'}} className="menuNav">
              Back to  dashboard
            </span>
          </Link>
        </div>
      </div>

      {showaddmenu ? (<AddMenu id={user.restaurant[0].id} />) : ('')}
      {editall ? (<Editmenu id={user.restaurant[0].id} />) : ('')}
      {showallmenu ? (<AllMenu id={user.restaurant[0].id} />) : ('')}
    </Fragment>
  );
};
export default MenuHandle;

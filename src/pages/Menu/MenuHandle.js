import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AddMenu from './AllMenu/AddMenu';
import AllMenu from './AllMenu/AllMenu';
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

        <div className='btn-center'>
          <button className='large btn btn-primary' onClick={(e) => onshowmenu(e)}><i className="fas fa-plus"></i> Add Menu</button>
          <button className='large btn btn-primary' onClick={(e) => onAllmenu(e)}> All Menu</button>
          <button className='large btn btn-primary' onClick={(e) => oneditall(e)}><i className="fas fa-edit"></i> Edit All</button>
          <Link className='large btn btn-primary' to={`/dashboard/}`}>Back to  dashboard</Link>

        </div>
      </div>
      {showaddmenu ? (<AddMenu id={user.restaurant[0].id} />) : ('')}
      {/* {editall ? (<Editmenu id={user.restaurant[0].id} />) : ('')} */}
      {showallmenu ? (<AllMenu id={user.restaurant[0].id} />) : ('')}




    </Fragment>
  );
};
export default MenuHandle;

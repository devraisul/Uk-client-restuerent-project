import React, { Fragment, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEdit, BiFoodMenu } from 'react-icons/bi';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AddMenu from './AllMenu/AddMenu';
import AllMenu from './AllMenu/AllMenu';
import Editmenu from './AllMenu/Editmenu';
const MenuHandle = () => {
  const { user } = useAuth()
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editAll, setEditAll] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(true);
  const [changeMonitor, setChangeMonitor] = useState(Math.random())

  const onAddMenu = (e) => {
    setShowAddMenu(!showAddMenu)
    setEditAll(false)
  };
  const onEditAll = (e) => {
    setShowAddMenu(false)
    setEditAll(!editAll)
  };

  const onAllMenu = (e) => {
    setShowAddMenu(false)
    setEditAll(false)
  }

  //show all menu
  return (
    <Fragment>

      {/* NAVIGATION SECTION  */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly'
          }}
          className='btn-center'>
          <button
            title='Add Menu'
            style={{ display: 'flex', alignItems: 'center', background: '#0575B4', color: '#fff' }} className='large btn'
            onClick={(e) => onAddMenu(e)}>
            <AiOutlinePlus style={{ fontSize: '1.5rem' }} />
            <span style={{ marginLeft: '10px' }} className="menuNav">
              Add Menu
            </span>
          </button>
          <button
            title='All Menu'
            style={{ display: 'flex', alignItems: 'center', background: '#0575B4', color: '#fff' }} className='large btn'
            onClick={(e) => onAllMenu(e)}>
            <BiFoodMenu style={{ fontSize: '1.5rem' }} />
            <span style={{
              marginLeft: '10px'
            }} className="menuNav">
              All Menu
            </span>
          </button>
          <button
            title='Edit All'
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#0575B4',
              color: '#fff'
            }}
            className='large btn'
            onClick={(e) => onEditAll(e)}>
            <BiEdit style={{ fontSize: '1.5rem' }} />
            <span style={{ marginLeft: '10px' }} className="menuNav">
              Edit All
            </span>
          </button>
          <Link
            title='Back to dashboard'
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#0575B4',
              color: '#fff'
            }}
            className='large btn'
            to={`/app/dashboard`}>
            <TbLayoutDashboard style={{ fontSize: '1.5rem' }} />
            <span style={{ marginLeft: '10px' }} className="menuNav">
              Back to dashboard
            </span>
          </Link>
        </div>
      </div>

      {/* MAIN SECTION  */}
      {showAddMenu ? (<AddMenu onAllMenu={onAllMenu} setChangeMonitor={setChangeMonitor} id={user.restaurant[0].id} />) : ('')}
      {editAll ? (<Editmenu setEditAll={setEditAll} setChangeMonitor={setChangeMonitor} id={user.restaurant[0].id} />) : ('')}
      {showAllMenu ? (<AllMenu changeMonitor={changeMonitor} id={user.restaurant[0].id} />) : ('')}
    </Fragment>
  );
};
export default MenuHandle;

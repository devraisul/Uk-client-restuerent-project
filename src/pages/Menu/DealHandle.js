import React, { Fragment, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { useAuth } from '../../context/AuthContext';
import AddDeal from './Deal/AddDeal';
import AllDeals from './Deal/AllDeals';
import EditAllDish from './Dish/EditAllDish';


const DealHandle = () => {
    const { user } = useAuth()
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showAllMenu, setShowAllMenu] = useState(true);
    const [isChangeMenu, setIsChangeMenu] = useState(Math.random());
    const [editAll, setEditAll] = useState(false);
    const params = useParams()

    const [open, setOpen] = useState(false);
    const [inEditMode, setInEditMode] = useState({
        status: false,
        dish_id: ""
    });

    // ON EDIT/ADD POPUP CLOSED ==================== 
    const closeModal = () => {
        setOpen(false)
        setInEditMode({
            status: false,
            dish_id: ""
        })
    };

    const handleAddDish = (e) => {
        setOpen(true)
    };
    const handleEditDish = (dish_id) => {
        setInEditMode({
            status: true,
            dish_id: dish_id
        });
        setOpen(true)
    };

    const onEditAll = (e) => {
        setShowAddMenu(false)
        setShowAllMenu(false)
        setEditAll(true)
    };
    const offEditAll = (e) => {
        setShowAddMenu(false)
        setShowAllMenu(true)
        setEditAll(false)
    };
    const handleViewAllDishes = (e) => {
        setShowAddMenu(false)
        setShowAllMenu(true)
        setEditAll(false)
    }

    return (
        <Fragment>
            <div>
                {/* NAVIGATION BUTTONS  */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}
                    className='btn-center'>
                    <button
                        title='Add Dish'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#0575B4',
                            color: '#fff'
                        }}
                        className='large btn'
                        onClick={(e) => handleAddDish(e)}>
                        <AiOutlinePlus style={{ fontSize: '1.5rem' }} />
                        <span style={{ marginLeft: '10px' }} className="menuNav">
                            Add Deal
                        </span>
                    </button>

                    <button
                        title='All Dishes'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#0575B4',
                            color: '#fff'
                        }}
                        className='large btn' onClick={(e) => handleViewAllDishes(e)}>
                        <IoFastFoodOutline style={{ fontSize: '1.5rem' }} />
                        <span style={{
                            marginLeft: '10px'
                        }} className="menuNav">
                            All Deals
                        </span>
                    </button>
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#0575B4',
                            color: '#fff'
                        }}
                        className='large btn'
                        onClick={(e) => editAll ? offEditAll(e) : onEditAll(e)} >
                        {!editAll ? (
                            <>
                                <BiEdit
                                    title='Edit All'
                                    style={{
                                        fontSize: '1.5rem'
                                    }} />
                                <span style={{
                                    marginLeft: '10px'
                                }} className="menuNav">
                                    Edit All
                                </span>
                            </>
                        ) : (
                            <>
                                <BsArrowReturnLeft
                                    title='Back'
                                    style={{
                                        fontSize: '1.5rem'
                                    }} />
                                <span style={{
                                    marginLeft: '10px'
                                }} className="menuNav">
                                    Back
                                </span>
                            </>
                        )}
                    </button>
                    <Link
                        title='Back to Menu'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#0575B4',
                            color: '#fff'
                        }}
                        className='large btn' to={`/app/menu`}>
                        <MdOutlineRestaurantMenu style={{ fontSize: '1.5rem' }} />
                        <span style={{ marginLeft: '10px' }} className="menuNav">
                            Back to Menu
                        </span>
                    </Link>
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

            <div>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <AddDeal inEditMode={inEditMode} closeModal={closeModal} setIsChangeMenu={setIsChangeMenu} menuId={params.menuId} restaurentId={params.restaurentId} menuName={params.menuName} />
                </Popup>
            </div>

            {editAll && <EditAllDish setIsChangeMenu={setIsChangeMenu} isChangeMenu={isChangeMenu} menuId={params.menuId} restaurentId={params.restaurentId} menuName={params.menuName} />}

            {showAllMenu && <AllDeals
                handleEditDish={handleEditDish}
                setIsChangeMenu={setIsChangeMenu}
                isChangeMenu={isChangeMenu}
                menuId={params.menuId}
                restaurentId={params.restaurentId}
                menuName={params.menuName}
            />}
        </Fragment>
    );
};

export default DealHandle;
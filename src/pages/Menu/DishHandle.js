import React, { Fragment } from 'react';
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

  return (
    <Fragment>
      <div>
        <div className='btn-center'>
          <button className='large btn btn-primary' onClick={(e) => onshowmenu(e)}>
            <i className="fas fa-plus"></i> Add Dish
          </button>
          <button className='large btn btn-primary' onClick={(e) => onAllmenu(e)}>
            All dishes
          </button>
          <button className='large btn btn-primary' onClick={(e) => oneditall(e)}>
            {!editall ? (<Fragment><i className="fas fa-edit"></i> Edit All</Fragment>) : ('Back to dishes')}
          </button>
          <Link className='large btn btn-primary' to={`/dashboard/${user.restaurant[0].id}`}>
            Back to dashboard
          </Link>
          <Link className='large btn btn-primary' to={`/addmenu/${user.restaurant[0].id}`}>
            Back to Menu
          </Link>
        </div>
      </div>
      {showaddmenu ? (
        <AddDish setIsChangeMenu={setIsChangeMenu} menuId={params.menuId} restaurentId={params.restaurentId} menuName={params.menuName} />
      )
        :
        ('')
      }
      {/* {editall ? (<Editdish id={user?.restaurant[0]?.Key_ID} rid={user.restaurant[0].id} />) : ('')} */}
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
import React, { Fragment } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEdit } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { deleteMenu, editMenuSingle } from '../../../Apis/Menu';

const AllmenuUI = ({ menus, index, Mid, setChangeHappend }) => {
  const [formData, setFormData] = React.useState({
    name: menus?.name,
    description: menus?.description,
    id: menus?.id
  });
  const [editflag, setseditflag] = React.useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { name, description, id } = formData;


  const onSubmit2 = async (e) => {
    e.preventDefault();
    setseditflag(!editflag)
    editMenuSingle(formData)
      .then(res => {
        if (res.data.id) {
          toast.success("Menu Update Successfully");
          setChangeHappend(Math.random())
        }

      })
    console.log(index + 1)
  };
  const handleDeleteMenu = (Mid) => {
    deleteMenu(Mid).then((res) => {

      if (res.data.message === 'ok') {
        setChangeHappend(Math.random())
      }


    })
  }
  return (
    <Fragment>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {
        editflag ? (
          <tbody>
            <tr>
              <td width="10%">
                {index + 1}
              </td>
              <td width="10%">
                <form className='form' >
                  <div className='form-groupnopadding'>
                    <input
                      type='text'
                      placeholder='Enter Name'
                      name='name'
                      value={name}
                      onChange={(e) => onChange(e)}
                    //required
                    />
                  </div>
                </form>
              </td>
              <td width="30%">
                <form className='form' >
                  <div className='form-groupnopadding'>
                    <input
                      type='text'
                      placeholder='Enter Name'
                      name='description'
                      value={description}
                      onChange={(e) => onChange(e)}
                    //required
                    />
                  </div>
                </form>
              </td>
              <td width="40%"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%'
                }}
              >
                {menus?.name === 'Deals' ? (
                  <Fragment>
                    <Link to={`/add-deal/${Mid}/${menus?.id}`} style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: '#fff',
                      background: '#0575B4',
                      padding: '15px 5px',
                      display: 'block',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      width: '140px'
                    }}>
                      View/Add dishes
                    </Link>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link to={`/api/add-dish/${menus?.name}/${id}/${menus?.id}`} style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: '#fff',
                      background: '#0575B4',
                      padding: '15px 5px',
                      display: 'block',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      width: '140px'
                    }}>
                      View/Add dishes
                    </Link>
                  </Fragment>
                )}
              </td>
              <td width="5%">
                <Link style={{
                  color: '#fff',
                  background: '#0575B4',
                  padding: '5px 5px',
                  borderRadius: '30px',
                  width: '100%'
                }} to={`/menu/${id}/${menus?.id}`} >
                  {menus?.dishes.length}
                </Link>
              </td>
              <td width="5%">
                <button className='btn btn-primary2' onClick={(e) => onSubmit2(e)}>Update</button>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td width="10%">
                {index + 1}
              </td>
              <td width="10%">
                {menus?.name}
              </td>
              <td width="30%">
                {menus?.description}
              </td>
              <td width="40%"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%'
                }}
              >
                {menus?.name === 'Deals' ? (
                  <Fragment>
                    <Link style={{
                      display: 'block',
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: '#fff',
                      background: '#0575B4',
                      padding: '15px 5px',

                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      width: '140px',

                    }} to={`/app/add-deal/${id}/${menus?.id}`}>
                      View/Add dishes
                    </Link>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link style={{
                      display: 'block',
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: '#fff',
                      background: '#0575B4',
                      padding: '15px 5px',

                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      width: '140px',
                      justifySelf: 'center'
                    }} to={`/app/add-dish/${menus?.name}/${id}/${menus?.id}`}>
                      View/Add dishes
                    </Link>
                  </Fragment>
                )}
              </td>
              <td width="5%">
                <Link style={{
                  color: '#fff',
                  background: '#0575B4',
                  padding: '5px 5px',
                  borderRadius: '30px',
                  width: '100%'
                }} to={`/menu/${id}/${menus?.id}`} >
                  {menus?.dishes.length}
                </Link>
              </td>
              <td width="5%">
                <div>
                  <AiFillEdit style={{ fontSize: '1.2rem', margin: '2px', color: 'green', cursor: 'pointer' }} onClick={(e) => setseditflag(!editflag)}></AiFillEdit>
                  <FiTrash2 style={{ fontSize: '1.2rem', margin: '2px', color: 'red', cursor: 'pointer' }} onClick={(e) => handleDeleteMenu(menus?.id)}></FiTrash2>
                </div>

              </td>
            </tr>
          </tbody>
        )
      }
    </Fragment>
  )
};

export default AllmenuUI;
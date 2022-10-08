import React, { Fragment } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Editmenusingle } from '../../../Apis/Menu';

const AllmenuUI = ({ menus, index, id }) => {
  const [formData, setFormData] = React.useState({
    Name: menus?.name,
    Description: menus?.description,
    Mid: menus?.id
  });
  const [editflag, setseditflag] = React.useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { Name, Description, Mid } = formData;


  const onSubmit2 = async (e) => {
    e.preventDefault();
    setseditflag(!editflag)
    Editmenusingle(formData)
      .then(res => {
        console.log(res);
        toast.success("Menu Update Successfully");
      })
    console.log(index + 1)
  };

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
                      placeholder='Enter  Name'
                      name='Name'
                      value={Name}
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
                      name='Description'
                      value={Description}
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
                    <Link to={`/add-deal/${id}/${menus?.id}`} style={{
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
                <i className="fas fa-pen" onClick={(e) => setseditflag(!editflag)}></i>
              </td>
            </tr>
          </tbody>
        )
      }
    </Fragment>
  )
};

export default AllmenuUI;
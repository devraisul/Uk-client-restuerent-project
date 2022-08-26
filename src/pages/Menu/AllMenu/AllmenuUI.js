import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Editmenusingle } from '../../../Apis/Menu';
import toast, { Toaster } from 'react-hot-toast';

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

  return (<Fragment>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    {editflag ? (<tbody>
      <tr>
        <td>{index + 1}</td>
        <td>
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
        <td><form className='form' >
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
        </form></td>
        <td>
          {menus?.name === 'Deals' ? (<Fragment><Link to={`/add-deal/${id}/${menus?.id}`} className='btn btn-light'>View/Add dishes</Link></Fragment>) : (<Fragment><Link to={`/api/add-dish/${menus?.name}/${id}/${menus?.id}`} className='btn btn-light'>View/Add dishes</Link></Fragment>)}</td>

        <td><Link to={`/menu/${id}/${menus?.id}`} className='btn btn-light'>{menus?.dishes.length}</Link></td>

        <td>
          <button className='btn btn-primary2' onClick={(e) => onSubmit2(e)}>Update</button>
        </td>

      </tr>

    </tbody>) : (<tbody>
      <tr>
        <td>{index + 1}</td>
        <td>{menus?.name} </td>
        <td>{menus?.description}</td>
        <td>
          {menus?.name === 'Deals' ? (<Fragment><Link to={`/app/add-deal/${id}/${menus?.id}`} className='btn btn-light'>View/Add dishes</Link></Fragment>) : (<Fragment><Link to={`/app/add-dish/${menus?.name}/${id}/${menus?.id}`} className='btn btn-light'>View/Add dishes</Link></Fragment>)}</td>

        <td><Link to={`/menu/${id}/${menus?.id}`} className='btn btn-light'>{menus?.dishes.length}</Link></td>

        <td><i className="fas fa-pen" onClick={(e) => setseditflag(!editflag)}></i></td>
      </tr>

    </tbody>)}</Fragment>
  )
};

export default AllmenuUI;
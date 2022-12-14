import React, { Fragment } from 'react';
import { getMenu } from '../../../Apis/Menu';
import AllmenuUI from './AllmenuUI';

const AllMenu = ({ id }) => {
  const [menus, setMenus] = React.useState();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true)
    getMenu(id)
      .then(res => {
        setMenus(res);
        setLoading(false)
      })
  }, [id])
  console.log(menus);
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>

      <div className='table-wrapper'>
        <h1 className='large text-center text-primary'>All Menu</h1>
        <table className='servicesT'>

          <tbody>
            <tr>
              <th width="10%">#</th>
              <th width="10%">Name</th>
              <th width="30%">Description</th>
              <th width="20%">Total dishes</th>
              <th width="20%">View dishes</th>
              <th width="10%"></th>
            </tr>
          </tbody>
          {!menus?.length ? (<Fragment>
            <tbody>
              <tr>
                <td>None </td>
                <td>None</td>
                <td>None</td>
                <td>None</td>
                <td>None</td>

              </tr>

            </tbody>

          </Fragment>) : (<Fragment>{menus?.map((menus, i) => (

            <AllmenuUI
              key={i}
              menus={menus}
              id={id}
              index={i}
            />
          ))}</Fragment>)}



        </table>
      </div>
    </Fragment>
  );
};

export default AllMenu;
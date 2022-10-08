import React, { Fragment } from 'react';
import { getMenu } from '../../../Apis/Menu';
import Loading from '../../../components/Loading/Loading';
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

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding:'20px 10px'
      }} >
        <h1 style={{
          color: '#0575B4'
        }} className='large text-center'>All Menu</h1>
        <table className='servicesT'>
          <thead>
            <tr>
              <th style={{
                background: '#0575B4', border: 'none'
              }} width="10%">#</th>
              <th style={{
                background: '#0575B4', border: 'none'
              }} width="10%">Name</th>
              <th style={{
                background: '#0575B4', border: 'none'
              }} width="30%">Description</th>
              <th style={{
                background: '#0575B4', border: 'none'
              }} width="40%">Dishes</th>
              <th style={{
                background: '#0575B4', border: 'none'
              }} width="5%">Total dishes</th>
              <th style={{
                background: '#0575B4', border: 'none'
              }} width="5%">Edit</th>
            </tr>
          </thead>
          {!menus?.length ? (<Fragment>
            <tbody>
              <tr>
                <td>No data </td>
              </tr>
            </tbody>
          </Fragment>
          ) : (
            <Fragment>{menus?.map((menus, i) => (
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
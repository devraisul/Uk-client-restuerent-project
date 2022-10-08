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


  // STYLES 
  const Styles = {
    constainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '20px 10px'
    },
    h1: {
      color: '#0575B4'
    },
    tableHead: {
      background: '#0575B4', border: 'none'
    },
  }


  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div style={Styles.constainer} >
        <h1 style={Styles.h1} className='large text-center'>All Menu</h1>
        <table className='servicesT'>
          <thead>
            <tr>
              <th style={Styles.tableHead} width="10%">#</th>
              <th style={Styles.tableHead} width="10%">Name</th>
              <th style={Styles.tableHead} width="30%">Description</th>
              <th style={Styles.tableHead} width="40%">Dishes</th>
              <th style={Styles.tableHead} width="5%">Total dishes</th>
              <th style={Styles.tableHead} width="5%">Edit</th>
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
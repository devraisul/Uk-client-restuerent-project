import React, { Fragment, useState } from 'react';
import { getMenu } from '../../../Apis/Menu';
import Loading from '../../../components/Loading/Loading';
import AllmenuUI from './AllmenuUI';

const AllMenu = ({ id,changeMonitor }) => {
  const [menus, setMenus] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [changeHappend, setChangeHappend] = useState(Math.random())
  React.useEffect(() => {
    setLoading(true)
    getMenu(id)
      .then(res => {
        setMenus(res);
        setLoading(false)
      })
  }, [id,changeHappend,changeMonitor])


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
                <td style={{
                  fontSize: '2rem'
                }} colSpan={6}>No data Found!</td>
              </tr>
            </tbody>
          </Fragment>
          ) : (
            <Fragment>
              {menus?.map((menus, i) => (
                <AllmenuUI
                setChangeHappend={setChangeHappend}
                  key={i}
                  menus={menus}
                  Mid={id}
                  index={i}
                />
              ))}
            </Fragment>
          )}
        </table>
      </div>
    </Fragment>
  );
};

export default AllMenu;
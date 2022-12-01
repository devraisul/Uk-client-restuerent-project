import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { getMenu } from '../../../Apis/Menu';
import Loading from '../../../components/Loading/Loading';
import styles from './AllMenu.module.css';
import AllmenuUI from './AllmenuUI';

const AllMenu = ({ id,changeMonitor }) => {
  const [menus, setMenus] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [changeHappend, setChangeHappend] = useState(Math.random());
  
  React.useEffect(() => {
    setLoading(true)
    getMenu(id)
      .then(res => {
        setMenus(res);
        setLoading(false)
      })
  }, [id,changeHappend,changeMonitor])

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className={styles.constainer} >
        <h1 className={styles.h1} >All Menu</h1>
        <Table className='servicesT'>
          <TableHead style={{background:"#0575B4"}}>
            <TableRow  style={{background:"#0575B4"}}>
              <TableCell className={styles.tableHead} width="10%">#</TableCell>
              <TableCell className={styles.tableHead} width="20%">Name</TableCell>
              <TableCell className={styles.tableHead} width="40%">Description</TableCell>
              <TableCell className={styles.tableHead} width="20%">Dishes</TableCell>
              <TableCell className={styles.tableHead} width="20%">Deals</TableCell>
              <TableCell className={styles.tableHead} width="20%">Edit</TableCell>
            </TableRow>
          </TableHead>
          {!menus?.length ? (<Fragment>
            <TableBody>
              <TableRow>
                <TableCell style={{
                  fontSize: '2rem'
                }} colSpan={6}>No data Found!</TableCell>
              </TableRow>
            </TableBody>
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
        </Table>
      </div>
    </Fragment>
  );
};

export default AllMenu;
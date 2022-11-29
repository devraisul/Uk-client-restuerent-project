import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Table } from '@mui/material';
import React, { Fragment } from 'react';
import { getdish } from '../../../Apis/dish';
import Loading from '../../../components/Loading/Loading';
import AlldishesUI from './AlldishesUI';


const Alldish = ({ isChangeMenu, setIsChangeMenu, menuId, menuName, restaurentId, handleEditDish }) => {
  const [dishes, setDishes] = React.useState()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    getdish(menuId)
      .then(res => {
        setDishes(res);
        setLoading(false)
      })
  }, [isChangeMenu]);

  const [comp_update, set_comp_update] = React.useState(1);
  // if(update && comp_update%2!=0)
  if (comp_update % 2 != 0) {
    console.log("Hello updatee dish")
    set_comp_update(comp_update + 1)
    getdish(menuId);
    set_comp_update(comp_update + 1)
  }


  // STYLES 
  const Styles = {
    constainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '20px 5px',
      width: '100%',
      overflowX: 'scroll'
    },
    h1: {
      color: '#0575B4'
    },
    tableHead: {
      background: '#0575B4', border: 'none'
    },
    uploadImageButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    variationButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div style={Styles.constainer} >
        <h1 style={{ color: '#0575B4' }} className='large text-center'>Dishes of {menuName}</h1>
        <Table sx={{ minWidth: 1150 }} className='servicesT'>
          <TableHead>
            <TableRow>
              <TableCell style={Styles.tableHead} minWidth="5%">#</TableCell>
              <TableCell style={Styles.tableHead} minWidth="15%">Name</TableCell>
              <TableCell style={Styles.tableHead} minWidth="10%">Price</TableCell>
              <TableCell style={Styles.tableHead} minWidth="30%">Description</TableCell>
              <TableCell style={Styles.tableHead} minWidth="10%">Image</TableCell>
              <TableCell style={Styles.tableHead} minWidth="20%">Linked Variations</TableCell>
              <TableCell style={Styles.tableHead} minWidth="20%">Edit</TableCell>
            </TableRow>
          </TableHead>
          {!dishes?.length ? (
            <Fragment>
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontSize: '2rem' }} colSpan={8}>No dish found!</TableCell>
                </TableRow>
              </TableBody>
            </Fragment>
          ) : (
            <Fragment>
              {dishes?.map((dishes, i) => (
                <AlldishesUI
                  key={i}
                  handleEditDish={handleEditDish}
                  setIsChangeMenu={setIsChangeMenu}
                  dishes={dishes}
                  rid={dishes?.restaurant_id}
                  index={i + 1}
                />
              ))}
            </Fragment>
          )
          }
        </Table>
      </div>
    </Fragment>

  );
};

export default Alldish;
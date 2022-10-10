import React, { Fragment } from 'react';
import { getdish } from '../../../Apis/dish';
import Loading from '../../../components/Loading/Loading';
import AlldishesUI from '../../ViewMenu/AlldishesUI';

const Alldish = ({ isChangeMenu, menuId, menuName, restaurentId }) => {
  const [dishes, setDishes] = React.useState()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    getdish(menuId)
      .then(res => {
        setDishes(res);
        console.log({ res:isChangeMenu });
        setLoading(false)
      })
  }, [isChangeMenu]);

  console.log(dishes);
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
      padding: '20px 10px'
    },
    h1: {
      color: '#0575B4'
    },
    tableHead: {
      background: '#0575B4', border: 'none'
    },
    uploadImageButton:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    variationButton:{
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
      <div style={Styles.constainer} className='table-wrapper'>
        <h1 style={{color:'#0575B4'}} className='large text-center'>{menuName} Dishes</h1>
        <table className='servicesT'>
          <tbody>
            <tr>
              <th style={Styles.tableHead} width="5%">#</th>
              <th style={Styles.tableHead} width="5%">Name</th>
              <th style={Styles.tableHead} width="5%">Price</th>
              <th style={Styles.tableHead} width="10%">Description</th>
              <th style={Styles.tableHead} width="30%">Upload Image</th>
              <th style={Styles.tableHead} width="30%">Link Variation</th>
              <th style={Styles.tableHead} width="10%">Linked Variations</th>
              <th style={Styles.tableHead} width="5%"></th>
            </tr>
          </tbody>
          {!dishes?.length ? (
            <Fragment>
              <tbody>
                <tr>
                  <td style={{fontSize:'2rem'}} colSpan={8}>No dish found!</td>
                </tr>
              </tbody>
            </Fragment>
          ) : (
            <Fragment>
              {dishes?.map((dishes, i) => (
                <AlldishesUI
                  key={dishes?.ressult_id}
                  dishes={dishes}
                  id={dishes?.restaurant_id}
                  index={i + 1}
                />
              ))}
            </Fragment>
          )
          }
        </table>
      </div>
    </Fragment>

  );
};

export default Alldish;
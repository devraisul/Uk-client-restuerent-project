import React from 'react';
import { Fragment } from 'react';
import { getCustOrer } from '../../Apis/Order';

const UserOrder = () => {
  const [order, setOrder] = React.useState([])
  React.useEffect(() => {
    getCustOrer()
      .then(res => {
        setOrder(res.data);
      })
  }, [])
  return (
    <div className='table-wrapper'>
      <h1 className='large text-center text-primary'>Your Order</h1>
      <table className='servicesT'>

        <tbody>
          <tr>
            <th width="10%">#</th>
            <th width="10%">Amount</th>
            <th width="10%">Type</th>
            {/* <th width="20%">View dishes</th>
            <th width="20%">Total dishes</th> */}
          </tr>
        </tbody>
        {!order?.length ? (<Fragment>
          <tbody>
            <tr>
              <td>No data </td>
            </tr>
          </tbody>
        </Fragment>
        ) : (
          <Fragment>{order?.map((menus, i) => (

            menus?.detail?.map(data => (
              <tbody>
                <tr>
                  <td>{i + 1} </td>
                  <td>{menus?.amount} </td>
                  <td>{data?.type}</td>
                </tr>
              </tbody>
            ))


          ))}</Fragment>)}
      </table>
    </div>
  );
};

export default UserOrder;
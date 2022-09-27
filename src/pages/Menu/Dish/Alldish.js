import React, { Fragment } from 'react';
import { getdish } from '../../../Apis/dish';
import Loading from '../../../components/Loading/Loading';
import AlldishesUI from '../../ViewMenu/AlldishesUI';

const Alldish = ({ menuId, menuName }) => {
  const [dishes, setDishes] = React.useState()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    getdish(menuId)
      .then(res => {
        setDishes(res);
        console.log({ res });
        setLoading(false)
      })
  }, [menuId]);
  console.log(dishes);
  const [comp_update, set_comp_update] = React.useState(1);
  // if(update && comp_update%2!=0)
  if (comp_update % 2 != 0) {
    console.log("Hello updatee dish")
    set_comp_update(comp_update + 1)
    getdish(menuId);
    set_comp_update(comp_update + 1)
  }

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className='table-wrapper'>
        <h1 className='large text-center text-primary'>{menuName} Dishes</h1>
        <table className='servicesT'>
          <tbody>
            <tr>
              <th width="10%">#</th>
              <th width="10%">Dish Name</th>
              <th width="10%">Dish Price</th>
              <th width="20%">Dish Description</th>
              <th width="10%">Upload Image</th>
              <th width="10%"> Link Variation</th>
              <th width="10%"> Linked Variations</th>
              <th width="10%"></th>
              <th width="10%"></th>
            </tr>
          </tbody>
          {!dishes?.length ? (
            <Fragment>
              <tbody>
                <tr>
                  <td>None </td>
                  <td>None</td>
                  <td>None</td>
                  <td>None</td>
                  <td>None</td>
                  <td>None</td>
                  <td>None</td>
                  <td>None</td>
                  <td>None</td>
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
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { gettables } from '../../Apis/table';

const Shoppingcart = ({ id }) => {
  const [amount, setamount] = useState(subtotal + 3.60 + 5.00);
  const [order, setorder] = useState([{ Name: "", Description: "", Dish_Price: "", Qty: "", img: "" }]);
  const [showplaceorder, setshowplaceorder] = useState(false);

  useEffect(() => {
    gettables(id);

  }, [gettables]);
  const [formData, setFormData] = useState({
    Name: '',
    Remarks: '',
    table_number: '',

  });

  const { Name, Remarks, table_number } = formData;

  //set the entered data into state 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //handel changes of Qty

  useEffect(() => {
    setorder(products)
    setamount(subtotal + 3.60 + 5.00)

  });

  const onSubmit = async (e) => {
    e.preventDefault();
    addorderbyuser(products, amount, id, { Name, Remarks, table_number })
    emptycartorder()

  };
  var vardisplay = "";
  const setvardisplay = (x) => {
    vardisplay = x;
  }
  return (
    <Fragment>
      <div >
        {order.length === 0 ? (<Fragment><h1 className='center'>Empty Cart</h1>
        </Fragment>) : (
          <Fragment>
            <ul className='sidenavv__list'>
              {order.map((x, i) => (
                <Fragment>

                  <li className='sidenavv__list-item'>
                    {' '}
                    <div>
                      <p className='product-card-name'>{' '}{x.Name} </p>
                      <p className="cart-subtotal-amount">£{x.Dish_Price} </p>
                    </div>
                    <div className="product-card-des">
                      {x.Type === 'deal' ? (<p className='product-variation'>{x.variation}</p>) : (<Fragment> {x.variation ? (
                        x.variation.map((a, i) => (<Fragment>
                          {vardisplay === a.variation_Type ? ('') : (<Fragment>
                            <p>{a.variation_Type}( {x.variation.map((y, i) => (<Fragment>
                              {a.variation_Type === y.variation_Type ? (<Fragment> {setvardisplay(a.variation_Type)}<p className='product-variation'>{y.variation_Name}  </p></Fragment>) : ''}

                            </Fragment>))} ) </p>
                          </Fragment>)}
                        </Fragment>))
                      ) : null}</Fragment>)}

                      <div className='remove-product-i'>
                        {x.Qty > 1 ? (<i className=" fas fa-minus" onClick={(e) => updatecartminus(x)} ></i>) : (
                          <i className="fas fa-trash-alt" onClick={(e) => removecart(x)}></i>)}{x.Qty}  <i className="fas fa-plus" onClick={(e) => updatecartadd(x)}></i></div>

                    </div>

                  </li>





                </Fragment>
              ))}
              <li className='sidenavv__list-item'>
                <div >
                  <div >
                    <p className="cart-subtotal">Subtotal:</p>
                    <p className="cart-subtotal-amount">£{subtotal} </p>

                  </div>

                  <div className='totals-item totals-item-total'>
                    <p className="cart-total">Total:<p className='em'>(Incl.GST)</p></p>
                    <p className="cart-total-amount">£{amount} </p>
                  </div>
                </div>
                {showplaceorder ? (<Fragment>
                  <form className='form' >
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Enter Name'
                        name='Name'
                        value={Name}
                        onChange={(e) => onChange(e)}

                      //required
                      />
                    </div>


                    <div>

                      <div className='form-group'>
                        <textarea
                          placeholder='Order Remarks'
                          name='Remarks'
                          value={Remarks}
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </div>
                  </form>
                  <button className="btnnn " onClick={(e) => (onSubmit(e))}>Place order</button>

                </Fragment>) : (<Fragment></Fragment>)}






              </li>
            </ul>

          </Fragment>
        )}


      </div>

    </Fragment>
  );
};

export default Shoppingcart;
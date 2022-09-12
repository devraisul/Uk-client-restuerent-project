import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { gettables } from "../../Apis/table";

const Shoppingcart = ({ id,rand }) => {
  const subtotal=0
  const [amount, setAmount] = useState(subtotal + 3.60 + 5.00);
  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{
    setCartItems(JSON.parse(localStorage.getItem('cart_items'))!==null?JSON.parse(localStorage.getItem('cart_items')):[])
  },[rand])
  const [showplaceorder, setshowplaceorder] = useState(false);
console.log(cartItems);
  // useEffect(() => {
  //   gettables(id);
  // }, [gettables]);

  // const [formData, setFormData] = useState({
  //   Name: '',
  //   Remarks: '',
  //   table_number: '',

  // });

  // const { Name, Remarks, table_number } = formData;

  // const updatecartminus=()=>{
  // }
  // const removecart =()=>{

  // }
  // const updatecartadd =()=>{

  // }
  //   //set the entered data into state
  // const onChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  // //handel changes of Qty

  // useEffect(() => {
  //   setAmount(subtotal + 3.60 + 5.00)
  //   // setCartItems(JSON.parse(localStorage.getItem('cart_items')))
  // });

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   // addorderbyuser(products, amount, id, { Name, Remarks, table_number })
  //   // emptycartorder()
  // };
  // var setVarDisplay = "";
  // const setVarDisplay = (x) => {
  //   setVarDisplay = x;
  // };
  return (
    <Fragment>
      <div>
        {cartItems.length === 0 ? (
          <Fragment>
            <h1 className="center">Empty Cart</h1>
          </Fragment>
        ) : (
          <Fragment>
            <ul className="sidenavv__list">
              {cartItems.map((cartItem, i) => (
                <Fragment key={i}>
                  <li className="sidenavv__list-item">
                    <div>
                      <p className="product-card-name"> {cartItem.Name} </p>
                      <p className="cart-subtotal-amount">
                        £{cartItem.Dish_Price}{" "}
                      </p>
                    </div>
                    <div className="product-card-des">
                      {/* {
                      cartItem.Type === "deal" ? (
                        <p className="product-variation">
                          {
                          cartItem.variation
                          }
                        </p>
                      ) : ( 
                        // // <Fragment>
                        //   {cartItem.variation
                        //     ? cartItem.variation.map((vari, i) => (
                                // <Fragment key={i}>
                                //   {setVarDisplay === vari.variation_Type ? (
                                //     ""
                                //   ) : (
                                //     <Fragment>
                                //       <p>
                                //         {vari.variation_Type}(
                                //         {cartItem.variation.map((y, i) => (
                                //           <Fragment key={i}>
                                //             {vari.variation_Type ===
                                //             y.variation_Type ? (
                                //               <Fragment>
                                //                 {setVarDisplay(
                                //                   vari.variation_Type,
                                //                 )}
                                //                 <p className="product-variation">
                                //                   {y.variation_Name}
                                //                 </p>
                                //               </Fragment>
                                //             ) : (
                                //               ""
                                //             )}
                                //           </Fragment>
                                //         ))}
                                //         )
                                //       </p>
                                //     </Fragment>
                                //   )}
                                // </Fragment>
                              // ))
                            // : null}
                        // </Fragment>
                      // )}
                      */}
                      <div className="remove-product-i">
                        {cartItem.Qty > 1 ? (
                          <i
                            className=" fas fa-minus"
                            // onClick={(e) => updatecartminus(cartItem)}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-trash-alt"
                            // onClick={(e) => removecart(cartItem)}
                          ></i>
                        )}
                        {cartItem.Qty}{" "}
                        <i
                          className="fas fa-plus"
                          // onClick={(e) => updatecartadd(cartItem)}
                        ></i>
                      </div>
                    </div>
                  </li>
                </Fragment>
              ))}
              <li className="sidenavv__list-item">
                <div>
                  <div>
                    <p className="cart-subtotal">Subtotal:</p>
                    <p className="cart-subtotal-amount">£{subtotal} </p>
                  </div>
                  <div className="totals-item totals-item-total">
                    <p className="cart-total">
                      Total:<p className="em">(Incl.GST)</p>
                    </p>
                    <p className="cart-total-amount">£{amount} </p>
                  </div>
                </div>
                {showplaceorder ? (
                  <Fragment>
                    <form className="form">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Enter Name"
                          name="Name"
                          // value={Name}
                          // onChange={(e) => onChange(e)}
                        />
                      </div>
                      <div>
                        <div className="form-group">
                          <textarea
                            placeholder="Order Remarks"
                            name="Remarks"
                            // value={Remarks}
                            // onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                    </form>
                    <button className="btnnn " 
                    // onClick={(e) => onSubmit(e)}
                    >
                      Place order
                    </button>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}
              </li>
            </ul>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Shoppingcart;

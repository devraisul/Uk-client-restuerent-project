import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { gettables } from "../../Apis/table";

const Shoppingcart = ({ id, rand, setChangeCartItems }) => {
 const [subTotal, setSubTotal] = useState(0)
  const [amount, setAmount] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [change, setChange] = useState(0);
let subtotal = 0
  useEffect(() => {
    setCartItems(
      JSON.parse(localStorage.getItem("cart_items")) !== null
        ? JSON.parse(localStorage.getItem("cart_items"))
        : [],
    );
  }, [rand, change]);

  const decrCartItemsQuantity = (index, quantity) => {
    cartItems[index].quantity = quantity;
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    setChange(Math.random());
  };

  const deleteCartItem = (index) => {
    cartItems.splice(index, 1);
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    setChange(Math.random());
    setChangeCartItems(Math.random());
  };

  const incrCartItemsQuantity = (index, quantity) => {
    cartItems[index].quantity = quantity;
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    setChange(Math.random());
  };

  // useEffect(() => {
  //   console.log(subTotal);
  // },[subTotal]);
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
                  <li
                    style={{ backgroundColor: "#eeeeee", marginBottom: 5 }}
                    className="sidenavv__list-item"
                  >
                    <div>
                      <p className="product-card-name"> {cartItem.name} </p>
                      <br />

                      <p className="cart-subtotal-amount">
                        £
                        {
                          cartItem.variations.length > 0
                            ? cartItem.variations.map((variation) => {
                                cartItem.price =
                                  cartItem.price + JSON.parse(variation).price;
                              })
                            : (cartItem.price = cartItem.price)

                          
                        }{
                          <>
                          {cartItem.price}
                          {
                            setSubTotal(subTotal+cartItem.price)
                          }
                          </>
                        }
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "gray",
                        marginTop: 10,
                        fontSize: "0.8rem",
                      }}
                    >
                      {cartItem?.variations.length > 0 ? (
                        <>
                          <h1>Variations:</h1>
                          <div>
                            (
                            {cartItem?.variations?.map((variation, i) => (
                              <Fragment key={i}>
                                {/* {subtotal=subtotal+JSON.parse(variation).price} */}
                                {i + 1 >= cartItem.variations.length ? (
                                  <span>{` ${
                                    JSON.parse(variation).name
                                  } `}</span>
                                ) : (
                                  <span>{` ${
                                    JSON.parse(variation).name
                                  } , `}</span>
                                )}
                              </Fragment>
                            ))}
                            )
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="product-card-des">
                      <div className="remove-product-i">
                        {cartItem.quantity > 1 ? (
                          <i
                            className=" fas fa-minus"
                            onClick={(e) =>
                              decrCartItemsQuantity(
                                i,
                                cartItem.quantity - 1,
                                cartItem.price,
                              )
                            }
                          ></i>
                        ) : (
                          <i
                            className="fas fa-trash-alt"
                            onClick={(e) =>
                              deleteCartItem(
                                i,
                                cartItem.quantity,
                                cartItem.price,
                              )
                            }
                          ></i>
                        )}
                        {cartItem.quantity}{" "}
                        <i
                          className="fas fa-plus"
                          onClick={(e) =>
                            incrCartItemsQuantity(
                              i,
                              cartItem.quantity + 1,
                              cartItem.price,
                            )
                          }
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
                    <p className="cart-subtotal-amount">£ {subtotal} </p>
                  </div>
                  <div className="totals-item totals-item-total">
                    <p className="cart-total">
                      Total:<p className="em">(Incl.GST)</p>
                    </p>
                    <p className="cart-total-amount">
                      £{subtotal + 3.6 + 5.0}
                      {""}
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  // onClick={(e) => onSubmit(e)}
                >
                  Place order
                </button>
              </li>
            </ul>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Shoppingcart;

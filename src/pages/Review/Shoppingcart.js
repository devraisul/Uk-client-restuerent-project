import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Shoppingcart = ({ id, rand, setChangeCartItems }) => {
  var subtotal = 0;
  const [amount, setAmount] = useState(200);
  const [cartItems, setCartItems] = useState([]);
  const [change, setChange] = useState(0);

  const { user, isAuthenticated } = useAuth();

  const history = useHistory()
  useEffect(() => {
    localStorage.getItem('customer_details') === null && localStorage.setItem('customer_details', JSON.stringify([]))
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

  const onSubmit = () => {
    (JSON.parse(localStorage.getItem('customer_details')).length > 0) ?
      history.push(`/place_order/${JSON.parse(localStorage.getItem('data'))?.restaurant[0]?.id}`)
      :
      history.push('/customer_registration')
  }
  let sum = 0;

  for (let i = 0; i < cartItems.length; i++) {
    sum += (cartItems[i].price * cartItems[i].quantity);
  }
  console.log(sum);
  return (
    <Fragment>
      <div>
        {cartItems.length === 0 ? (
          <Fragment>
            <h1 className="center">Empty Cart</h1>
          </Fragment>
        ) : (
          <Fragment>
            <ul className="">
              {cartItems.map((cartItem, i) => (
                <Fragment key={i}>
                  <li
                    style={{
                      backgroundColor: "#eeeeee",
                      marginBottom: 5
                    }}
                    className="sidenavv__list-item"
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                      alignItems: 'center'
                    }}>
                      <img
                        style={{
                          width: '50px'
                        }}
                        src={cartItem?.image ? `https://mughalsignandprint.co.uk/restaurant/${cartItem?.image}` : "https://i.postimg.cc/BQv5vFdv/no-pictures.png"} alt={cartItem.name} />
                      <p style={{ fontSize: '0.8rem', marginLeft: '5px' }} className="product-card-name"> {cartItem.name} </p>
                    </div>

                    <div>
                      <p style={{
                        fontWeight: 'bold',
                        color: '#999'
                      }} className="cart-subtotal-amount">
                        £
                        {
                          cartItem.variations.length > 0 ? cartItem.variations.map((variation) => (
                            // cartItem.price = cartItem.price + JSON.parse(variation).price;
                            <>
                              {cartItem.price}
                            </>
                          ))
                            : cartItem.price
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
                                {i + 1 >= cartItem.variations.length ? (
                                  <span>{` ${JSON.parse(variation).name
                                    } `}</span>
                                ) : (
                                  <span>{` ${JSON.parse(variation).name
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
                  {/* <div>
                    <p className="cart-subtotal">Subtotal:</p>
                    <p className="cart-subtotal-amount">£ {subtotal} </p>
                  </div> */}
                  <div className="totals-item totals-item-total">
                    <p className="cart-total">
                      Total:<p className="em">(Incl.GST)</p>
                    </p>
                    <p className="cart-total-amount">
                      £{sum}
                      {/* £{subtotal + 3.6 + 5.0} */}
                      {""}
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => onSubmit()}
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

import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { getuserdeal } from "../../Apis/dish";
import { getVariationByDishId } from "../../Apis/variation";

//all dishes show UI in owner dashboard
const BuyDishes = ({ dishes, id, setChangeCartItems }) => {
  // const { addproduct, adduserdealproduct } = useAuth();
  // const [DishIDcheck, setDishIDcheck] = useState(false);
  const [count, setcount] = useState(1);
  // const [price, setprice] = useState(dishes?.price);
  const [className, setclassName] = useState("grid-container-infoUM2");
  // const [allowedvaration, setallowedvaration] = useState([{}]);
  const [initial, setinitial] = useState(false);
  // const [selectvaration, setselectvaration] = useState(false);
  // const [dealdish, setdealdish] = useState({});
  // const [index, setindex] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const closeModal2 = () => setOpen2(false);

  const [dishVariations, setDishVariations] = useState([]);

  const [variantLoading, setVariantLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dishes.variations = data?.variations ? data.variations : [];
    dishes.quantity = count;
    const cartItem = JSON.parse(localStorage.getItem("cart_items")) || [];
    localStorage.setItem("cart_items", JSON.stringify([...cartItem, dishes]));
    setChangeCartItems(Math.random());
    setOpen2(false)
  };


  useEffect(() => {
    if (initial === true) {
      setinitial(false);
    } else {
    }
  }, [initial]);

  useEffect(() => {
    if (dishes?.type === "deal") {
      getuserdeal();
    }
  }, [getuserdeal]);
  //set allowedvaration on checked or unchecked

  // set dish Qty
  const handleminus = () => {
    if (count > 1) {
      setcount(count - 1);
    }
  };
  //uncheck all
  const openpopup = (e) => {
    if (dishes?.variations?.length > 0) {
      if (dishes?.variations?.length === 1) {
        setclassName("grid-container-infoUM2V1");
      } else {
        setclassName("grid-container-infoUM2");
      }
    } else {
      setclassName("grid-container-infoUM22");
    }
    setOpen(true);
  };

  const handdeleClick = (id) => {
    setVariantLoading(true)
    getVariationByDishId(id).then((res) => {
      setDishVariations(res?.data)
      setVariantLoading(false)
    });
    setOpen2(true);
    openpopup(true);
  };
  const trimString = (string, length = 15) => (string?.slice(0, string?.length >= length - 3 ? length - 3 : string?.length).padEnd(string?.length >= length - 3 ? length : string?.length, '.'))


  return (
    <Fragment>
      <div
        style={{
          borderRadius: '10px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',

        }}
        className="grid-itemUM"
        onClick={(e) => handdeleClick(dishes?.id)}>
        <div style={{
          width: '50%',
          height: "100%",

        }}>
          <h3>{dishes?.name}</h3>
          <p style={{
            fontSize: '0.8rem',
            marginBottom: '10px',
            color: '#555'
          }}>{trimString(dishes?.description)}</p>
          <div className="divprice">
            <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#999' }} className="DishPrice"> £ {dishes?.price} </p>{" "}
          </div>
        </div>
        <div
          style={{
            width: "50%",

            height: '100%'
          }}
        >
          {dishes?.image ? (
            <Fragment style={{
              width: '50%'
            }}>
           {
//               console.log(dishes?.image)
           }
              <img
                style={{
                  objectFit: 'cover',
                  width: '100%'
                }}
                height={'150'}
                className="roundimgg"
                src={`https://mughalsignandprint.co.uk/restaurant/${dishes?.image}`}
                alt="user"
                onClick={(e) => setOpen2(true)}
              />
            </Fragment>

          ) : (
            <img
              style={{
                objectFit: 'cover',
                width: '100%'
              }}
              height={'150'}
              className="roundimgg"
              src={"https://i.postimg.cc/BQv5vFdv/no-pictures.png"}
              alt="user"
              onClick={(e) => setOpen2(true)}
            />
          )}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%'
          }} className="infoicon">
            <i className="fas fa-info"></i>
          </div>
        </div>

        <Popup open={open2} closeOnDocumentClick onClose={closeModal}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <button className="close" onClick={(e) => setOpen2(false)}>
              &times;
            </button>
            <img
              height={200}
              alt={dishes?.name}
              src={`${dishes?.image ? `https://mughalsignandprint.co.uk/restaurant/${dishes?.image}` : "https://i.postimg.cc/BQv5vFdv/no-pictures.png"}`}
            />
            <h1 style={{ textAlign: "center", margin: '0px 0px 10px 0px' }}>{dishes?.name}</h1>

            {dishVariations.length !== 0 ? (
              dishVariations.map((dishVariation, i) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  key={i}
                >
                  {/* {console.log(dishVariation)} */}
                  <div>
                    <div style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <h1 style={{ width: '100%', textAlign: 'left' }} className="btn btn-primary fs-5 mb-5">
                        {`Choose ${dishVariation.no_of_varation_allowed} ${dishVariation?.variation_type?.name} `}
                      </h1>
                    </div>
                    <div>
                      {dishVariation.variation_type.variation.map(
                        (variation, j) => (
                          <Fragment key={j}>
                            <input
                              type={"checkbox"}
                              value={
                                (variation?.name && variation?.price) ?
                                  (JSON.stringify({
                                    name: variation.name ? variation.name : 0,
                                    price: variation.price ? variation.price : 0,
                                  })) : (
                                    '{}'
                                  )
                              }
                              name="variations"
                              {...register("variations")}
                            />
                            <span style={{ marginLeft: "10px" }}>
                              {variation.name}
                            </span>{" "}
                            <br />
                          </Fragment>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ width: "100%" }} className="text-center">
                {variantLoading ?
                  <div>
                    Loading...
                  </div> :
                  <div>

                  </div>
                }
              </div>
            )}
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}>
              <div
                // className="form-groupp"
                style={{
                  margin: "5px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }} >
                <i
                  style={{ cursor: "pointer" }}
                  className="fas fa-minus"
                  onClick={(e) => handleminus()}
                ></i>
                <h2 style={{ textAlign: "center" }}>{count}</h2>
                <i
                  style={{ cursor: "pointer" }}
                  className="fas fa-plus"
                  onClick={(e) => setcount(count + 1)}
                ></i>
              </div>
              <input
                // style={{ width: "100%" }}
                type="submit"
                className="btn btn-primary"
                value="Add to order"
              />
            </div>

          </form>
        </Popup>
        
      </div>
    </Fragment>
  );
};

export default BuyDishes;

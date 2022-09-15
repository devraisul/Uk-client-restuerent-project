import React, { Fragment, useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { getuserdeal } from "../../Apis/dish";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { getVariationByDishId } from "../../Apis/variation";

import ImageComing from "../../assets/image-coming-soon.png";
//all dishes show UI in owner dashboard
const BuyDishes = ({ dishes, id, setChangeCartItems }) => {
  // console.log(dishes);
  const { addproduct, adduserdealproduct } = useAuth();
  const [DishIDcheck, setDishIDcheck] = useState(false);
  const [count, setcount] = useState(1);
  const [price, setprice] = useState(dishes?.price);
  const [className, setclassName] = useState("grid-container-infoUM2");
  const [allowedvaration, setallowedvaration] = useState([{}]);
  const [initial, setinitial] = useState(false);
  const [selectvaration, setselectvaration] = useState(false);
  const [dealdish, setdealdish] = useState({});
  const [index, setindex] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const closeModal2 = () => setOpen2(false);

  const [dishVariations, setDishVariations] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log('ddddddddd',data.variations);
    dishes.variations = data.variations;
    dishes.quantity = count;
    const cartItem = JSON.parse(localStorage.getItem("cart_items")) || [];
    // console.log('FORM DATA',data);
    localStorage.setItem("cart_items", JSON.stringify([...cartItem, dishes]));
    setChangeCartItems(Math.random());
  };
  // console.log(errors);


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
    getVariationByDishId(id).then((res) => setDishVariations(res.data));
    setOpen2(true);
    openpopup(true);
    console.log(dishVariations);
  };
  return (
    <Fragment>
      <div className="grid-itemUM" onClick={(e) => handdeleClick(dishes?.id)}>
        <h4>{dishes?.name}</h4>
        <div className="infoicon">
          <i className="fas fa-info"></i>
        </div>
        {!dishes?.image ? (
          <img
            className="roundimgg"
            src={""}
            alt="user"
            onClick={(e) => setOpen2(true)}
          />
        ) : (
          <img
            className="roundimgg"
            src={""}
            alt="user"
            onClick={(e) => setOpen2(true)}
          />
        )}
        <p>{dishes?.description}</p>
        <div className="divprice">
          <p className="DishPrice"> £ {dishes?.price} </p>{" "}
        </div>

        <Popup open={open2} closeOnDocumentClick onClose={closeModal}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <a className="close" onClick={(e) => setOpen2(false)}>
              &times;
            </a>
            <img
              height={300}
              src={`${dishes?.image ? dishes.image : "/no-image.png"}`}
            />
            <h1 style={{ textAlign: "center" }}>{dishes?.name}</h1>

            {dishVariations.length !== 0 &&
              dishVariations.map((dishVariation, i) => (
                <div style={{ display: 'flex', justifyContent: "center" }} key={i}>
                  {/* {console.log(dishVariation)} */}
                  <div>
                    <h1 className="btn btn-primary">
                      {`Choose ${dishVariation.no_of_varation_allowed} ${dishVariation?.variation_type?.name} `}
                    </h1>
                    <div sx={{ flexDirection: 'column' }}>
                      {dishVariation.variation_type.variation.map((variation, j) => (
                        <Fragment key={j}>
                          <input type={'checkbox'} value={
                            JSON.stringify({
                              name: variation.name,
                              price: variation.price
                            })
                          }
                            name="variations"
                            {...register("variations")}
                          />
                          <span style={{ marginLeft: '10px' }}>{variation.name}</span> <br />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

            <div
              className="form-groupp"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div>
                <i className="fas fa-minus" onClick={(e) => handleminus()}></i>
              </div>
              <div>
                <h2 style={{ textAlign: "center" }}>{count}</h2>
              </div>
              <div>
                <i
                  className="fas fa-plus"
                  onClick={(e) => setcount(count + 1)}
                ></i>
              </div>
            </div>
            <Fragment>
              <input
                style={{ width: "100%" }}
                type="submit"
                className="btn btn-primary"
                value="Add to order"
              />
            </Fragment>
          </form>
        </Popup>
      </div>
    </Fragment>
  );
};

export default BuyDishes;

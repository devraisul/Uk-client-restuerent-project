import React, { Fragment, useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { getuserdeal } from "../../Apis/dish";
import { useAuth } from "../../context/AuthContext";
import { useForm } from 'react-hook-form';


//all dishes show UI in owner dashboard
const BuyDishes = ({ dishes, id }) => {
  // console.log(dishes);
  const { addproduct, adduserdealproduct } = useAuth();
  const [showvaration, setshowvaration] = useState(false);
  const [showvarationD, setshowvarationD] = useState(0);
  const [DishIDcheck, setDishIDcheck] = useState(false);
  const [count, setcount] = useState(1);
  const [price, setprice] = useState(dishes?.price);
  const [className, setclassName] = useState("grid-container-infoUM2");
  const [allowedvaration, setallowedvaration] = useState([{}]);
  const [allowedvariation, setallowedvariation] = useState(0);
  const [initial, setinitial] = useState(false);
  const [selectvaration, setselectvaration] = useState(false);
  const [dealdish, setdealdish] = useState({});
  const [index, setindex] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const [dealvari, setdealvari] = useState(false);
  const [update, setupdate] = useState(true);
  const closeModal2 = () => setOpen2(false);

  

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    // console.log('ddddddddd',dishes);
    dishes.quantity=count;
    const cartItem = JSON.parse(localStorage.getItem('cart_items')) || []
    // console.log('FORM DATA',data);
    localStorage.setItem('cart_items',JSON.stringify([...cartItem,dishes]));
}
  // console.log(errors);





  const [dishvariation, setdishvariation] = useState([
    { variationID: "", variation_Name: "", variation_Type: "", Dish_Name: "" },
  ]);
  const [formData,] = useState({
    DishID: id,
    Name: dishes?.name,
    Description: dishes?.description,
    variation: dishes?.variation,
    Qty: count,
    Dish_Price: price,
    img: dishes?.image,
    Type: dishes?.type,
  });

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
  const onchecked = (
    e,
    value,
    variationName,
    variationPrice,
    varationtype,
    allow,
    box,
    dish,
    deald,
  ) => {
    if (!e.target.checked) {
      var flag = false;
      for (var i = 0; i < allowedvaration.length; i++) {
        if (allowedvaration[i].type === varationtype) {
          allowedvaration[i].selected = allowedvaration[i].selected - 1;
          flag = true;
        }
      }
      setselectvaration(true);
    } else if (e.target.checked) {
      var flag = false;
      for (var b = 0; b < allowedvaration.length; b++) {
        if (allowedvaration[b].type === varationtype) {
          allowedvaration[b].selected = allowedvaration[b].selected + 1;
          flag = true;
        }
      }
      if (!flag) {
        setallowedvaration([
          ...allowedvaration,
          { selected: 1, allowed: allow, type: varationtype },
        ]);
      }
      setprice(price + variationPrice);
      const list = [...dishvariation];
      const { name } = e.target;
      setselectvaration(false);
      list[index][name] = value;
      list[index]["variation_Name"] = variationName;
      list[index]["variation_Type"] = varationtype;
      list[index]["Dish_Name"] = dish;
      setdishvariation(list);
      setindex(index + 1);
      setdishvariation([
        ...dishvariation,
        {
          variationID: "",
          variation_Name: "",
          variation_Type: "",
          Dish_Name: "",
        },
      ]);
      setdealdish(deald);
    }
  };
  // set dish Qty
  const handleminus = () => {
    if (count > 1) {
      setcount(count - 1);
    }
  };
  //uncheck all
  const openpopup = (e) => {
    if (dishes?.variations.length > 0) {
      if (dishes?.variations.length === 1) {
        setclassName("grid-container-infoUM2V1");
      } else {
        setclassName("grid-container-infoUM2");
      }
    } else {
      setclassName("grid-container-infoUM22");
    }
    setOpen(true);
  };

  // const onSubmit = (e) => {
  //   // {
  //   //   dish_id:dishes?.id,
  //   //   restaurant_id:dishes?.restaurant_id,
  //   //   menu_id:dishes?.idmenu_id,
  //   //   quantity:dishes?.id
  //   // }
  // };
  // disable or enable checkbox
  function handlecheckbox(count, box, type, j) {
    for (let x = 0; x < allowedvaration.length; x++) {
      // console.log("x",x, " ", allowedvaration[x])
      //console.log(allowedvaration[x].selected< allowedvaration[x].allowed)
      if (
        allowedvaration[x].type === type &&
        allowedvaration[x].selected === allowedvaration[x].allowed
      ) {
        // console.log('if condition ')
        // console.log(allowedvaration[x].selected,allowedvaration[x].allowed)
        if (!document.getElementById(box).checked) {
          //  console.log(document.getElementById(box))
          return true;
        } else if (document.getElementById(box).checked) {
          // console.log(document.getElementById(box))
          return false;
        }
      } else if (
        allowedvaration[x].type === type &&
        allowedvaration[x].selected < allowedvaration[x].allowed
      ) {
        return false;
      }
    }
    return false;
  }
  const handdelvariations = (id, e) => {
    setDishIDcheck(id);
  };
  const handdeleClick = () => {
    setOpen2(true);
    openpopup(true);
  };
  return (
    <Fragment>
      <div className="grid-itemUM" onClick={(e) => setOpen2(true)}>
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
            <div className="form-groupp" style={{ display: "flex" }}>
              <div>
                <i className="fas fa-minus" onClick={(e) => handleminus()}></i>
              </div>
              <div>
                <h2>{count}</h2>
              </div>
              <div>
                {" "}
                <i
                  className="fas fa-plus"
                  onClick={(e) => setcount(count + 1)}
                ></i>
              </div>
            </div>
          <Fragment>
            <input
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

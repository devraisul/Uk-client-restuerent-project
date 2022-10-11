import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllDish } from "../../Apis/dish";
import { getMenu } from "../../Apis/Menu";
import { getRestaurent } from "../../Apis/Restaurent";
import ImageComing from "../../assets/image-coming-soon.png";
import Loading from "../../components/Loading/Loading";
import { useAuth } from "../../context/AuthContext";
import Alldishes from "../AllDishes/Alldishes";
import Cart from "../Review/Cart";
import Review from "../Review/Review";
import BuyDishes from "./BuyDishes";
import "./tabmenu.css";

const TabMenu = () => {
  const { isAuthenticated } = useAuth();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const [restuarant, setRestuarant] = useState();
  const [aLL_dishes, setALL_dishes] = useState();
  const [menus, setMenus] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loadingdishes, setLoadingdishes] = useState(false);
  const [changeCartItems, setChangeCartItems] = useState(0)
  useEffect(() => {
    setLoading(true);
    setLoading2(true);
    setLoadingdishes(true);
    getRestaurent(id).then((res) => {
      setRestuarant(res.restaurant);
      setLoading(false);
    });
    getMenu(id).then((res) => {
      setMenus(res);
      setLoading2(false);
    });
    getAllDish(id).then((res) => {
      setALL_dishes(res);
      setLoadingdishes(false);
    });
  }, [id]);

  const [showdishesEven, setshowdishesEven] = useState(false);
  const [showdishesodd, setShowDishesOdd] = useState(false);
  const [clickcheck, setClickCheck] = useState(false);
  const [MenuId, setMenuId] = useState("");
  const [MenuName, setMenuName] = useState("");
  const [Initalstate, setInitalstate] = useState(true);
  const [collapse, setCollapse] = useState();
  const [open, setOpen] = useState(false);

  const toggleCollapse = (index, i) => {
    if (!document.getElementById(index).checked) {
      document.getElementById(index).checked = false;
    } else {
      document.getElementById(index).checked = true;
    }

    if (collapse === i) {
      setCollapse();
    } else {
      setCollapse(i);
    }
    // console.log(collapse);
  };

  //show all menu
  const onClickk = (e) => {
    setInitalstate(true);
    setshowdishesEven(false);
    setShowDishesOdd(false);
  };

  //show clicked menu
  const onClick = (e, i, name) => {
    if (clickcheck) {
      setInitalstate(false);
      setshowdishesEven(true);
      setShowDishesOdd(false);
      setMenuId(i);
      setMenuName(name);
      setClickCheck(false);
    } else {
      setInitalstate(false);
      setShowDishesOdd(true);
      setshowdishesEven(false);
      setMenuId(i);
      setMenuName(name);
      setClickCheck(true);
    }
  };

  return loading && loading2 ? (  
    <Loading />
  ) : (
    <>
      <Fragment>
        <section className="landing2">
          <div className="dark-overlay">
            <div className="landing-inner">
              <div className="x-largeLogo">
                {" "}
                {!restuarant?.Logo ? (
                  <img className="centerImage2" src={ImageComing} alt="logo" />
                ) : (
                  <img
                    className="centerImage2"
                    src={restuarant?.Logo}
                    alt="Logo"
                  />
                )}{" "}
              </div>
              <p className="lead2">{restuarant?.Name}</p>
              <Link to={`/review/${id}`} className="aReview">
                Show review
              </Link>
              <p className="address">
                {restuarant?.Address},Postcode: {restuarant?.PostCode}
              </p>
            </div>
          </div>
        </section>
        {isAuthenticated ? (
          ""
        ) : (
          <p className="logoname2M">{!loading2 ? restuarant?.Name : ""}</p>
        )}
        <div className="scrollmenu">
          <a onClick={(e) => onClickk(e)}> ALL</a>
          {
            // all menu
            menus?.map((menus) => (
              <Fragment key={menus.id}>
                <a style={{ cursor: "pointer" }}
                  onClick={(e) => onClick(e, menus.id, menus.name)}
                >
                  {menus.name}
                </a>
              </Fragment>
            ))
          }
        </div>
        <Review page={"tabmenu"} id={id} url={restuarant?.Key_ID} />
        <Cart setChangeCartItems={setChangeCartItems} changeCartItems={changeCartItems} id={id} />

        {
          // All dishes in a menu
          Initalstate ? (
            <Fragment>
              {loadingdishes ? null : (
                <Fragment>
                  <div className="rowA">
                    <div className="colA">
                      <div id="accordion" className="tabsA">
                        <div className="tabA">
                          <label className="tabA-label" htmlFor="chck1">
                            All dishes{" "}
                            {collapse === 0 ? (
                              <i className="fas fa-chevron-down"></i>
                            ) : (
                              <i className="fas fa-chevron-right"></i>
                            )}
                          </label>
                          <input
                            type="checkbox"
                            className="inputA"
                            id="chck1"
                            onClick={() => toggleCollapse("chck1", 0)}
                          />
                          {collapse === 0 ? (
                            <Fragment>
                              {" "}
                              <div className="grid-containerUM">
                                {" "}
                                {
                                  //get dishes of a selected menu
                                  aLL_dishes?.map((ALL_dishes) => (
                                    <Fragment key={ALL_dishes.id}>
                                      {/* {console.log(ALL_dishes.id)} */}
                                      <BuyDishes
                                        setChangeCartItems={setChangeCartItems}
                                        key={ALL_dishes.id}
                                        dishes={ALL_dishes}
                                        id={ALL_dishes.id}
                                      />
                                    </Fragment>
                                  ))
                                }
                              </div>
                            </Fragment>
                          ) : (
                            ""
                          )}
                        </div>

                        {menus?.map((menus, i) => (
                          <Fragment>
                            <div className="tabA">
                              <label
                                className="tabA-label"
                                htmlFor={"chck" + menus.name}
                              >
                                {menus.name}{" "}
                                {menus.id === collapse ? (
                                  <i className="fas fa-chevron-down"></i>
                                ) : (
                                  <i className="fas fa-chevron-right"></i>
                                )}
                              </label>
                              <input
                                type="checkbox"
                                className="inputA"
                                id={"chck" + menus.name}
                                onClick={() =>
                                  toggleCollapse("chck" + menus.name, menus.id)
                                }
                              />
                              {menus.id === collapse ? (
                                <div className="tabA-content">
                                  {" "}
                                  <Alldishes
                                   id={menus.id}
                                   setChangeCartItems={setChangeCartItems}
                                   />{" "}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}{" "}
            </Fragment>
          ) : null
        }

        {showdishesEven ? (
          <Fragment>
            <div className="rowA">
              <div className="colA">
                <div id="accordion" className="tabsA">
                  <div className="tabA">
                    <label className="tabA-label" htmlFor={"chck" + MenuName}>
                      {MenuName}{" "}
                      {MenuId === collapse ? (
                        <i className="fas fa-chevron-down"></i>
                      ) : (
                        <i className="fas fa-chevron-right"></i>
                      )}
                    </label>

                    <input
                      type="checkbox"
                      className="inputA"
                      id={"chck" + MenuName}
                      onClick={() => toggleCollapse("chck" + MenuName, MenuId)}
                    />

                    {menus.ìd === collapse ? (
                      <div className="tabA-content">
                        {" "}
                        <Alldishes
                        setChangeCartItems={setChangeCartItems}
                        id={MenuId} />{" "}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : null}

        {showdishesodd ? (
          <div className="rowA">
            <div className="colA">
              <div id="accordion" className="tabsA">
                <div className="tabA">
                  <label className="tabA-label" htmlFor={"chck" + MenuName}>
                    {MenuName}{" "}
                    {MenuId === collapse ? (
                      <i className="fas fa-chevron-down"></i>
                    ) : (
                      <i className="fas fa-chevron-right"></i>
                    )}
                  </label>

                  <input
                    type="checkbox"
                    className="inputA"
                    id={"chck" + MenuName}
                    onClick={() => toggleCollapse("chck" + MenuName, MenuId)}
                  />

                  {menus.id === collapse ? (
                    <div className="tabA-content">
                      {" "}
                      <Alldishes 
                      setChangeCartItems={setChangeCartItems}
                      id={MenuId} />{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    </>
  );
};

export default TabMenu;

import classnames from "classnames";
import React from "react";
import {
  Route,
  Switch, withRouter
} from "react-router-dom";

//icons

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
// import Notifications from "../../pages/notifications";
import Tables from "../../pages/tables";

// context
import { useLayoutState } from "../../context/LayoutContext";
import AddReviewTag from '../../pages/AddReviewTag/AddReviewTag';
import Addveriation from "../../pages/Addvariation/Addveriation";
import CustomerSatisfaction from "../../pages/CustomerSatisfection/CustomerSatisfaction";
import DishHandle from "../../pages/Menu/DishHandle";
import MenuHandle from "../../pages/Menu/MenuHandle";
import AllOrders from "../../pages/Orders/AllOrders";
import ChangePass from "../../pages/ResetPass/ChangePass";
import ShowReviews from "../../pages/showReviews/ShowReviews";
import UpdateRestaurent from "../../pages/UpdateRestaurent/UpdateRestaurent";
function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })} >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Tables} />
            <Route path="/app/menu" component={MenuHandle} />
            <Route path="/app/add-dish/:menuName/:restaurentId/:menuId" component={DishHandle} />
            <Route path="/app/addReview" component={AddReviewTag} />
            <Route path="/app/variation" component={Addveriation} />
            <Route path="/app/reviews" component={CustomerSatisfaction} />
            <Route path="/app/show-reviews" component={ShowReviews} />
            <Route path="/app/all-orders/:keyId/" component={AllOrders} />
            <Route path="/app/changepassword" component={ChangePass} />
            <Route path="/app/updateRestaurent" component={UpdateRestaurent} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);

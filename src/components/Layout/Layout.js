import classnames from "classnames";
import React from "react";
import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages

// context
import { useAuth } from "../../context/AuthContext";
import { useLayoutState } from "../../context/LayoutContext";
import AddReviewTag from '../../pages/AddReviewTag/AddReviewTag';
import Addveriation from "../../pages/Addvariation/Addveriation";
import AdminAllCustomers from "../../pages/Admin/AdminAllCustomers/AdminAllCustomers";
import AdminAllRestaurant from "../../pages/Admin/AdminAllRestaurant/AdminAllRestaurant";
import AdminEditRestaurent from "../../pages/Admin/AdminAllRestaurant/AdminEditRestaurent";
import AdminDashboard from "../../pages/Admin/AdminDashboard/AdminDashboard";
import AdminOrders from "../../pages/Admin/AdminOrders/AdminOrders";
import AdminReviews from "../../pages/Admin/AdminReviews/AdminReviews";
import AdminViewReviews from "../../pages/Admin/AdminReviews/AdminViewReviews";
import CustomerSatisfaction from "../../pages/CustomerSatisfection/CustomerSatisfaction";
import Dashboard from "../../pages/dashboard/Dashboard";
import DishHandle from "../../pages/Menu/DishHandle";
import MenuHandle from "../../pages/Menu/MenuHandle";
import AllOrders from "../../pages/Orders/AllOrders";
import ChangePass from "../../pages/ResetPass/ChangePass";
import RestaurantOrder from "../../pages/RestaurantOrder/RestaurantOrder";
import ShowReviews from "../../pages/showReviews/ShowReviews";
import UpdateRestaurent from "../../pages/UpdateRestaurent/UpdateRestaurent";
import AdminSidebar from "../Sidebar/AdminSidebar";
function Layout(props) {
  var classes = useStyles();
  const { user } = useAuth()

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        {/* ============= SIDEBAR FOR SUPER ADMIN ============= */}
        {user?.type === null && <AdminSidebar />}
        {/* ============= SIDEBAR FOR CUSTOMER ============= */}
        {user?.type !== null && <Sidebar />}
        <div className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })} >
          <div className={classes.fakeToolbar} />
          {/* ============= ROUTE FOR SUPER ADMIN ============= */}
          {
            user?.type === null &&
            <Switch>
              <Route path="/app/dashboard" component={AdminDashboard} />
              <Route path="/app/all-restaurants" component={AdminAllRestaurant} />
              <Route path="/app/edit-single-restaurants/:restaurant_id" component={AdminEditRestaurent} />
              <Route path="/app/view-single-review/:restaurant_id" component={AdminViewReviews} />
              <Route path="/app/all-customers" component={AdminAllCustomers} />
              <Route path="/app/all-orders" component={AdminOrders} />
              <Route path="/app/all-reviews" component={AdminReviews} />
            </Switch>
          }
          {/* ============= ROUTE FOR USERS ============= */}
          {
            user?.type !== null &&
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/menu" component={MenuHandle} />
              <Route path="/app/add-dish/:menuName/:restaurentId/:menuId" component={DishHandle} />
              <Route path="/app/addReview" component={AddReviewTag} />
              <Route path="/app/variation" component={Addveriation} />
              <Route path="/app/reviews" component={CustomerSatisfaction} />
              <Route path="/app/show-reviews" component={ShowReviews} />
              <Route path="/app/all-orders/:keyId/" component={AllOrders} />
              <Route path="/app/changepassword" component={ChangePass} />
              <Route path="/app/updateRestaurent" component={UpdateRestaurent} />
              <Route path="/app/add-order/:order_type" component={RestaurantOrder} />
            </Switch>
          }

        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);

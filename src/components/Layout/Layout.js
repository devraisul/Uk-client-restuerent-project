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
import AddReviewTag from "../../pages/AddReviewTag/AddReviewTag";
import Addveriation from "../../pages/Addvariation/Addveriation";
import CustomerSatisfaction from "../../pages/CustomerSatisfection/CustomerSatisfaction";
import DishHandle from "../../pages/Menu/DishHandle";
import MenuHandle from "../../pages/Menu/MenuHandle";
import ChangePass from "../../pages/ResetPass/ChangePass";
import ShowReviews from "../../pages/showReviews/ShowReviews";
import UpdateRestaurent from "../../pages/UpdateRestaurent/UpdateRestaurent";
import ViewMenu from "../../pages/ViewMenu/ViewMenu";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Tables} />
            {/* <Route path="/app/typography" component={Typography} /> */}
            <Route path="/app/menu" component={MenuHandle} />
            <Route path="/app/add-dish/:menuName/:restaurentId/:menuId" component={DishHandle} />


        



            {/* <Route path="/app/tables" component={Dashboard} /> */}
            <Route path="/app/addReviewTag" component={AddReviewTag} />
            <Route path="/app/variation" component={Addveriation} />
            <Route path="/app/reviews" component={CustomerSatisfaction} />
            <Route path="/app/show-reviews" component={ShowReviews} />
            <Route path="/app/view-menu/:keyId/" component={ViewMenu} />
            <Route path="/app/changepassword" component={ChangePass} />
            <Route path="/app/updateRestaurent" component={UpdateRestaurent} />
            {/* <Route path="/app/notifications" component={Notifications} /> */}
          </Switch>
          {/* <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between" */}

          {/* > */}
          {/* <div>
              <Link
                color={'primary'}
                href={'https://flatlogic.com/'}
                target={'_blank'}
                className={classes.link}
              >
                © 2022 Menu Qr Codes. All Rights Reserved.
              </Link>
            </div> */}
          {/* <div>
              © 2022 Menu Qr Codes. All Rights Reserved.
            </div>
            <div> */}
          {/* <Link
                href={'https://www.facebook.com/flatlogic'}
                target={'_blank'}
              >
                <IconButton aria-label="facebook">
                  <Icon
                    path={FacebookIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                href={'https://twitter.com/flatlogic'}
                target={'_blank'}
              >
                <IconButton aria-label="twitter">
                  <Icon
                    path={TwitterIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                href={'https://github.com/flatlogic'}
                target={'_blank'}
              >
                <IconButton
                  aria-label="github"
                  style={{ marginRight: -12 }}
                >
                  <Icon
                    path={GithubIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link> */}
          {/* Order Booking App
            </div>
          </Box> */}
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);

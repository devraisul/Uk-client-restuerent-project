import { Drawer, IconButton, List } from "@material-ui/core";
import {
  ArrowBack as ArrowBackIcon, BorderAll as TableIcon, BorderOuter, Home as HomeIcon, LockSharp, RateReview, RestaurantMenu, SentimentSatisfied, Web
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { MdBookmarkBorder, MdReviews } from 'react-icons/md';
import { withRouter } from "react-router-dom";
// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import { useAuth } from "../../context/AuthContext";
import {
  toggleSidebar, useLayoutDispatch, useLayoutState
} from "../../context/LayoutContext";



function Sidebar({ location }) {
  const { user } = useAuth()
  const structure = [
    { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
    {
      id: 1,
      label: "Menu",
      link: "/app/menu",
      icon: <RestaurantMenu />,
    },
    { id: 2, label: "Update Restaurent", link: "/app/updateRestaurent", icon: <TableIcon /> },
    {
      id: 3,
      label: "Add Review",
      link: "/app/addReview",
      icon: <RateReview />,
    },
    {
      id: 4,
      label: "Variations",
      link: "/app/variation",
      icon: <BorderOuter />,
    },
    {
      id: 5,
      label: "Show Reviews",
      link: "/app/show-reviews",
      icon: <MdReviews  style={{fontSize:'1.5rem'}} />,
    },
    {
      id: 6,
      label: "All Orders",
      link: `/app/all-orders/${user?.restaurant[0]?.Key_ID}/${user?.restaurant[0]?.id}`,
      icon: <MdBookmarkBorder style={{fontSize:'1.5rem'}} />,
    },
    {
      id: 7,
      label: "View WebPage",
      link: `/usermenu/${user?.restaurant[0]?.Key_ID}?id=${user?.restaurant[0]?.id}`,
      icon: <Web />,
    },
    {
      id: 8,
      label: "Reset Password",
      link: "/app/changepassword",
      icon: <LockSharp />,
    },
    {
      id: 9,
      label: "Customer Satisfac",
      link: "/app/reviews",
      icon: <SentimentSatisfied />,
    }
  ];
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);

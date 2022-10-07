import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  MenuBook,
  RateReview,
  BorderOuter,
  Visibility,
  RestaurantMenu,
  Web,
  LockSharp,
  SentimentSatisfied,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useAuth } from "../../context/AuthContext";



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
      icon: <Visibility />,
    },
    {
      id: 6,
      label: "View Menus",
      link: `/app/view-menu/${user?.restaurant[0]?.Key_ID}/${user?.restaurant[0]?.id}`,
      icon: <MenuBook />,
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

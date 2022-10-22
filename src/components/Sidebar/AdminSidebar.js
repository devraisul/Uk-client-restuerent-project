import { Drawer, IconButton, List } from "@material-ui/core";
import {
  ArrowBack as ArrowBackIcon, Home as HomeIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import { MdOutlineFoodBank, MdOutlineGroup, MdStarHalf } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import {
  toggleSidebar, useLayoutDispatch, useLayoutState
} from "../../context/LayoutContext";



function Sidebar({ location }) {
  const { user } = useAuth()
  const structure = [
    {
      id: 0,
      label: "Dashboard",
      link: "/app/dashboard",
      icon: <HomeIcon />
    },
    {
      id: 1,
      label: "All Restaurants",
      link: "/app/all-restaurants",
      icon: <MdOutlineFoodBank style={{fontSize:'1.6rem'}} />,
    },
    {
      id: 2,
      label: "Customers",
      link: "/app/all-customers",
      icon: <MdOutlineGroup style={{fontSize:'1.6rem'}} />
    },
    {
      id: 3,
      label: "Orders",
      link: "/app/all-orders",
      icon: <RiFileList3Line style={{fontSize:'1.5rem'}} />,
    },
    {
      id: 4,
      label: "Reviews",
      link: "/app/all-reviews",
      icon: <MdStarHalf style={{fontSize:'1.6rem'}} />,
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

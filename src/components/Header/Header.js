import {
  AppBar, Button, IconButton,
  InputBase,
  Menu,
  MenuItem, Toolbar
} from "@material-ui/core";
import {
  ArrowBack as ArrowBackIcon, Menu as MenuIcon,
  Person as AccountIcon,
  Search as SearchIcon
} from "@material-ui/icons";
import classNames from "classnames";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { GoPackage } from 'react-icons/go';
import { IoFastFoodOutline } from 'react-icons/io5';
import { RiEBike2Line } from 'react-icons/ri';

// styles
import './Header.css';
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

// context
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import { useAuth } from "../../context/AuthContext";
import {
  toggleSidebar, useLayoutDispatch, useLayoutState
} from "../../context/LayoutContext";


export default function Header(props) {
  const history = useHistory()
  // FOR POPUP 
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);


  var classes = useStyles();
  const { user, logout } = useAuth()

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);


  const handlePopup = () => {
    setOpen(true)
  }
  return (
    <AppBar position="fixed" style={{
      background: "#0575B4"
    }} className={classes.appBar}>

   
        {/* ORDER POPUP  */}
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="popupContainer">
            <h1 style={{ textAlign: 'center', marginBottom: '50px', color: '#aaa' }}>Choice Your Order Type</h1>
            <Button
              onClick={() => {
                history.push('/app/add-order/eat_in')
                setOpen(false)
              }}
              className='AdminOrderButton'
            >
              <IoFastFoodOutline style={{ marginRight: '30px' }} /> Eat In
            </Button>
            <Button
              onClick={() => {
                history.push('/app/add-order/delivery')
                setOpen(false)
              }}
              className='AdminOrderButton'
            >
              <RiEBike2Line style={{ marginRight: '30px' }} /> Delivery
            </Button>
            <Button
              onClick={() => {
                history.push('/app/add-order/take_away')
                setOpen(false)
              }}
              className='AdminOrderButton'
            >
              <GoPackage style={{ marginRight: '30px' }} /> Take Away
            </Button>
          </div>
        </Popup>



      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Menu Qr Codes
        </Typography>
        <div className={classes.grow} />
        <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>

        <Button
          onClick={handlePopup}
          style={{
            color: '#5CA5CE',
            margin: '0 10px 0 20px',
            fontWeight: 'bold'
          }}>
          <AiOutlinePlusCircle
            style={{
              marginRight: '5px',
              fontSize: '2rem'
            }} />
          Add Order
        </Button>

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {user?.first_Name} {user?.last_Name}
            </Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={logout}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

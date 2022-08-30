import React from "react";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import QRCode from 'qrcode.react';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import { useAuth } from "../../context/AuthContext";
import { getMenu } from "../../Apis/Menu";
import AllMenu from "../Menu/AllMenu/AllMenu";



const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  qrcode: {
    display: "flex",
    justifyContent: "center",
    background: "white",
    marginTop: "20px",
    padding: "30px 0px",
    boxShadow: "0 0 10px 5px rgba(0,0,0,0.1)"
  }
}))

export default function Tables() {
  const { user } = useAuth();
  const classes = useStyles();
  return (
    <>
      <PageTitle title="All Menus" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Menu List" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <AllMenu
              id={user?.restaurant[0].id}
            />
          </Widget>
        </Grid>
      </Grid>
      <Box className={classes.qrcode}>
        <div>
          <h1> QR Code</h1>
          <QRCode value={`https://menuqrcodes.co.uk/System/usermenu/${user?.restaurant[0]?.Key_ID}/${user?.restaurant[0]?.id}`} />
        </div>
      </Box>
    </>
  );
}

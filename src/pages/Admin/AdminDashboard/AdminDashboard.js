import {
  Grid
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAllRestaurent } from "../../../Apis/Restaurent";
import PageTitle from "../../../components/PageTitle";
import BigStat from "../../dashboard/components/BigStat/BigStat";
import './AdminDashboard.css';


export default function AdminDashboard() {
  const [TotalRestaurent, setTotalRestaurent] = useState([])


  const bigStat = [
    {
      product: "Orders",
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false }
      },
      color: "primary",
    },
    {
      product: "Registrations",
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true }
      },
      color: "warning",
    },
    {
      product: "Customers",
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true }
      },
      color: "secondary",
    }
  ]


  useEffect(() => {
    getAllRestaurent().then(res => {
      // setTotalRestaurent(res?.restaurant.length)
    }
    ).catch(err => console.log(err))
  }, [])


  const [countRestaurant, setCountRestaurant] = useState({
    current: 143,
    previous: 40
  })

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        {bigStat.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))}
      </Grid>
    </>

  )
}
// ====================================================================== 
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}
function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}

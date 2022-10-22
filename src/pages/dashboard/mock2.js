const mock2 = {

    bigStat: [
      {
        product: "Today Orders",
        total: {
          monthly: 4232,
          weekly: 1465,
          daily: 199,
          percent: { value: 3.7, profit: false }
        },
        color: "primary",
        registrations: {
          monthly: { value: 830, profit: false },
          weekly: { value: 215, profit: true },
          daily: { value: 33, profit: true }
        },
        bounce: {
          monthly: { value: 4.5, profit: false },
          weekly: { value: 3, profit: true },
          daily: { value: 3.25, profit: true }
        }
      },
      {
        product: "Today Sale",
        total: {
          monthly: 754,
          weekly: 180,
          daily: 27,
          percent: { value: 2.5, profit: true }
        },
        color: "warning",
        registrations: {
          monthly: { value: 32, profit: true },
          weekly: { value: 8, profit: true },
          daily: { value: 2, profit: false }
        },
        bounce: {
          monthly: { value: 2.5, profit: true },
          weekly: { value: 4, profit: false },
          daily: { value: 4.5, profit: false }
        }
      },
      {
        product: "Today Review",
        total: {
          monthly: 1025,
          weekly: 301,
          daily: 44,
          percent: { value: 3.1, profit: true }
        },
        color: "secondary",
        registrations: {
          monthly: { value: 230, profit: true },
          weekly: { value: 58, profit: false },
          daily: { value: 15, profit: false }
        },
        bounce: {
          monthly: { value: 21.5, profit: false },
          weekly: { value: 19.35, profit: false },
          daily: { value: 10.1, profit: true }
        }
      }
    ],

  };
  
  export default mock2;
export const lineData = {
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales",
        data: [100, 200, 150, 300, 250],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        tention: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
  },
};

export const barData = {
  data: {
    labels: [
      "Product A",
      "Product B",
      "Product C",
      "Product D",
      "Product E",
      "Product F",
      "Product G",
    ],

    datasets: [
      {
        label: "Products Performance",
        data: [320, 1137, 322, 2776, 553, 2225, 3432],
        borderColor: "blue",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

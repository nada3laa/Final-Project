import React from "react";
import Chart from "react-apexcharts";
import { Paper, Typography, Box } from "@mui/material";

const CustomerReview = () => {
  const data = {
    series: [
      {
        name: "Review",
        data: [10, 50, 30, 90, 40, 120, 100],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
        background: "#f4f5f7", // Light background color for chart
      },
      fill: {
        colors: ["#76c7c0"], // Soft gradient color
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#1a73e8"], // Smooth line with custom color
      },
      grid: {
        borderColor: "#e0e0e0", // Light grid color
        strokeDashArray: 5, // Dashed grid lines
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
        labels: {
          style: {
            colors: "#6b7280", // Greyed-out label colors
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6b7280",
            fontSize: "12px",
          },
        },
      },
      tooltip: {
        theme: "dark", // Dark-themed tooltips for contrast
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      toolbar: {
        show: false,
      },
    },
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#f0f2f5' // Light background for the whole page
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: '20px', 
          borderRadius: '10px', 
          maxWidth: '900px', 
          width: '100%',
          backgroundColor: '#fff' // Paper background for chart container
        }}
      >
        <Typography variant="h5" gutterBottom align="center" sx={{ color: '#333' }}>
          Customer Reviews Over Time
        </Typography>
        <Chart options={data.options} series={data.series} type="area" height="400" />
      </Paper>
    </Box>
  );
};

export default CustomerReview;

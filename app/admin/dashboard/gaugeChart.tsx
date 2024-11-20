"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

type GaugeChartProps = {
  value: number;
  label: string;
};

const GaugeChart: React.FC<GaugeChartProps> = ({ value, label }) => {
  const option = {
    tooltip: { formatter: `{a} <br/>{b}: {c}` },
    series: [
      {
        name: label,
        type: "gauge",
        detail: { formatter: "{value}" },
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.3, "#FF4500"], // Red
              [0.7, "#FFD700"], // Yellow
              [1, "#32CD32"], // Green
            ],
          },
        },
        axisLabel: {
          show: false, // Hide inner numbers
        },
        data: [{ value, name: label }],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{
        width: "100%", // Full width of the container
        height: "400px", // Adjust height as needed
      }}
    />
  );
};

export default GaugeChart;

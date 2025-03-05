import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const pieData = [
  { label: "35%", value: 35, color: "#E67E22" }, // Orange
  { label: "20%", value: 20, color: "#2ECC71" }, // Green
  { label: "15%", value: 15, color: "#F4D03F" }, // Yellow
  { label: "30%", value: 30, color: "#FFFFFF" }, // White
];

function GraphSection() {
  return (
    <div className="bg-transparent text-white flex flex-col items-center py-10 px-5">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#FF7401]">
          A problem we can solve together!
        </h2>
        <p className="text-lg mt-2">
          Take a step towards ending food wastage – Donate or request food
          effortlessly!
        </p>
      </div>

      {/* Pie Chart Section */}
      <div className="flex flex-col items-center mt-10">
        <PieChart
          series={[
            {
              data: pieData,
              innerRadius: 60,
              outerRadius: 100,
              paddingAngle: 2,
              cornerRadius: 5,
              cx: 150,
              color: pieData.map((item) => item.color),
            },
          ]}
          width={300}
          height={300}
          slotProps={{
            legend: { hidden: true },
          }}
        />
        <p className=" text-sm">Reasons for Food Waste</p>
      </div>

      {/* Impact Section */}
      <div className="mt-2 text-center">
        <h3 className="text-2xl font-semibold text-[#FF7401]">
          Impact In Numbers:
          <span className="text-white text-3xl font-bold mx-2">13342</span>+
          Meals Donated
        </h3>
      </div>
    </div>
  );
}

export default GraphSection;

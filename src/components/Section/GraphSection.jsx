import React from "react";
import BarChart from '../../statics_components/BarChart';
import PieChart from '../../statics_components/PieChart';

// Example/mock data for BarChart
const barChartData = [
  { year: 2020, hunger: 190, foodWaste: 68, foodWasteUnit: 'Million Tonnes' },
  { year: 2021, hunger: 185, foodWaste: 70, foodWasteUnit: 'Million Tonnes' },
  { year: 2022, hunger: 180, foodWaste: 72, foodWasteUnit: 'Million Tonnes' },
  { year: 2023, hunger: 175, foodWaste: 74, foodWasteUnit: 'Million Tonnes' },
  { year: 2024, hunger: 170, foodWaste: 75, foodWasteUnit: 'Million Tonnes' },
];

// Example/mock data for PieChart
const pieChartData = {
  year: 2024,
  sourceBreakdown: {
    'Overproduction & Overserving': 35,
    'Improper Storage': 20,
    'Expiration & Best-Before Dates': 15,
    'Aesthetic Standards & Rejection': 30,
  }
};

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

      {/* Charts Section */}
      <div className="w-full flex flex-col lg:flex-row gap-8 justify-center items-center mt-10">
        <div className="w-full max-w-xl">
          <BarChart data={barChartData} region="India" />
        </div>
        <div className="w-full max-w-md">
          <PieChart data={pieChartData} region="India" />
        </div>
      </div>

      {/* Impact Section */}
      <div className="mt-8 text-center">
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

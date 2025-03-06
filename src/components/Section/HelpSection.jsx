import React from "react";

// Import images manually (if using local images)
// import sandwichImg from "../../assets/sandwich.png";
// import thaliImg from "../../assets/thali.png";
// import eggBreakfastImg from "../../assets/egg_breakfast.png";
// import rollsImg from "../../assets/rolls_puffs.png";
// import saladImg from "../../assets/salad.png";
// import biryaniImg from "../../assets/biryani.png";

import newYorkImg from "../../assets/newyork.png";
import malaysiaImg from "../../assets/malaysia.png";
import pakistanImg from "../../assets/pakistan.png";
import kenyaImg from "../../assets/kenya.png";
import canadaImg from "../../assets/canada.png";
import indiaImg from "../../assets/india.png";

function HelpSection() {
  return (
    <div className="bg-transparent text-white py-10 px-5 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#FF7401]">
          Help where it matters most
        </h2>
        <p className="text-lg mt-2">
          Your Extra Food Can Be Someone’s Next Meal! — Don’t Waste, Just Share
        </p>
      </div>

      {/* Nearby Meals for Donation */}
      <div className="mt-10 w-full max-w-5xl">
        <h3 className="text-xl font-semibold text-[#FF7401] text-center">
          Nearby Meals for Donation
        </h3>
        <div className="flex flex-wrap justify-center gap-8 mt-5">
          {[
            { name: "Home-cooked Meals", img: "" },
            { name: "Restaurant Surplus Food", img: "" },
            { name: "Packed Meals", img: "" },
            { name: "Fresh Produce", img: "" },
            { name: "Healthy Meals", img: "" },
            { name: "Special Meals", img: "" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <p className="mt-2 text-sm">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hunger Hotspots Around You */}
      <div className="mt-10 w-full max-w-5xl">
        <h3 className="text-xl font-semibold text-[#FF7401] text-center">
          Hunger Hotspots Around You
        </h3>
        <div className="flex flex-wrap justify-center gap-8 mt-5">
          {[
            { name: "New York", img: newYorkImg},
            { name: "Malaysia", img: malaysiaImg },
            { name: "Pakistan", img: pakistanImg },
            { name: "Kenya", img: kenyaImg },
            { name: "Canada", img: canadaImg },
            { name: "India", img: indiaImg },
          ].map((location, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                <img src={location.img} alt={location.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <p className="mt-2 text-sm">{location.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HelpSection;

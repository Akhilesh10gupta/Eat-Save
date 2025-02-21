import React from "react";
import "./Heading.css"; // Ensure to include the CSS file


function Heading() {
    return (

    <div className=" bg-[#D7DAF5] p-2 border-t border-black w-full overflow-hidden flex items-center">
        <div className=" font-bold text-orange-600 text-lg md:text-2xl flex-shrink-0 mr-4">
            Facts & Stats
        </div>
        <div className="marquee-container " >
            <div className="marquee-content text-black text-sm md:text-lg">
            Hunger and food wastage scrolling data will be shown here. Global and National data from API.
            </div>
        </div>
    </div>
    );
}

export default Heading;
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HelpSection2() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/browse/donations`, {
        headers: {
          'EXTRABITE-API-KEY': import.meta.env.VITE_API_KEY,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      setDonations(data);
    } catch (error) {
      console.error("Failed to fetch donations:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-transparent text-white py-10 px-5 flex flex-col items-center mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#FF7401]">
          Help where it matters most
        </h2>
        <p className="text-lg mt-2">
          Your Extra Food Can Be Someone’s Next Meal! — Don’t Waste, Just Share
        </p>
      </div>

      <div className="mt-10 w-full max-w-6xl">
        <h3 className="text-xl font-semibold text-[#FF7401] text-center mb-4">
          Nearby Meals for Donation
        </h3>

        {loading ? (
          <p className="text-center text-gray-300">Loading nearby donations...</p>
        ) : donations.length === 0 ? (
          <p className="text-center text-gray-300">No donations available at the moment.</p>
        ) : (
          <Slider {...settings}>
            {donations.map((item, index) => (
              <div key={index} className="px-3">
                <div className="bg-white text-black rounded-xl shadow-lg p-4 h-full flex flex-col items-center justify-between">
                  <img
                    src={`https://source.unsplash.com/300x200/?food,meal&sig=${index}`}
                    alt={item.foodName}
                    className="rounded-md w-full h-40 object-cover mb-3"
                  />
                  <h4 className="text-lg font-bold text-[#FF7401]">{item.foodName}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                  <p className="text-sm">Donor: {item.donorName}</p>
                  <p className="text-sm">Location: {item.location}</p>
                </div>
              </div>
            ))}
          </Slider>
        )}

        <div className="mt-6 text-center">
            <a
                href="/browse-more"
                className="inline-block bg-[#FF7401] hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
                Browse More
            </a>
        </div>

      </div>
    </div>
  );
}

export default HelpSection2;
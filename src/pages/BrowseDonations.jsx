import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav2 from "../components/Header/Nav2";
import Heading from "../components/Header/Heading";
import Footer from "../components/Footer/Footer";

const BrowseDonations = () => {
  const [donations, setDonations] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    foodName: "",
    location: "",
    free: "",
    status: "AVAILABLE",
  });

  const navigate = useNavigate();

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/browse/donations`,
        {
          headers: {
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setDonations(response.data);
      setAllResults(response.data); // backup for filtering
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = [...allResults];

    if (filters.foodName) {
      filtered = filtered.filter((item) =>
        item.foodName.toLowerCase().includes(filters.foodName.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((item) =>
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.free === "true") {
      filtered = filtered.filter((item) => item.free === true);
    } else if (filters.free === "false") {
      filtered = filtered.filter((item) => item.free === false);
    }

    if (filters.status) {
      filtered = filtered.filter((item) => item.status === filters.status);
    }

    setDonations(filtered);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const getFilterSummary = () => {
    const type = filters.free === "true" ? "Free" : filters.free === "false" ? "Paid" : "All";
    const status = filters.status || "All";
    return `Showing: ${type} & ${status} Donations`;
  };

  return (
    <>
      <Heading />
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen text-white font-sans">
        <Nav2 />
        <div className="px-4 sm:px-10 pt-10">
          <h1 className="text-3xl font-bold text-[#FF7401] mb-2 text-center">
            Browse Available Donations
          </h1>

          {/* Filter Summary */}
          <p className="text-sm text-center text-gray-300 mb-4">{getFilterSummary()}</p>

          {/* Filter UI */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-2xl max-w-5xl mx-auto text-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Food Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                value={filters.foodName}
                onChange={(e) => setFilters({ ...filters, foodName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Location"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
              <select
                className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                value={filters.free}
                onChange={(e) => setFilters({ ...filters, free: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="true">Free</option>
                <option value="false">Paid</option>
              </select>
              <select
                className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="AVAILABLE">Available</option>
                <option value="CLAIMED">Claimed</option>
                <option value="EXPIRED">Expired</option>
              </select>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleSearch}
                className="bg-[#FF7401] hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Donations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-2 pb-20">
            {loading ? (
              <p className="text-center col-span-full text-gray-300">Loading donations...</p>
            ) : donations.length === 0 ? (
              <p className="text-center col-span-full text-gray-300">No donations found.</p>
            ) : (
              donations.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (item.status === "AVAILABLE") {
                      navigate(`/request-donation/${item.id}`);
                    }
                  }}
                  className={`bg-white text-black rounded-2xl shadow-xl p-5 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl ${
                    item.status === "AVAILABLE" ? "cursor-pointer" : "opacity-50 pointer-events-none"
                  }`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1589308078054-832b5f70a3e3?auto=format&fit=crop&w=500&q=80"
                    alt={item.foodName}
                    className="rounded-lg w-full h-40 object-cover mb-4"
                  />
                  <h4 className="text-xl font-bold text-[#FF7401] mb-2">{item.foodName}</h4>
                  <p className="text-sm text-gray-700 mb-1">{item.description}</p>
                  <p className="text-sm">
                    Quantity: <span className="font-semibold">{item.quantity}</span>
                  </p>
                  <p className="text-sm">
                    Free: <span className="font-semibold">{item.free ? "Yes" : "No"}</span>
                  </p>
                  {!item.free && (
                    <p className="text-sm">
                      Price: <span className="font-semibold">₹{item.price}</span>
                    </p>
                  )}
                  <p className="text-sm">
                    Location: <span className="font-semibold">{item.location}</span>
                  </p>
                  <p className="text-sm">
                    Delivery: <span className="font-semibold">{item.deliveryType}</span>
                  </p>
                  <p className="text-sm">
                    Donor: <span className="font-semibold">{item.donorName}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BrowseDonations;

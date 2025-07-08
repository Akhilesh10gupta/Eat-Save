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
    foodType: "",
    sort: "ENDING_SOON",
  });
  const [timerTick, setTimerTick] = useState(Date.now());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 donations per page

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

      const now = new Date();

      const availableOnly = response.data
        .filter((d) => d.status === "AVAILABLE")
        .map((item) => {
          let countdownTime = item.countdownTime;

          if (item.foodType !== "RAW" && item.createdAt) {
            const createdAt = new Date(item.createdAt);
            const expiryTime = new Date(createdAt.getTime() + 4 * 60 * 60 * 1000);
            countdownTime = Math.max(Math.floor((expiryTime - now) / 1000), 0);
          }

          return {
            ...item,
            countdownTime,
          };
        });

      setDonations(availableOnly);
      setAllResults(availableOnly);
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

    if (filters.foodType) {
      filtered = filtered.filter((item) => item.foodType === filters.foodType);
    }

    if (filters.sort === "ENDING_SOON") {
      filtered.sort((a, b) => (a.countdownTime || Infinity) - (b.countdownTime || Infinity));
    } else if (filters.sort === "LATEST") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setDonations(filtered);
  };

  const getExpiryTime = (item) => {
    if (item.expiryDateTime) {
      return new Date(item.expiryDateTime).getTime();
    }
    if (item.foodType === "PRECOOKED" && item.createdAt) {
      return new Date(item.createdAt).getTime() + 4 * 60 * 60 * 1000;
    }
    if (item.createdAt) {
      return new Date(item.createdAt).getTime() + 24 * 60 * 60 * 1000;
    }
    return null;
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [filters, allResults]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerTick(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination logic
  const totalPages = Math.ceil(donations.length / itemsPerPage);
  const paginatedDonations = donations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getFilterSummary = () => {
    const type = filters.foodType || "All";
    return `Showing: ${type} Donations`;
  };

  const formatCountdown = (seconds) => {
    if (!seconds || seconds <= 0) return "Expired";
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
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

          <p className="text-sm text-center text-gray-300 mb-4">{getFilterSummary()}</p>

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
                value={filters.foodType}
                onChange={(e) => setFilters({ ...filters, foodType: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="PRECOOKED">Pre-cooked</option>
                <option value="RAW">Raw</option>
              </select>
              <select
                className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              >
                <option value="ENDING_SOON">Ending Soon</option>
                <option value="LATEST">Oldest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-2 pb-20">
            {loading ? (
              <p className="text-center col-span-full text-gray-300">Loading donations...</p>
            ) : donations.length === 0 ? (
              <p className="text-center col-span-full text-gray-300">No donations found.</p>
            ) : (
              paginatedDonations.map((item, index) => {
                let timerCountLeft = null;
                if (item.timer) {
                  const created = new Date(item.createdDateTime).getTime();
                  const now = timerTick;
                  const passedTime = Math.floor((now - created) / 1000);
                  timerCountLeft = Math.max(item.countdownTime - passedTime, 0);
                }
                // Debug log for timer
                if (item.timer) {
                  console.log('TIMER DEBUG', {
                    id: item.id,
                    createdDateTime: item.createdDateTime,
                    countdownTime: item.countdownTime,
                    timerCountLeft,
                    now: new Date(timerTick).toISOString(),
                  });
                }
                return (
                  <div
                    key={index}
                    onClick={() => navigate(`/request-donation/${item.id}`)}
                    className="bg-white text-black rounded-2xl shadow-xl p-5 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.foodName}
                      className="rounded-lg w-full h-40 object-cover mb-4"
                    />
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold text-[#FF7401]">{item.foodName}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.foodType === "RAW"
                            ? "bg-green-200 text-green-800"
                            : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {item.foodType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{item.description}</p>
                    <p className="text-sm">
                      Quantity: <span className="font-semibold">{item.quantity}</span>
                    </p>
                    <p className="text-sm">
                      Free:{" "}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.isFree === true || item.price === 0 || item.price === null || item.price === undefined
                            ? "bg-green-200 text-green-800"
                            : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {item.isFree === true || item.price === 0 || item.price === null || item.price === undefined ? "Yes" : "No"}
                      </span>
                    </p>
                    {!item.isFree && item.price > 0 && (
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
                    {item.timer && (
                      timerCountLeft > 0 ? (
                        <p className="text-sm">
                          Time Left: <span className="font-semibold text-red-600">{formatCountdown(timerCountLeft)}</span>
                        </p>
                      ) : (
                        <p className="text-sm text-red-600 font-semibold">Expired</p>
                      )
                    )}
                  </div>
                );
              })
            )}
          </div>
          {/* Pagination Controls */}
          {!loading && donations.length > itemsPerPage && (
            <div className="flex justify-center items-center space-x-2 my-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-orange-700 text-white' : 'bg-gray-200 text-black hover:bg-orange-300'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BrowseDonations;

// src/pages/MyOrder.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav2 from "../components/Header/Nav2";
import Footer from "../components/Footer/Footer";
import Heading from "../components/Header/Heading";

const MyOrder = () => {
  const [viewType, setViewType] = useState("requests");
  const [filter, setFilter] = useState("ALL");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otpInputs, setOtpInputs] = useState({});
  const [pickupCodes, setPickupCodes] = useState({});

  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/requests/my-sent-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setData(res.data);
    } catch (err) {
      console.error("Error loading requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReceivedRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/requests/my-received-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setData(res.data);
    } catch (err) {
      console.error("Error loading received requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = () => {
    setLoading(true);
    if (viewType === "requests") fetchRequests();
    else fetchReceivedRequests();
  };

  useEffect(() => {
    fetchData();
  }, [viewType]);

  const acceptRequest = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("Request accepted. OTP sent to receiver.");
      fetchData();
    } catch (error) {
      alert("Failed to accept request.");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("Request rejected.");
      fetchData();
    } catch (error) {
      alert("Failed to reject request.");
    }
  };

  const confirmPickup = async (id) => {
    const otp = otpInputs[id];
    if (!otp) return alert("Please enter OTP");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${id}/confirm-pickup`,
        { pickupCode: otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      alert("Pickup confirmed successfully!");
      fetchData();
    } catch (error) {
      alert("Failed to confirm pickup.");
    }
  };

  const getPickupCode = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/requests/${id}/pickup-code`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
          },
        }
      );
      setPickupCodes((prev) => ({ ...prev, [id]: res.data }));
    } catch (err) {
      alert("Failed to fetch OTP.");
    }
  };

  const statusGroups = {
    ONGOING: ["PENDING", "ACCEPTED", "AWAITING_PICKUP"],
    COMPLETED: ["COMPLETED"],
    CANCELLED: ["REJECTED", "CANCELLED"],
    ALL: [],
  };

  const filteredData =
    filter === "ALL"
      ? data
      : data.filter((item) => statusGroups[filter].includes(item.status));

  return (
    <>
      <Heading />
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen text-white">
        <Nav2 />
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-[#FF7401] mb-10 text-center">
            My {viewType === "requests" ? "Requests" : "Donations"}
          </h1>

          {/* Filters - Improved styling */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <select
              className="p-3 text-lg rounded-xl bg-white text-black border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
            >
              <option value="requests">My Requests</option>
              <option value="donations">My Donations</option>
            </select>
            <select
              className="p-3 text-lg rounded-xl bg-white text-black border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center text-gray-300">Loading...</p>
          ) : filteredData.length === 0 ? (
            <p className="text-center text-gray-300">No data found.</p>
          ) : (
            <div className="space-y-6">
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white text-black rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5"
                >
                  <h3 className="text-xl font-semibold text-[#FF7401] mb-2">
                    {item.foodName}
                  </h3>
                  <p className="text-sm mb-1">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-bold px-2 py-1 rounded ${
                        item.status === "PENDING"
                          ? "text-yellow-800 bg-yellow-200"
                          : item.status === "ACCEPTED"
                          ? "text-blue-800 bg-blue-200"
                          : item.status === "AWAITING_PICKUP"
                          ? "text-purple-800 bg-purple-200"
                          : item.status === "COMPLETED"
                          ? "text-green-800 bg-green-200"
                          : "text-red-800 bg-red-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Payment Method:</strong> {item.paymentMethod || "-"}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>
                      {viewType === "requests" ? "Requested" : "Received"} On:
                    </strong>{" "}
                    {new Date(item.requestDate || item.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>
                      {viewType === "requests" ? "Donor" : "Receiver"}:
                    </strong>{" "}
                    {item.donorName || item.receiverName || "-"}
                  </p>

                  {/* Donor Controls */}
                  {viewType === "donations" && item.status === "PENDING" && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => acceptRequest(item.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectRequest(item.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {viewType === "donations" &&
                    item.status === "AWAITING_PICKUP" && (
                      <div className="mt-4">
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          className="border p-2 rounded w-full mb-2"
                          value={otpInputs[item.id] || ""}
                          onChange={(e) =>
                            setOtpInputs((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                        />
                        <button
                          onClick={() => confirmPickup(item.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Confirm Pickup
                        </button>
                      </div>
                    )}

                  {/* Receiver OTP */}
                  {viewType === "requests" &&
                    item.status === "AWAITING_PICKUP" && (
                      <div className="mt-4">
                        <button
                          onClick={() => getPickupCode(item.id)}
                          className="bg-purple-600 text-white px-4 py-2 rounded"
                        >
                          Show OTP
                        </button>
                        {pickupCodes[item.id] && (
                          <p className="mt-2 text-lg font-bold">
                            Pickup OTP:{" "}
                            <span className="text-green-600">
                              {pickupCodes[item.id]}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyOrder;

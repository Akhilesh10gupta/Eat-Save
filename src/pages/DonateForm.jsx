import React, { useState } from "react";
import axios from "axios";
import Nav2 from "../components/Header/Nav2";
import Heading from "../components/Header/Heading";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const DonationForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    quantity: "",
    expiryDateTime: "",
    free: true,
    price: 0,
    location: "",
    geolocation: "",
    deliveryType: "SELF_PICKUP"
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val =
      name === "free" ? JSON.parse(value) : type === "checkbox" ? e.target.checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
      ...(name === "free" && { price: val ? 0 : "" })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Login required");
        return;
      }

      if (!formData.free && (!formData.price || parseFloat(formData.price) <= 0)) {
        alert("Please enter a valid price greater than 0 for paid food.");
        return;
      }

      const payload = {
        foodName: formData.foodName,
        description: formData.description,
        quantity: formData.quantity,
        expiryDateTime: formData.expiryDateTime,
        free: formData.free,
        price: formData.free ? 0 : parseFloat(formData.price),
        location: formData.location,
        geolocation: formData.geolocation,
        deliveryType: formData.deliveryType
      };

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/donations`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Donation submitted successfully!");
      navigate("/home2");
    } catch (err) {
      alert("Donation failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <Heading />
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav2 />
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            {step === 1 ? "Donate Food" : "Food Details"}
          </h1>
          <div className="w-full border-t-2 border-[#FF7401] mt-1"></div>
        </div>

        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md"
          >
            {step === 1 && (
              <>
                <h2 className="text-center text-xl sm:text-2xl font-bold text-[#FF7401] mb-6">
                  Donor Detail
                </h2>
                <div className="mx-7">
                  <input
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Pickup Address"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base"
                  />
                </div>
                <div className="mx-7">
                  <input
                    name="geolocation"
                    type="text"
                    value={formData.geolocation}
                    onChange={handleChange}
                    placeholder="Geolocation (lat,long)"
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base"
                  />
                </div>
                <div className="mx-7 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    Next &gt;&gt;
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-center text-xl sm:text-2xl font-bold text-[#FF7401] mb-6">
                  Food Details
                </h2>
                <div className="mx-7">
                  <input
                    name="foodName"
                    type="text"
                    value={formData.foodName}
                    onChange={handleChange}
                    placeholder="Food Name"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base"
                  />
                </div>
                <div className="mx-7">
                  <input
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base"
                  />
                </div>
                <div className="mx-7">
                  <input
                    name="quantity"
                    type="text"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base"
                  />
                </div>
                <div className="mx-7 mb-1">
                  <label className="text-sm text-gray-700 font-medium">
                    Select expiry time for donation:
                  </label>
                </div>
                <div className="relative mx-7">
                  <input
                    name="expiryDateTime"
                    type="datetime-local"
                    value={formData.expiryDateTime}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none text-sm sm:text-base"
                  />
                </div>
                <div className="mx-7 mb-4 mt-4">
                  <label className="block mb-1">Is the food free?</label>
                  <select
                    name="free"
                    value={formData.free}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none"
                  >
                    <option value={true}>Yes (Free)</option>
                    <option value={false}>No (Paid)</option>
                  </select>
                </div>
                {!formData.free && (
                  <div className="mx-7">
                    <input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base"
                    />
                  </div>
                )}
                <div className="mx-7 mb-4">
                  <label className="block mb-1">Delivery Type</label>
                  <select
                    name="deliveryType"
                    value={formData.deliveryType}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none"
                  >
                    <option value="SELF_PICKUP">Self Pickup</option>
                    <option value="DELIVERY_PARTNER">Delivery Partner</option>
                    <option value="ANY">Any</option>
                  </select>
                </div>
                <div className="mx-7">
                  <button
                    type="submit"
                    className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DonationForm;

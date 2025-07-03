import { useState, useEffect } from "react";
import axios from "axios";
import Nav2 from "../components/Header/Nav2";
import Heading from "../components/Header/Heading";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import useGeolocation from "../util/useGeolocation";

const DonationForm = () => {
  const navigate = useNavigate();
  const { latitude, longitude, address, loading } = useGeolocation();
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    quantity: "",
    expiryDateTime: "",
    isFree: true,
    price: "",
    location: "",
    geolocation: "",
    deliveryType: "SELF_PICKUP",
    foodType: "PRECOOKED",
    refrigerationAvailable: false,
  });

  useEffect(() => {
    if (!loading) {
      setFormData((prev) => ({
        ...prev,
        location: prev.location || address || "",
        geolocation:
          latitude && longitude ? `${latitude},${longitude}` : "",
      }));
    }
  }, [address, latitude, longitude, loading]);

  function extractPinCode(address) {
    const match = address && address.match(/\b\d{6}\b/);
    return match ? match[0] : null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = value;

    if (type === "checkbox") val = checked;
    if (name === "isFree") val = value === "true";
    if (name === "refrigerationAvailable") val = value === "true";
    if (name === "foodType") {
      setFormData((prev) => ({ ...prev, refrigerationAvailable: false }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
      ...(name === "isFree" && { price: val ? "" : prev.price }),
    }));

    if (name === "location") setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.foodName ||
      !formData.description ||
      !formData.quantity ||
      !formData.expiryDateTime ||
      !formData.location ||
      !formData.foodType
    ) {
      setErrorMsg("Please fill all required fields.");
      return;
    }

    if (!extractPinCode(formData.location)) {
      setErrorMsg("A valid 6-digit pin code is required in the Pickup Address.");
      return;
    }

    if (!formData.isFree && (!formData.price || parseFloat(formData.price) <= 0)) {
      setErrorMsg("Please enter a valid price greater than 0 for paid food.");
      return;
    }

    if (
      formData.foodType === "PRECOOKED" &&
      typeof formData.refrigerationAvailable !== "boolean"
    ) {
      setErrorMsg("Please specify refrigeration availability for precooked food.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Login required");
        navigate("/signin");
        return;
      }

      const payload = {
        foodName: formData.foodName,
        description: formData.description,
        quantity: formData.quantity,
        expiryDateTime: formData.expiryDateTime,
        free: formData.isFree, // ✅ fixed key here
        price: formData.isFree ? 0.0 : parseFloat(formData.price),
        location: formData.location,
        geolocation: formData.geolocation,
        deliveryType: formData.deliveryType,
        foodType: formData.foodType,
        refrigerationAvailable:
          formData.foodType === "PRECOOKED"
            ? formData.refrigerationAvailable
            : undefined,
      };
      
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/donations`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "EXTRABITE-API-KEY": import.meta.env.VITE_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Donation submitted successfully!");
      navigate("/home2");
    } catch (err) {
      console.error("Error submitting donation:", err.response?.data || err);
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
            Donate Food
          </h1>
          <div className="w-full border-t-2 border-[#FF7401] mt-1"></div>
        </div>

        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md"
          >
            <h2 className="text-center text-xl sm:text-2xl font-bold text-[#FF7401] mb-6">
              Donor Detail
            </h2>

            {/* Food Name */}
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

            {/* Description */}
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

            {/* Quantity */}
            <div className="mx-7">
              <input
                name="quantity"
                type="text"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity (e.g., 2 plates)"
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base"
              />
            </div>

            {/* Expiry DateTime */}
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

            {/* Is Free */}
            <div className="mx-7 mb-4 mt-4">
              <label className="block mb-1">Is the food free?</label>
              <select
                name="isFree"
                value={formData.isFree}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 outline-none"
              >
                <option value={true}>Yes (Free)</option>
                <option value={false}>No (Paid)</option>
              </select>
            </div>

            {/* Price */}
            {!formData.isFree && (
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

            {/* Food Type */}
            <div className="mx-7 mb-4">
              <label className="block mb-1">Food Type</label>
              <select
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 outline-none"
              >
                <option value="PRECOOKED">Pre-cooked</option>
                <option value="RAW">Raw</option>
              </select>
            </div>

            {/* Refrigeration Available */}
            {formData.foodType === "PRECOOKED" && (
              <div className="mx-7 mb-4">
                <label className="block mb-1">Is refrigeration available?</label>
                <select
                  name="refrigerationAvailable"
                  value={formData.refrigerationAvailable}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            )}

            {/* Pickup Address */}
            <div className="mx-7">
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Pickup Address"
                required
                className={`w-full border rounded-lg p-3 mb-4 outline-none text-sm sm:text-base ${
                  extractPinCode(formData.location)
                    ? "border-gray-300"
                    : "border-red-500 ring-2 ring-red-500"
                }`}
              />
            </div>
            {!extractPinCode(formData.location) && (
              <div className="text-red-600 mb-2 text-sm">
                A valid 6-digit pin code is required in the Pickup Address.
              </div>
            )}
            {errorMsg && (
              <div className="text-red-600 mb-2 text-sm">{errorMsg}</div>
            )}

            {/* Geolocation */}
            <div className="mx-7">
              <input
                name="geolocation"
                type="text"
                value={loading ? "Detecting location..." : formData.geolocation}
                placeholder="Geolocation (lat,long)"
                readOnly
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base"
              />
            </div>

            {/* Delivery Type */}
            <div className="mx-7 mb-4">
              <label className="block mb-1">Delivery Type</label>
              <select
                name="deliveryType"
                value={formData.deliveryType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none"
              >
                <option value="SELF_PICKUP">Self Pickup</option>
                <option value="DELIVERY_PARTNER">Delivery Partner</option>
                <option value="ANY">Any</option>
              </select>
            </div>

            {/* Submit */}
            <div className="mx-7 mt-6">
              <button
                type="submit"
                className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DonationForm;

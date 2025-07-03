import donationImg from '../../assets/handfood.jpg';
import useGeolocation from '../../util/useGeolocation';
import { useState, useEffect } from 'react';

const HeroSection2 = () => {
  const { address, loading } = useGeolocation();
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Autofill with geolocation address if empty
  useEffect(() => {
    if (!loading && address && !location) {
      setLocation(address);
    }
  }, [address, loading]);

  // Helper: Extract 6-digit pin code from address string
  function extractPinCode(addr) {
    const match = addr && addr.match(/\b\d{6}\b/);
    return match ? match[0] : null;
  }

  const handleGetStarted = (e) => {
    if (!extractPinCode(location)) {
      setErrorMsg('A valid 6-digit pin code is required in your address.');
      e.preventDefault();
      return;
    }
    setErrorMsg('');
    // Add navigation or further logic here if needed
  };

  return (
    <div className="bg-[#FF7401] min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-5">
      {/* Left Section */}
      <div className="text-center  md:text-left md:w-1/2">
        <h1 className="text-4xl text-center md:text-5xl font-bold text-black">
          Save Food, Save Lives
        </h1>
        <p className="text-lg text-center md:text-xl font-semibold text-white mt-2">
          Your excess food can feed the hungry.
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center">
          <input
            type="text"
            placeholder="Enter your location"
            value={loading ? 'Detecting location...' : location}
            onChange={e => { setLocation(e.target.value); setErrorMsg(''); }}
            className={`px-4 py-2 w-full md:w-80 border rounded-md focus:outline-none bg-white ${extractPinCode(location) ? 'border-gray-300' : 'border-red-500 ring-2 ring-red-500'}`}
          />
          <button className="bg-black text-lg font-semibold text-white px-6 py-2 rounded-md mt-3 md:mt-0 md:ml-3 transition duration-300 hover:bg-gray-800 hover:scale-105 cursor-pointer" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
        {!extractPinCode(location) && !loading && (
          <div className="text-red-600 mt-2 text-sm">A valid 6-digit pin code is required in your address.</div>
        )}
        {errorMsg && <div className="text-red-600 mt-2 text-sm">{errorMsg}</div>}
        <div className="mt-6 flex flex-col md:flex-row gap-3 justify-center">
          <button className="bg-red-600 text-white px-6 py-2 rounded-md md:ml-3">Donate Food</button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md">Collect Food</button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md">Request Food</button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={donationImg}
          alt="Food Donation"
          className="w-full md:w-[550px] rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default HeroSection2;
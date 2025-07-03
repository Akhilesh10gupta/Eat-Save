import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Added Link
import Nav from '../components/Header/Nav';
import Heading from '../components/Header/Heading';
import Footer from '../components/Footer/Footer';
import { registerUser, wakeBackend } from '../util/api';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    password: '',
    location: '',
    role: 'USER', // Default role
  });

  const [isAgreed, setIsAgreed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    wakeBackend(); // Wake up Render backend if sleeping
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);

      // Save token and role to localStorage
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('role', res.role);

      alert(res.message || 'Registration successful!');
      navigate('/home2');
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message?.includes('already') || err.response?.data?.message?.includes('exist')
          ? 'This email is already registered.'
          : err.response?.data?.message || err.message;

      alert('Registration failed: ' + message);
    }
  };

  return (
    <>
      <Heading />
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav />
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Welcome To Extra Bite</h1>
          <div className="w-full border-t-2 border-[#E87730] mt-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
            <h2 className="text-center text-xl sm:text-2xl font-bold text-[#E87730] mb-6">Sign Up</h2>

            <div className="mx-7">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <span className="mr-2">🇮🇳</span>
              <span className="mr-2">+91</span>
              <input
                type="text"
                name="contactNumber"
                placeholder="Phone"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>

            <div className="mx-7">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            <div className="mx-7">
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            <div className="mx-7">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
              />
            </div>

            {/* 🔽 Role Selector */}
            <div className="mx-7 mb-4">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 outline-none bg-white"
              >
                <option value="USER">User</option>
                <option value="DONOR">Donor</option>
                <option value="RECEIVER">Receiver</option>
              </select>
            </div>

            {/* ✅ Terms and Conditions */}
            <div className="mx-7 mb-4 text-sm text-gray-700">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Terms and Conditions
                  </button>
                </span>
              </label>
            </div>

            <div className="mx-7">
              <button
                type="submit"
                disabled={!isAgreed}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  isAgreed ? 'bg-[#FF7401] text-white hover:bg-orange-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Register
              </button>
            </div>

            {/* 🆕 Already have account redirect */}
            <div className="mx-7 mt-4 text-center">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Link to="/signin" className="text-sm text-blue-500 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </form>

        {/* ✅ Terms Modal */}
        {showTermsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative">
              <h3 className="text-lg font-bold mb-4 text-[#E87730]">Terms and Conditions</h3>
              <div className="text-sm text-gray-700 max-h-64 overflow-y-auto space-y-3">
                <p>1. Donors and receivers are solely responsible for the safety and quality of food items exchanged.</p>
                <p>2. Extra Bite acts only as a facilitator and does not verify the contents, hygiene, or preparation of the food.</p>
                <p>3. Users must ensure all shared food is safe, unexpired, and handled with care.</p>
                <p>4. Any disputes or issues arising from donations must be resolved directly between the donor and the receiver.</p>
                <p>5. By using Extra Bite, you agree to these terms and take full responsibility for your actions.</p>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="px-4 py-2 bg-[#FF7401] text-white rounded hover:bg-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}

export default Signup;

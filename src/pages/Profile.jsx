import React, { useEffect, useState } from 'react';
import Heading from '../components/Header/Heading';
import Footer from '../components/Footer/Footer';
import Nav2 from '../components/Header/Nav2';
import { FaEnvelope, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { getUserProfile, updateUserProfile } from '../util/api'; // ✅ Imported from api.js

function EditProfile() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    location: '',
    address: '',
    alternateContact: '',
    displayPictureUrl: '',
    profileActive: true,
  });

  // 🔁 Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile({
          fullName: data.fullName || '',
          email: data.email || '',
          contactNumber: data.contactNumber || '',
          location: data.location || '',
          address: data.userData?.address || '',
          alternateContact: data.userData?.alternateContact || '',
          displayPictureUrl: data.userData?.displayPictureUrl || '',
          profileActive: data.profileActive
        });
      } catch (err) {
        console.error('❌ Failed to fetch profile:', err);
        alert('Failed to load profile. Please log in again.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        fullName: profile.fullName,
        contactNumber: profile.contactNumber,
        location: profile.location,
        address: profile.address,
        alternateContact: profile.alternateContact,
        displayPictureUrl: profile.displayPictureUrl,
        profileActive: profile.profileActive
      };

      await updateUserProfile(updateData);
      alert('✅ Profile updated successfully!');
    } catch (err) {
      console.error('❌ Failed to update profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <>
      <Heading />
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav2 />
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Edit Your Profile</h1>
          <div className="w-full border-t-2 border-[#E87730] mt-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md">
            <h2 className="text-center text-xl sm:text-2xl font-bold text-[#E87730] mb-6">Profile Information</h2>

            {/* Full Name */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaUser className="mr-2 text-gray-500" />
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Email (read-only) */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaEnvelope className="mr-2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={profile.email}
                readOnly
                placeholder="Email"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaPhone className="mr-2 text-gray-500" />
              <span className="mr-2">+91</span>
              <input
                type="text"
                name="contactNumber"
                value={profile.contactNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Location */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Address */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Alternate Contact */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaPhone className="mr-2 text-gray-500" />
              <input
                type="text"
                name="alternateContact"
                value={profile.alternateContact}
                onChange={handleChange}
                placeholder="Alternate Contact"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Display Picture URL */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaUser className="mr-2 text-gray-500" />
              <input
                type="text"
                name="displayPictureUrl"
                value={profile.displayPictureUrl}
                onChange={handleChange}
                placeholder="Display Picture URL"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <div className="mx-7 mt-4">
              <button type="submit" className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                Save Changes
              </button>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
}

export default EditProfile;

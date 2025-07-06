import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import DonationForm from './pages/DonateForm';
import Home2 from './pages/Home2';
import RequestForm from "./pages/RequestForm";
import ContactHelpForm from "./pages/ContactHelpForm";
import Profile from "./pages/Profile";
import ForgotPassword from './pages/ForgotPassword';
import UserDirectory from './pages/UserDirectory';
import BrowseDonations from './pages/BrowseDonations';
import RequestDonation from './pages/RequestDonation';
import MyReceivedRequests from "./pages/MyReceivedRequests";
import ConfirmPickup from "./pages/ConfirmPickup";
import MyOrder from './pages/MyOrder';
import Dashboard from './pages/Dashboard';

import LoadingOverlay from './components/Loading/LoadingOverlay'; // ✅ correct
import { LoadingProvider } from './context/LoadingContext'; // ✅ needed for context

function App() {
  return (
    <Router>
      <LoadingProvider>
        <LoadingOverlay /> {/* ✅ Show globally on all pages */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/DonateForm" element={<DonationForm />} />
          <Route path="/Home2" element={<Home2 />} />
          <Route path="/RequestForm" element={<RequestForm />} />
          <Route path="/ContactHelpForm" element={<ContactHelpForm />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/UserDirectory" element={<UserDirectory />} />
          <Route path="/BrowseDonations" element={<BrowseDonations />} />
          <Route path="/request-donation/:donationId" element={<RequestDonation />} />
          <Route path="/my-received-requests" element={<MyReceivedRequests />} />
          <Route path="/my-order" element={<MyOrder />} />
          <Route path="/confirm-pickup/:requestId" element={<ConfirmPickup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </LoadingProvider>
    </Router>
  );
}

export default App;

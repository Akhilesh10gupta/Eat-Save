import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import DonationForm from './pages/DonateForm';
import Home2 from './pages/Home2';
import RequestForm from "./pages/RequestForm";
import ContactHelpForm from "./pages/ContactHelpForm";
import Profile from "./pages/Profile";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signin" element={<Signin />} /> {/* Define Signin route */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/DonateForm" element={<DonationForm />} />
        <Route path="/Home2" element={<Home2 />} />
        <Route path="/RequestForm" element={<RequestForm />} />
        <Route path="/ContactHelpForm" element={<ContactHelpForm />} />
        <Route path="/Profile" element={<Profile />} />
        {/* Add other pages here, without Heading */}
      </Routes>
    </Router>
  )
}

export default App;

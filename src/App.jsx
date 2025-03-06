import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"
import Signin from './pages/Signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signin" element={<Signin />} /> {/* Define Signin route */}
        {/* Add other pages here, without Heading */}
      </Routes>
    </Router>
  )
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Add other pages here, without Heading */}
      </Routes>
    </Router>
  )
}

export default App;

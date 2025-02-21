import React from 'react'
import Heading from '../components/Header/Heading'
import Nav from '../components/Header/Nav'
import HeroSection from '../components/Section/HeroSection'

function Home() {
  return (
    <>
      <Heading/>
      
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] via-50% to-[#0A1A3C] to-100% min-h-screen">
      <Nav/>
        <HeroSection />
      </div>
    </>
  )
}

export default Home

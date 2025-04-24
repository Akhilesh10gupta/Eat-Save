import React from 'react'
import Nav2 from '../components/Header/Nav2'
import Heading from '../components/Header/Heading'
import HeroSection2 from '../components/Section/HeroSection2'
import AvailableFoodSection from '../components/Section/AvailableFoodSection'

function Home2() {
  return (
    <>  
        <Heading />
        
        <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] via-50% to-[#0A1A3C] to-100% min-h-screen">
        <Nav2/>
        <HeroSection2/>
        <AvailableFoodSection/>
        </div>
    </>
  )
}

export default Home2
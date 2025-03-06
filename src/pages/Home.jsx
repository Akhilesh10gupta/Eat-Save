import React from 'react'
import Heading from '../components/Header/Heading'
import Nav from '../components/Header/Nav'
import HeroSection from '../components/Section/HeroSection'
import MissionSection from '../components/Section/MissionSection'
import GraphSection from '../components/Section/GraphSection'
import HelpSection from '../components/Section/HelpSection'
import Footer from '../components/Footer/Footer'



function Home() {
  return (
    <>
      <Heading/>
      
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] via-50% to-[#0A1A3C] to-100% min-h-screen">
      <Nav/>
        <HeroSection />
        <MissionSection/>
        <GraphSection />
        <HelpSection />
        <Footer />
      </div>
    </>
  )
}

export default Home

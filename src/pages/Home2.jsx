import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav2 from '../components/Header/Nav2';
import Footer from '../components/Footer/Footer';
import HeroSection2 from '../components/Section/HeroSection2'

function Home2() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin'); // 🔐 Protect route
    }
  }, [navigate]);

  return (
    <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
      <Nav2 />
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-white text-2xl sm:text-3xl font-semibold">
          Welcome to Extra Bite!
        </h1>
      </div>
      <HeroSection2/>
      <Footer />
    </div>
  );
}

export default Home2;

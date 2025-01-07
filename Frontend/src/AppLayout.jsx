import React from 'react'
import Navbar from './shared/Navbar'
import { Outlet } from 'react-router-dom';
import Footer from './shared/Footer';

const AppLayout = () => {
  return (
    <div >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout

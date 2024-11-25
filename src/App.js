import React from "react";
import NavBar from "./sections/NavBar/index";
import BannerPrimary from "./sections/BannerPrimary/index";
import OurSolutions from "./sections/OurSolutions/index";
import Footer from "./sections/Footer/index";
import ReactWhatsappButton from "react-whatsapp-button";
import Statistics from "./sections/Statistics";
import Blog from "./sections/Blog";
import Companies from "./sections/CompaniesWorked"; 

import "./global.css";


function App() {
  return (
    <div className="container">
      {/* <ReactWhatsappButton countryCode="41" phoneNumber="96745640" /> */}
      <NavBar />
      <BannerPrimary />
      <OurSolutions />
      <Statistics />
       {/* <Companies />
      <Blog />
      <Footer /> */}
    </div>
  );
}

export default App;

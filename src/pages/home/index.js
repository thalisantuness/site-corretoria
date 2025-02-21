import React from "react";
import NavBar from "../../components/NavBar/index";
import BannerPrimary from "../../components/BannerPrimary/index";
import OurSolutions from "../../components/OurSolutions/index";
import Footer from "../../components/Footer/index";
import ReactWhatsappButton from "react-whatsapp-button";
import Statistics from "../../components/Statistics";
import Blog from "../../components/Blog";
import Companies from "../../components/CompaniesWorked"; 

import "../../global.css";


function Home() {
  return (
    <div className="container">
      <ReactWhatsappButton countryCode="81" phoneNumber="92200646" />
      <NavBar />
      <BannerPrimary />
      <OurSolutions />
         <Companies />
      <Statistics />
    
      {/* <Blog /> */}
      <Footer /> 
    </div>
  );
}

export default Home;

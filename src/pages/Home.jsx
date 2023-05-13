import React from "react";
import Header from "../common/header/Header";
import SEO from "../common/SEO";
import HomeBanner from "../component/banner/HomeBanner";
import Partner from "../component/home/Partner";
import PartnerMobile from "../component/home/PartnerMobile";
import Dex from "../component/home/Dex";
import Stat from "../component/home/Stat";
import Coin from "../component/home/Coin";
import Info from "../component/home/Info";
import Referral from "../component/home/Referral";
import World from "../component/home/World";
import Footer from "../common/footer/Footer"; 
import MobileFooter from "../common/footer/MobileFooter"; 

const Home = () => {
  return (
    <>
      <SEO title="Home" />
      <main className="main-wrapper">
        <Header /> 
        <HomeBanner />
        <Partner/>
        <PartnerMobile/>
        <Dex/>
        <World/>
        <Stat/>  
        <Coin/>
        <Info/>
        <Referral/> 
        <MobileFooter/>
        <Footer/>
      </main>
    </>
  );
};

export default Home;

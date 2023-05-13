import React from "react";
import Header from "../common/header/Header";
import SEO from "../common/SEO";
import Footer from "../common/footer/Footer";
import LotteryTab from "../component/lottery/LotteryTabPost"; 
import Banner from "../component/banner/Banner";
import MobileFooter from "../common/footer/MobileFooter"; 

const Lottery = () => {
  return (
    <>
      <SEO title="Lottery" />
      <main className="main-wrapper">
        <Header />        
        <Banner />
        <div className="breadcrum-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="">
                  <div className="lotto-title">The MILK Lotto</div>
                  <div className="lotto-title mt-4">
                    Buy Tickets With MILK Win if 2, 3, or 4 of Your Ticket
                    Numbers Match!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container  mb-250">
          <LotteryTab />
        </div>
        <MobileFooter/>
        <Footer />
      </main>
    </>
  );
};

export default Lottery;

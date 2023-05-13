import React from "react";
import Header from "../common/header/Header";
import SEO from "../common/SEO";
import Footer from "../common/footer/Footer";
import LotteryTab from "../component/lottery/LotteryTab";
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
                  <div className="lotto-title">
                    “The biggest regret is not winning the lottery, It’s in Not
                    Trying”
                  </div>
                  <div className="lotto-title mt-4">
                    Buy Milk Lotto Ticket And Fight To Make Your Dreams Comes
                    True
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-250">
          <LotteryTab />
        </div>
        <MobileFooter />
        <Footer />
      </main>
    </>
  );
};

export default Lottery;

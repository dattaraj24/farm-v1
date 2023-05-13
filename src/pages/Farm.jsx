import React from "react";
import Header from "../common/header/Header";
import SEO from "../common/SEO";
import Footer from "../common/footer/Footer";
import FarmTab from "../component/farm/NfarmTab";
import Banner from "../component/banner/Banner";
import MobileFooter from "../common/footer/MobileFooter";  

const Farm = () => {
  return (
    <>
      <SEO title="Farm" />
      <main className="main-wrapper">
        <Header />
        <Banner />
        <div className="breadcrum-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <div className="">
                  <div className="farm-title">
                    Stake LP Tokens To Earn MILK Deposit Fee will Be Used To
                    Buyback MILK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-250">
          <FarmTab />

          <div className="section main-banner">
            <ul className="list-unstyled shape-group-20">
              <li className="shape shape-4">
                <img
                  src={require("../images/others/bubble-14.png")}
                  alt="Bubble"
                />
              </li>
              <li className="shape shape-5">
                <img
                  src={require("../images/others/bubble-13.png")}
                  alt="Bubble"
                />
              </li>
              <li className="shape shape-7">
                <img
                  src={require("../images/others/bubble-31.png")}
                  alt="Bubble"
                />
              </li>
              <li className="shape shape-8">
                <img
                  src={require("../images/others/bubble-1.png")}
                  alt="Bubble"
                />
              </li>
            </ul>
          </div>
        </div>
        <MobileFooter/>
        <Footer />
      </main>
    </>
  );
};

export default Farm;

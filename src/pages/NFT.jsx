import React from "react";
import Header from "../common/header/HeaderComing";
import SEO from "../common/SEO";
import MobileFooter from "../common/footer/MobileFooter";

import "../assets/scss/nft.scss";

const NFT = () => {
  return (
    <>
      <SEO title="NFT MarketPlace" />
      <main className="main-wrapper">
        <Header />
        <div className="nft-bg">
          <div className="container">
            <div className="d-flex justify-content-between pt-5 ptm-100">
              <div className="text-start floating-ship">
                <img
                  src={require("../images/coming/milk-nft-02.webp")}
                  alt=""
                  width="250px"
                  className="nft-img"
                />
              </div>
              <div className="text-end floating-ship">
                <img
                  src={require("../images/coming/milk-nft-04.webp")}
                  alt=""
                  width="250px"
                  className="nft-img"
                />
              </div>
            </div>
            <div className="heading-nf with pos-nf d-none">
                NFT'S MARKET PALCE
                LAUNCHING SOON
            </div>
            <div className="d-flex justify-content-between mtl-200">
              <div className="text-start floating-ship">
                <img
                  src={require("../images/coming/milk-nft-01.webp")}
                  alt=""
                  width="250px"
                  className="nft-img"
                />
              </div>
              <div className="text-end floating-ship">
                <img
                  src={require("../images/coming/milk-nft-03.webp")}
                  alt=""
                  width="250px"
                  className="nft-img"
                />
              </div>
            </div>
          </div>
        </div>
        <MobileFooter/>
      </main>
    </>
  );
};

export default NFT;

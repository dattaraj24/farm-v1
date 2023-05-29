/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import Data from "../../data/Partner.json";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

const Dex = () => {
  var [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="container">
        

      <div className="row justify-content-center mt-5">
          <h5 className="partner-heading text-center">Listed On Dex's</h5>
          <div className="col-lg-10 col-sm-12">
            <div className="partnr">
            <div className="partner-top"></div>
            <div className="d-flex mb-4 mt-3 justify-content-center text-center">
                <div className="col-md-3 mbm-5">
                  <a href="https://pancakeswap.finance/swap?outputCurrency=0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965&inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"  target="_parent">
                    <img
                      src={require(`../../images/partner/pancake-swap.png`)}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>{" "}
                <div className="col-md-3 mbm-5">
                  <a href="https://coincost.net/en/currency/milkshakeswap?from=search"  target="_parent">
                    <img
                      src={require(`../../images/partner/coincost.png`)}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>
                <div className="col-md-3 mbm-5">
                  <a href="https://app.1inch.io/#/56/unified/swap/BNB/MILK"  target="_parent">
                    <img
                      src={require(`../../images/partner/1inch-network.png`)}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>
                <div className="col-md-3 mbm-5">
                  <a href="https://coincodex.com/crypto/milkshakeswap-finance/"  target="_parent">
                    <img
                      src={require(`../../images/partner/coin-codex.png`)}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>
              </div>
              <div className="d-flex mb-4 justify-content-center text-center">
                <div className="col-md-4 mbm-5">
                  <a href="https://flooz.trade/trade/0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965?refId=ikUONy"  target="_parent">
                    <img
                      src={require(`../../images/partner/flooz.png`)}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>{" "}
                <div className="col-md-4 mbm-5">
                  <a href="https://astrospaces.io/coins/bep20/0xc9bcf3f71e37579a4a42591b09c9dd93dfe27965"  target="_parent">
                    <img
                      src={require(`../../images/partner/atrospace.png`)}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>
                <div className="col-md-4 mbm-5">
                  <a href="https://swap.arken.finance/tokens/bsc/0xc9bcf3f71e37579a4a42591b09c9dd93dfe27965"  target="_parent">
                    <img
                      src={require(`../../images/partner/arken.png`)}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        
      <div className="row justify-content-center mt-5">
          <h5 className="partner-heading text-center">In Wishlists</h5>
          <div className="col-lg-10 col-sm-12">
            <div className="partne">              
            <div className="partner-top"></div>
              <div className="d-flex mb-4 mt-4 justify-content-center text-center">
                <div className="col-md-3 mbm-5">
                  <a href=""  target="_parent">
                    <img
                      src={require(`../../images/partner/gate.png`)}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>
                <div className="col-md-3 mbm-5">
                  <a href=""  target="_parent">
                    <img
                      src={require(`../../images/partner/coinbase.png`)}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>
                <div className="col-md-3 mbm-5">
                  <a href=""  target="_parent">
                    <img
                      src={require(`../../images/partner/binance-logo.png`)}
                      alt="Demo"
                      className="partner-img"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dex;

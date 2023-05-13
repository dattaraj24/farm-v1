import React, { useState, useEffect, useContext } from "react";
import Tilty from "react-tilty";
import { ContextOneApp } from "../../App";

const HomeBanner = () => {
  const [userBalance, setUserBalance] = useState(0);
  const [userMilkHarvest, setUserMilkHarvest] = useState(0);
  const access = useContext(ContextOneApp);
  const { userAccount, objOne, objTwo } = access;

  // console.log(objOne,"objOne----------")
  let wei = 1000000000000000000;

  // console.log(userAccount,"userAccount")

  const getBalanceButton = async (userAccount) => {
    if (objOne) {
      const userBalance = await objOne.balanceOf(userAccount);
      const userBalanceObj = userBalance;
      const data = {
        userBalanceObj: userBalanceObj,
        userAccount: userAccount,
      }; 
      localStorage.setItem("userBalance", JSON.stringify(data));
      setUserBalance(userBalance / wei);
    }
  };

  const getMilkHarvest = async (userAccount) => {
    if (objOne) {
      let response = await objTwo.pendingMILK(4, userAccount);
      if (response) {
        const userb = response / wei;
        const data = {
          user: userb,
          userAccount: userAccount,
        };
        localStorage.setItem("pendingMILK", JSON.stringify(data));
        setUserMilkHarvest(userb);
      } else {
        setUserMilkHarvest(0);
      }
    }
  };

  // console.log(userMilkHarvest,"response PendingMilk")
  useEffect(() => {
    if (userAccount) {
      getBalanceButton(userAccount);
      getMilkHarvest(userAccount);
    }
  }, [userAccount]);

  // console.log(userBalance,"userBalance")

  return (
    <div className="section splash-main-banner">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 mt-4">
            <h3
              className="banner-heading text-center"
              style={{ fontWeight: "900" }}
            >
              Join The Future Of Decentralized Exchange & Farming Platform
            </h3>
          </div>
          <div className="col-lg-6">
            <div className="banner-content">
              {!userAccount ? (
                <div className="row mt-6 mt-5">
                  <div className="col-lg-12 d-flex j-center">
                    <a
                      href="http://v2exchange.cytogenepathlab.in/#/swap"
                      className="btn-banner"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buy $Milk From Milkshakeswap
                    </a>
                  </div>
                  <div className="col-lg-12 d-flex j-center mt-2 mb-5">
                    <a
                      href="https://bscscan.com/token/0xc9bcf3f71e37579a4a42591b09c9dd93dfe27965"
                      className="btn-connect"
                      target="_blank"
                      rel="noreferrer"
                      style={{ textTransform: "capitalize" }}
                    >
                      Milk Contract 0xc9bcf3f7....(BNB Chain)
                    </a>
                  </div>
                  <div className="col-lg-12 d-flex j-center mt-50 m-10">
                    <a
                      href="https://twitter.com/binancechain"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={require("../../images/icon/bnb-chain.svg").default}
                        alt=""
                        width="300px"
                      />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="row row-cols-2 mt-5">
                  <div className="col-lg-6">
                    <div className="banner-connect text-center">
                      <div className="text-white header-card-heading">
                        MILK IN WALLET
                      </div>
                      <div className="d-flex justify-content-center text-start">
                        <img
                          className="price-img"
                          src={require(`../../images/logo/milkshakeswap.webp`)}
                          alt="farm"
                        />
                        <div className="white-box">
                          <div className="text-green price-font-banner">
                            {parseFloat(userBalance).toFixed(3)} Milk
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="banner-connect text-center">
                      <div className="text-white header-card-heading">
                        MILK TO HARVEST
                      </div>
                      <div className="d-flex justify-content-center text-start">
                        <img
                          className="price-img"
                          src={require(`../../images/logo/milkshakeswap.webp`)}
                          alt="farm"
                        />
                        <div className="white-box">
                          <div className="text-green price-font-banner">
                            {parseFloat(userMilkHarvest).toFixed(3)} Milk
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 offset-xl-1 animation mpt-50">
            <Tilty glare scale={1.05} maxGlare={0.5}>
              <img src={require("../../images/layout/milk-moon.webp")} alt="" />
            </Tilty>
          </div>
        </div>
      </div>

      <ul className="list-unstyled shape-group-20">
        <li className="shape shape-1">
          <img
            src={require("../../images/others/bubble-36.png")}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-4">
          <img
            src={require("../../images/others/bubble-14.png")}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-5">
          <img
            src={require("../../images/others/bubble-13.png")}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-7">
          <img
            src={require("../../images/others/bubble-31.png")}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-8">
          <img src={require("../../images/others/bubble-1.png")} alt="Bubble" />
        </li>
      </ul>
    </div>
  );
};

export default HomeBanner;

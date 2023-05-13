/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContextOneApp, ContextTwoApp } from "../../App";
import AfterAccount from "./AfterAccount";
import Cookies from "js-cookie";

const TardeTab = () => {
  const access = useContext(ContextOneApp);
  const access2 = useContext(ContextTwoApp);
  const [lotteryPrizeAmount, setLotteryPrizeAmount] = useState(167);
  const [data, setData] = useState();

  const { userAccount, objOne, objTwo, objThree } = access; //lotteryPrizeAmount
  let wei = 1000000000000000000;

  const getLotto = async (userAccount) => {
    // const userBalance = await objOne.methods.balanceOf(userAccount).call();
    const issueIdex = await objThree.issueIndex();
    const a = await objThree.getTotalRewards(issueIdex);
    setLotteryPrizeAmount(a / wei);
    if (a) {
      // console.log("called")
      Cookies.set("lotteryPrizeAmount", (a / wei))
    } else {      
      // console.log("else")
      Cookies.set("lotteryPrizeAmount", 167);
    }
    const pnh = Cookies.get("lotteryPrizeAmount")
    setLotteryPrizeAmount(pnh);
  };
  // };

  const [search, setSearch] = useState(2);

  const getLotteryRoundData = async (lotteryNumber) => {
    try {
      const response = await fetch(
        `https://milkshakeswapapifinal.vercel.app/api/singleLottery?lotteryNumber=${lotteryNumber}`
      );
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const d = async (search) => {
    const f = await getLotteryRoundData(search);
    setData(f);
  };

  // console.log(data,"data")



  useEffect(() => {
    d(search);
    getLotto();
  }, [getLotto, search]);

  const fourMatchesAmount = +((lotteryPrizeAmount / 100) * 50).toFixed(0);
  const threeMatchesAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(0);
  const twoMatchesAmount = +((lotteryPrizeAmount / 100) * 10).toFixed(0);
  const burnAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(0);

  // console.log(Math.ceil(lotteryPrizeAmount), "lotteryPrizeAmount")

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="trade-tab">
            <div className="lottery">
              <Link className="lottery-link active">NEXT DRAW</Link>
              <Link to="/post-draw" className="lottery-link">
                POST DRAW
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-10 mt-150">
          <div className="row">
            <div className="col-md-5 lotto-card">
              <div className="lotto-card-head p-3 d-flex">
                <img
                  className="pe-4"
                  src={require(`../../images/logo/milkshakeswap.png`)}
                  alt="farm"
                  width="70"
                />
                <div className="lotto-price">
                  {Math.ceil(lotteryPrizeAmount)} Milk
                </div>
              </div>
              <hr />
              <div className="lotto-card-body d-flex justify-content-between p-4">
                <div className="col-lg-4 mb-5">
                  <div>No. Matched</div>
                  <div className="mt-3">4</div>
                  <div className="mt-3">3</div>
                  <div className="mt-3">2</div>
                  <div className="mt-5">To burn:</div>
                </div>
                <div className="col-lg-3 text-end">
                  <div>Price Pot</div>
                  <div className="mt-3">{fourMatchesAmount}</div>
                  <div className="mt-3">{threeMatchesAmount}</div>
                  <div className="mt-3">{twoMatchesAmount}</div>
                  <div className="mt-5">{burnAmount}</div>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-5 lotto-card p-5 text-center bm-50">
              {userAccount ? (
                <AfterAccount />
              ) : (
                <>
                  <img
                    className="pe-4"
                    src={require("../../images/layout/lottery-ticket.png")}
                    alt="farm"
                  />
                  <button className="btn-connect" onClick={access2}>
                    Unlock Wallet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 mt-150">
          <img
            className="pe-4"
            src={require(`../../images/layout/lottery-bg.png`)}
            alt="farm"
          />
        </div>
        <div className="col-md-8 mtb-50">
          <div
            className="link"
            style={{ fontSize: "20px", marginBottom: "15px" }}
          >
            <a href="#">How it works</a>
          </div>
          Spend MILK to buy tickets, contributing to the lottery pot. Win prizes
          if 2, 3, or 4 of your ticket numbers match the winning numbers and
          their exact order!
          <div className="mt-3 text-center">
            <a href="">Read more</a>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mb-250">
        <div
          className="text-center"
          style={{ fontSize: "25px", fontWeight: "700" }}
        >
          Latest Winning Numbers
        </div>
        <div className="col-md-8 text-center">
          {data ? (
            <>
              <span className="lotto-span">{data.lotteryNumbers[0]}</span>
              <span className="lotto-span">{data.lotteryNumbers[1]}</span>
              <span className="lotto-span">{data.lotteryNumbers[2]}</span>
              <span className="lotto-span">{data.lotteryNumbers[3]}</span>
            </>
          ) : (
            "Loading"
          )}
        </div>
        <div className="col-md-8 mtb-50 text-center">
          <div>Tickets matching 4 numbers:0</div>
          <div>Tickets matching 3 numbers:0</div>
          <div>Tickets matching 2 numbers:0</div>
          <a href="https://milkshakeswapapifinal.vercel.app/api/lottery?page=0&pageSize=25">
            Export recent winning numbers
          </a>
        </div>
      </div>
    </>
  );
};

export default TardeTab;

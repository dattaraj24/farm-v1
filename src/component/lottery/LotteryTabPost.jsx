/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
// import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { ContextOneApp, ContextTwoApp } from "../../App";

const TardeTab = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState(2);
  const access = useContext(ContextOneApp);
  const access2 = useContext(ContextTwoApp);
  const { userAccount, objOne, objTwo, objThree } = access;

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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    d(search);
  };

  function dataValue() {
    const fourMatchesAmount = +((data.poolSize / 100) * 50).toFixed(0); 
    const threeMatchesAmount = +((data.poolSize / 100) * 20).toFixed(0);
    const twoMatchesAmount = +((data.poolSize / 100) * 10).toFixed(0);
    const burnAmount = +((data.poolSize / 100) * 20).toFixed(0);

    return (
      <>
        <div className="mt-3">{fourMatchesAmount}</div>
        <div className="mt-3">{threeMatchesAmount}</div>
        <div className="mt-3">{twoMatchesAmount}</div>
        <div className="mt-5">{burnAmount}</div>
      </>
    );
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="trade-tab">
            <div className="lottery">
              <Link to="/next-draw" className="lottery-link">
                NEXT DRAW
              </Link>
              <Link className="lottery-link active">POST DRAW</Link>
            </div>
          </div>
        </div>
        <div className="col-md-10 mt-150">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group2 mb-5">
                <form action="" onSubmit={handleSubmit} className="d-flex">
                  <input
                    type="text"
                    className="form-control"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    style={{ width: "500px" }}
                  />
                  <button className="btn-banner" id="basic-addon2" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            {data ? (
              <div className="col-md-5 lotto-card">
                <div className="post-lotto-title p-4">
                  Round #{data.lotteryNumber}
                </div>
                <div className="d-block ps-4">
                  <div className="post-lotto-win">Winning numbers</div>
                  <div className="post-lotto-win2">
                    {data.lotteryNumbers[0]},{data.lotteryNumbers[1]},
                    {data.lotteryNumbers[2]},{data.lotteryNumbers[3]}
                  </div>
                </div>
                <div className="lotto-card-head p-3 d-flex">
                  <img
                    className="pe-4"
                    src={require(`../../images/logo/milkshakeswap.png`)}
                    alt="farm"
                    width="70"
                  />
                  <div className="lotto-price">{data.poolSize} Milk</div>
                </div>
                <hr />
                <div className="lotto-card-body d-flex justify-content-between p-4">
                  <div className="col-md-4 float-start">
                    <div>No. Matched</div>
                    <div className="mt-3">4</div>
                    <div className="mt-3">3</div>
                    <div className="mt-3">2</div>
                    <div className="mt-5">To burn:</div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div>Winner</div>
                    <div className="mt-3">0</div>
                    <div className="mt-3">0</div>
                    <div className="mt-3">2</div>
                    <div className="mt-5"></div>
                  </div>
                  <div className="col-md-4 float-end text-end">
                    <div>Price Pot</div>
                    {dataValue()}
                  </div>
                </div>
                <div className="row justify-center">
                  <div className="col-md-12 text-center mb-3">
                    {userAccount ? (
                      ""
                    ) : (
                      <>
                        <button className="btn-connect" onClick={access2}>
                          Unlock Wallet
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Spinner />
            )}
            <div className="col-md-1"></div>
            <div className="col-md-6 lotto-card p-5 bm-50">
              <div
                style={{
                  fontSize: "20px",
                  color: "#0f1359",
                  fontWeight: "600",
                }}
              >
                History
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#0f1359",
                  fontWeight: "600",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "10px",
                    backgroundColor: "rgb(20, 18, 89)",
                    marginRight:"6px"
                  }}
                ></span>
                Pool Size <span
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "10px",
                    backgroundColor: "rgb(20, 18, 89)",
                    marginRight:"6px"
                  }}
                ></span>Burned
              </div>
              <div style={{marginTop:"50px"}}></div>
              <img
                className=""
                src={require(`../../images/layout/map-line.png`)}
                alt="farm"
              />
              {/* <Map/> */}
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
      </div>
    </>
  );
};

export default TardeTab;

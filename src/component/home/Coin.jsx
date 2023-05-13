import React from "react";

const Coin = () => {
  return (
    <>
      <div className="container-fulid coin"> 
        {/* <div className="coin"></div> */}
        <div className="row justify-content-center row-cols-2">
          <div className="col-lg-5 mt-150 p-none animation">
            <img 
              src={require("../../images/layout/dice.webp")}
              alt=""
              className="coin-img-2"
            />
          </div>
          <div className="col-xl-4 col-lg-4 pe-5 animation2">
            <img
              src={require("../../images/layout/globe.webp")}
              alt=""
              width="600"
            />
            <div className="coin-heading mt-100">
              A Tasty yield MILKING on Binance Smart Chain
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;

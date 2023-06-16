import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Timeline } from "react-twitter-widgets";
import { ContextOneApp, ContextOnLoad } from "../../App";

const Stat = () => {
  const onLoadCtx = useContext(ContextOnLoad);
  const access = useContext(ContextOneApp);

  // const tvl = (parseFloat(access.tvl)+420352)
  const tvl = (parseFloat(access.tvl))

  // console.log(access.mcSupply,"access")

  useEffect(() => {    
    onLoadCtx();
  }, []);

  return (
    <>
      <div className="section mt-100">
        <div className="container">
          <div className="row">
            <div className="Box">
              <div className="services-grid  bg-1">
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">Market Cap</Link>
                  </h5>
                  <h5 className="title">
                    <Link to="/">${access.mcSupply !== undefined?access.mcSupply.toLocaleString():0}</Link>
                  </h5>
                </div>
              </div>
            </div>
            <div className="Box">
              <div className="services-grid bg-2">
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">Total Minted</Link>
                  </h5>
                  <h6 className="title text-white">
                    {access.tSupply !== undefined?access.tSupply.toLocaleString():0}
                  </h6>
                </div>
              </div>
            </div>
            <div className="Box">
              <div className="services-grid bg-3">
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">Total Burned</Link>
                  </h5>
                  <h5 className="title text-white">
                    {access.bnBalance !== undefined?access.bnBalance.toLocaleString():0}
                  </h5>
                </div>
              </div>
            </div>
            <div className="Box">
              <div className="services-grid bg-1">
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">Circulate Supply</Link>
                  </h5>
                  <h5 className="title text-white">
                    {access.cSupply !== undefined?access.cSupply.toLocaleString():0}
                  </h5>
                </div>
              </div>
            </div>
            <div className="Box">
              <div className="services-grid bg-2">
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">New Milk/block</Link>
                  </h5>
                  <h5 className="title">
                    <Link to="/">1.5</Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="services-grid bg-3">
                <div className="thumbnail">
                  <img
                    src={require(`../../images/icon/arrow-up.png`)}
                    alt="icon"
                    className="icon-img"
                  />
                </div>
                <div className="content">
                  <h5 className="stat-title">
                    <Link to="/">Total Value Locked (TVL)</Link>
                  </h5>
                  <h5 className="tvl text-white">
                    <Link to="/">${tvl !== undefined?tvl.toLocaleString():"400,000"}</Link>
                  </h5>
                  <h6 className="text-white">
                    Across all Milkings and Flavour Pools
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-md-5">
              <Timeline
                dataSource={{
                  sourceType: "profile",
                  screenName: "milkshakeswap",
                }}
                options={{
                  height: "400",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stat;

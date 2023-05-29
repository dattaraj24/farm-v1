/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import Data from "../../data/Partner.json";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

const Partner = () => {
  var [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="container part-none">
        <div className="row justify-content-center">
          <h5 className="partner-heading text-center">Find Us On</h5>
          <div className="col-lg-10 col-sm-12">
            <div className="partner-top"></div>
            <div className="partner">
              <div className="d-flex mb-4">
                {Data.slice(0, 6).map((data, index) => (
                  <div className="col-md-2 mbm-5" key={index}>
                    <a href={data.url}  target="_parent">
                      <img
                        src={require(`../../images/partner/${data.img}.png`)}
                        alt="Demo"
                        className="partner-img"
                      />
                    </a>
                  </div>
                ))}
              </div>
              {toggle ? (
                ""
              ) : (
                <button
                  className="btn mt-3"
                  onClick={() => setToggle((toggle) => !toggle)}
                >
                  <span className="exp">Explore More</span>
                  <BsChevronCompactDown className="partnerup" />
                </button>
              )}
              <div className="row m-2 row-cols-6">
                {toggle
                  ? Data.slice(6, 30).map((data, index) => (
                      <div className="col-md-2 mb-5" key={index}>
                        <a href={data.url}  target="_parent">
                          <img
                            src={require(`../../images/partner/${data.img}.png`)}
                            alt="Demo"
                            className="partner-img"
                          />
                        </a>
                      </div>
                    ))
                  : ""}
              </div>
              {toggle ? (
                <button
                  className="btn"
                  onClick={() => setToggle((toggle) => !toggle)}
                >
                  <span className="exp">Explore More</span>
                  <BsChevronCompactDown className="partnerup" />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;

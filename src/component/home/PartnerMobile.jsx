/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import Data from "../../data/Partner.json";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

const Partner = () => {
  var [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="container partm-none">
        <div className="row justify-content-center">
          <h5 className="partner-heading text-center">Find Us On</h5>
          <div className="col-lg-10 col-sm-12">
            <div className="partner-top"></div>
            <div className="partner">
              <div className="row  row-cols-3">
                {Data.map((data, index) => (
                  <div className="col-sm-2 m-10" key={index}>
                    <a href={data.url} target="_blank">
                      <img
                        src={require(`../../images/partner/${data.img}.png`)}
                        alt="Demo"
                        className="partner-img"
                      />
                    </a>
                  </div>
                ))}
              </div>          
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;

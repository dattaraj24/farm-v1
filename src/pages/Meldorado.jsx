import React from "react";
import Header from "../common/header/HeaderComing";
import SEO from "../common/SEO";
import MobileFooter from "../common/footer/MobileFooter";

import "../assets/scss/m-el-dorado.scss";

const Meldorado = () => {
  return (
    <>
      <SEO title="M El Dorado" />
      <main className="main-wrapper">
        <Header />
        <div className="m-el-bg">
          <div className="container">
            <div className="d-flex justify-content-between pt-5">
              <div className="text-start floating-ship ml-175 ml">
                <img
                  src={require("../images/coming/m-el-dorado-01.webp")}
                  alt=""
                  width="250px"
                />
              </div>
              <div className="text-end floating-ship">
                <img
                  src={require("../images/coming/m-el-dorado-04.webp")}
                  alt=""
                  width="250px"
                />
              </div>
            </div>
            <div className="row justify-content-center ">
              <div className="col-md-6">
                <div className="heading-m with pos mtl-150">
                  M-EL-DORADO LAUNCHING SOON
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mtl-200">
              <div className="text-start floating-ship ml-175 ml ptm-100">
                <img
                  src={require("../images/coming/m-el-dorado-02.webp")}
                  alt=""
                  width="450px"
                />
              </div>
              <div className="text-end floating-ship ptm-100">
                <img
                  src={require("../images/coming/m-el-dorado-03.webp")}
                  alt=""
                  width="450px"
                />
              </div>
            </div>
          </div>
        </div>
        <MobileFooter />
      </main>
    </>
  );
};

export default Meldorado;

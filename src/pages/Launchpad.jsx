import React from "react";
import Header from "../common/header/HeaderComing";
import SEO from "../common/SEO";
import MobileFooter from "../common/footer/MobileFooter";
import "../assets/scss/launchpad.scss";

const Launchpad = () => {
  return (
    <>
      <SEO title="Launchpad" />
      <main className="main-wrapper">
        <Header />
        <div className="launpad-bg">
          <div className="container">
            <div className="ship-img-n floating-ship mtl-100 m-none">
              <img src={require("../images/coming/launch-ship.webp")} alt="" />
            </div>
            <div className="ship-img floating-ship d-none">
              <img
                src={require("../images/coming/launch-ship-ms.webp")}
                className="ship-ms"
                alt=""
              />
            </div>
            <div className="row justify-content-center pt-200">
              <div className="col-md-10 float-end">
                <div className="heading-ml with pos">LAUNCHPAD COMING SOON</div>
              </div>
            </div>
            <div className="row justify-content-center main-call pt-200">
              <div className="col-md-12">
                <div className="with">WITH</div>
              </div>
              <div className="col-md-3 mt-10">
                <div className="lun-box btn-white">INO</div>
              </div>
              <div className="col-md-3 mt-10">
                <div className=" lun-box btn-white">IDO</div>
              </div>
              <div className="col-md-3 mt-10 mb-50">
                <div className=" lun-box btn-white">IFO</div>
              </div>
            </div>
          </div>
        </div>
        <MobileFooter />
      </main>
    </>
  );
};

export default Launchpad;

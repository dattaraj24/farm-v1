import React from "react";

const Info = () => { 
  return (
    <>
      <div className="container-fluid info2">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-md-4">
          <div className="mt-250 m-50">
              <h5 className="text-white">Accessibility</h5>
              <div className="text-white">
                We create tools for users to leverage DeFi opportunities,
                regardless of location, background, wealth, or experience.
              </div>
            </div>            
            <div className="mt-100 m-50">
              <h5 className="text-white">Transparency</h5>
              <div className="text-white">
                We build together through transparent governance and processes
                that ensure our community understands our goals.
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 animation mt-100 m-50">
          <img src={require("../../images/layout/info.webp")} alt="" />
          </div>
          <div className="col-xl-4 col-md-4 mt-250 mpt-100 m-none">
            <h5 className="mt-29 text-white">Security</h5>
              <div className="text-white">
                We ensure that the safety of the funds of our users and partners
                is our highest priority.
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;

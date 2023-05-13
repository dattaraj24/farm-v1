/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { useWallet } from "@binance-chain/bsc-use-wallet";
import { ContextOneApp, ContextTwoApp } from "../../App";

const Footer = () => {
  // const { account } = useWallet();
  const access = React.useContext(ContextOneApp);
  const [isregistered, setIsregistered] = React.useState(false);
  const [a, setA] = useState(false);

  const { userAccount, objOne, objTwo } = access;

  const isRegister = async (userAccount) => {
    if (userAccount) {
      if (objTwo) {
        let response = await objTwo.affinfo(userAccount);
        setIsregistered(response.isregistered);
      }
    }
  };

  React.useEffect(() => {
    isRegister(userAccount);
  }, [userAccount]);

  return (
    <footer className="footer">
      <div className="container-fluid white-bg-ref">
        <div className="row justify-content-around">
          <div className="col-xl-5 col-md-5 ">
            <div className="ref-heading mt-100 mpt-150 mt-250 m-50">
              MilkshakeSwap.finance users, earn a passive income with the help
              of unique algoric creation named DRA (Decentralized referral
              algorithm)
            </div>
            {a ? (
              <div className="copy">
                <span>Copied</span>
              </div>
            ) : (
              ""
            )}
            <div className="dra-btn">
              <Link className="btn-connect mt-5 me-5" to="/">
                Chekout DRA
              </Link>
              <CopyToClipboard
                text={`https://milkshakeswap.finance/?ref=${
                  isregistered ? userAccount : "false"
                }`}
                onCopy={() => {
                  setA(true);
                  setTimeout(() => setA(false), 3000);
                }}
              >
                <button className="btn-banner">Copy Link</button>
                {/* <span>Copy </span> */}
              </CopyToClipboard>
            </div>
          </div>
          <div className="col-xl-5 col-md-5">
            <div className="mt-250 mpt-150 text-start animation m-50">
              <img src={require("../../images/layout/referral.webp")} alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

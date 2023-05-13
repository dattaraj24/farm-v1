/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState,useContext} from "react";
import { Link } from "react-router-dom";
import {
  BsTwitter,
  BsInstagram,
  BsMedium,
  BsTelegram,
  BsDiscord,
} from "react-icons/bs";
import { ContextPrice } from "../../App";

const Footer = () => {
  const price = useContext(ContextPrice);

  return (
    <footer className="footer">
      <div className="white-bg">
        <div className="row justify-content-center text-center pt-100 p-10">
          <div className="row justify-content-center text-center mt-150 m-50">
            <div className="col-xl-3">
              <ul className="d-flex justify-content-between text-center pd">
                <li>
                  <a href="https://milkshakeswap.gitbook.io/milkshake/faq" target="_blank">FAQ</a> 
                </li>
                <li>/</li>
                <li>
                  <a href="https://milkshakeswap.gitbook.io/milkshake/tokenomics/page-not-found" target="_blank">Tokenomics</a>
                </li>
                <li>/</li>
                <li>
                  <a href="https://milkshakeswap.gitbook.io/milkshake/" target="_blank">Docs</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-50 row-cols-1 text-center justify-content-center">
            <div className="col-xl-4 col-md-12 mt-5">
              <div className="info">
                <Link to="/" className="logo">
                  <img
                    id="site-logo"
                    src={require("../../images/logo/logo.webp")}
                    alt="logo"
                    width="300"
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-12 mt-5">
              <ul className="d-flex social">
                <li>
                  <a href="https://t.me/milkshakeswap" target="_blank">
                    <BsTelegram className="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/milkshakeswap" target="_blank">
                    <BsTwitter className="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/milkshakeswap.finance/" target="_blank">
                    <BsInstagram className="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://milkshakeswap.medium.com/" target="_blank">
                    <BsMedium className="icon" />
                  </a>
                </li>
                <li>
                  <a href="https://discord.com/channels/1034058598784978964/1034058599804190741" target="_blank">
                    <BsDiscord className="icon" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xl-3 col-md-12 mt-5">
              <div className="copyright text-center">
                ©2023 MilkShakeSwap Finance
                <br /> All rights reserved.
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center footer-price mt-50 mbm-50">
          <div className="col-md-3 text-center mtb-20 mt-100">
            <a href="" className="btn-price">
              <div className="footer-price-text">${parseFloat(price).toFixed(3)}</div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

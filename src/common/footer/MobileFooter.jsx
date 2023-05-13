import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import home from "../../images/icon/home.png";
import trade from "../../images/icon/trade.png";
import farms from "../../images/icon/farms.png";
import pool from "../../images/icon/pool.png";
import lotto from "../../images/icon/lotto.png";
import soon from "../../images/icon/soon.png";

const MobileFooter = () => {
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const openHandle = () => {
    setOpen(!open);
    setOpenNew(false);
  };
  const openNewHandle = () => {
    setOpen(false);
    setOpenNew(!openNew);
  };
  return (
    <>
      <nav className="mobile-nav">
        <li className="mobile-nav-li">
          <Link to="/">
            <img src={home} alt="home" className="menu-img" />
            <div style={{ fontSize: "8px" }}>Home</div>
          </Link>
        </li>
        <li style={{ cursor: "pointer" }} className="mobile-nav-li">
          <span onClick={openHandle}>
            <img src={trade} alt="home" className="menu-img" />
            <div style={{ fontSize: "8px", fontWeight: "700" }}>Trade</div>
          </span>
        </li>
        <li className="mobile-nav-li">
          <Link to="/farm">
            <img src={farms} alt="home" className="menu-img" />
            <div style={{ fontSize: "8px" }}>Milking</div>
          </Link>
        </li>
        <li className="mobile-nav-li">
          <Link to="/pool">
            <img src={pool} alt="home" className="menu-img" />
            <div style={{ fontSize: "8px" }}>Flavour Poll</div>
          </Link>
        </li>
        <li className="mobile-nav-li">
          <Link to="/next-draw">
            <img src={lotto} alt="home" className="menu-img" />
            <div style={{ fontSize: "8px" }}>Lotto</div>
          </Link>
        </li>
        <li style={{ cursor: "pointer" }} className="mobile-nav-li">
          <span onClick={openNewHandle}>
            <img src={soon} alt="home" className="menu-img" />
            <div style={{ fontSize: "8px", fontWeight: "700" }}>
              Coming Soon
            </div>
          </span>
        </li>
      </nav>
      {open ? (
        <nav className="mobile-nav2">
          <li className="open-li">
            <a href="http://v2exchange.cytogenepathlab.in/#/swap" target="_blank">
              Exchange
            </a>
          </li>
          <li className="open-li">
            <a href="http://v2exchange.cytogenepathlab.in/#/pool" target="_blank">
              Liquidity
            </a>
          </li>
        </nav>
      ) : (
        ""
      )}

      {openNew ? (
        <nav className="mobile-nav3">
          <li className="open-li">
            <Link to="/launchpad">
              Launchpad
            </Link>
          </li>
          <li className="open-li">
            <Link to="/nft-marketplace">
              NFT MarketPlace
            </Link>
          </li>
          <li className="open-li">
            <Link to="/m-el-dorado">
              M El Dorado
            </Link>
          </li>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default MobileFooter;

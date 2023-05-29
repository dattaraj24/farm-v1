/* eslint-disable react/jsx-no-target-blank */
import { useState, useEffect, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { providerNew, milkContract1, connectNew, counT } from "../ConnectModal";
import { ContextOneApp, ContextTwoApp, ContextLogout } from "../../App";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Modal } from "react-bootstrap";
import Cookies from "js-cookie";

// import bsc from "../../images/icon/bsc-scan.svg"

const Nav = () => {
  const [show, setShow] = useState(false);
  const [a, setA] = useState(false);
  const access = useContext(ContextOneApp);
  const access2 = useContext(ContextTwoApp);
  const logOut = useContext(ContextLogout);

  const { objOne, objTwo, objThree, userAccount, web3Var } = access;

  const bscScan = `https://bscscan.com/address/${userAccount}`;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, [providerNew]);

  return (
    <nav className="mainmenu-nav">
      <ul className="mainmenu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="menu-item-has-children">
          <Link to="#">
            Trade <FaAngleDown />
          </Link>
          <ul className="axil-submenu">
            <li>
              <a href="https://milkshakeswap.finance/swap/#/swap" target="_parent">
                Exchange
              </a>
            </li>
            <li>
              <a href="https://milkshakeswap.finance/swap/#/pool" target="_parent">
                Liquidity
              </a>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/farm">Milkings</Link>
        </li>
        <li>
          <Link to="/pool">Flavour Pool</Link>
        </li>
        <li>
        <a target="_parent" href="https://milkshakeswap.finance/stake" >
                staking
              </a>
        </li>
        <li className="menu-item-has-children">
          <Link to="#">
            Coming Soon <FaAngleDown />
          </Link>
          <ul className="axil-submenu">
            <li>
              <Link to="/launchpad">Launchpad</Link>
            </li>
            <li>
              <Link to="/nft-marketplace">NFT MarketPlace</Link>
            </li>
            <li>
              <Link to="/m-el-dorado">M El Dorado</Link>
            </li>
          </ul>
        </li>
        <li>
          {userAccount ? (
            <div className="d-flex">
              {/* <span className="account">{userAccount}</span> */}
              <span className="account" onClick={handleShow}>
                {userAccount}
              </span>
              <span onClick={logOut} className="logout">
                <IoIosLogOut />
              </span>
            </div>
          ) : (
            <button className="btn-connect" onClick={access2}>
              Connect
            </button>
          )}
        </li>
      </ul>
      <Modal show={show} onHide={handleClose} contentClassName="bg">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center mt-4">
            <span className="account">{userAccount}</span>
            {a ? (
              <div className="copy">
                <span>Copied</span>
              </div>
            ) : (
              ""
            )}
            <CopyToClipboard
              text={userAccount}
              onCopy={() => {
                setA(true);
                setTimeout(() => setA(false), 3000);
              }}
            >
              <MdContentCopy />
            </CopyToClipboard>
            <a href={bscScan}  target="_parent">
              <img
                src={require("../../images/icon/bsc-scan.svg").default}
                alt="bsc-scan"
                className="bscscan-img"
              />
            </a>
          </div>
          <div className="text-center mt-5" onClick={logOut}>
            Disconnect <IoIosLogOut />
          </div>
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default Nav;

import { useContext,useEffect } from "react";
import Logo from "../../elements/logo/Logo3";
import Nav from "../../common/header/Nav";
import StickyHeader from "./StickyHeader";
// import useFetch2 from "../useFetch";
import { ContextOneApp, ContextTwoApp, ContextLogout,ContextPrice } from "../../App";
import { IoIosLogOut } from "react-icons/io";
import Navdefault from './Navdefault';

const Headerdefault = () => {



  // console.log(milk3,"----------------------------------------------------")

  const access = useContext(ContextOneApp);
  const access2 = useContext(ContextTwoApp);
  const logOut = useContext(ContextLogout);
  const price = useContext(ContextPrice);

  const {userAccount } = access;

  const sticky = StickyHeader(100);

  return (
    <>
      <header className="header axil-header header-style-1">
        <div className={`axil-mainmenu ${sticky ? "axil-sticky" : ""}`}>
          <div className="container">
            <div className="header-navbar">
              <div className="header-logo">
                <Logo
                  limage="/images/logo.webp"
                  dimage="/images/logo.webp"
                  simage="/images/logo.webp"
                />
                <div className="header-price">
                  ${parseFloat(price).toFixed(3)}
                </div>
              </div>
              <div className="header-main-nav">
                {/* <UnlockButton/> */}
                <Navdefault/>
              </div>
              <div className="header-action">
                <ul className="list-unstyled">
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Headerdefault;

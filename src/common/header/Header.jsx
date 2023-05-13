import { useContext,useEffect } from "react";
import Logo from "../../elements/logo/Logo3";
import Nav from "../../common/header/Nav";
import StickyHeader from "./StickyHeader";
// import useFetch2 from "../useFetch";
import { ContextOneApp, ContextTwoApp, ContextLogout,ContextPrice } from "../../App";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {



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
                <Nav />
              </div>
              <div className="header-action">
                <ul className="list-unstyled">
                  <li className="mobile-menu-btn sidemenu-btn d-lg-none d-block">
                    {userAccount ? (
                      <div className="d-flex">
                        {/* <span className="account">{userAccount}</span> */}
                        <span className="account">{userAccount}</span>
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
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

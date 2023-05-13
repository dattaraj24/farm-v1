import { useContext, useEffect } from "react";
import Logo from "../../elements/logo/Logo3";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import StickyHeader from "./StickyHeader";
// import useFetch2 from "../useFetch";
import {
  ContextOneApp,
  ContextTwoApp,
  ContextLogout,
  ContextPrice,
} from "../../App";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  // console.log(milk3,"----------------------------------------------------")

  const access = useContext(ContextOneApp);
  const price = useContext(ContextPrice);

  const sticky = StickyHeader(100);

  return (
    <>
      <header className="header axil-header header-style-1">
        <div className={`axil-mainmenu ${sticky ? "axil-sticky" : ""}`}>
          <div className="container">
            <div className="header-navbar">
              <div className="header-logo">
                <Logo
                  limage="/images/logo.svg"
                  dimage="/images/logo-3.svg"
                  simage="/images/logo-2.svg"
                />
                <div className="header-price">
                  ${parseFloat(price).toFixed(3)}
                </div>
              </div>
              <div className="header-main-nav">
                <nav className="mainmenu-nav">
                  <ul className="mainmenu">
                    <li>
                      <Link to="/" className="text-white">
                        Home
                      </Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link to="#" className="text-white">
                        Trade <FaAngleDown />
                      </Link>
                      <ul className="axil-submenu">
                        <li>
                          <a
                            href="http://v2exchange.cytogenepathlab.in/#/swap"
                            target="_blank"
                          >
                            Exchange
                          </a>
                        </li>
                        <li>
                          <a
                            href="http://v2exchange.cytogenepathlab.in/#/pool"
                            target="_blank"
                          >
                            Liquidity
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/farm" className="text-white">
                        Milkings
                      </Link>
                    </li>
                    <li>
                      <Link to="/pool" className="text-white">
                        Flavour Pool
                      </Link>
                    </li>
                    <li>
                      <Link to="/next-draw" className="text-white">
                        Lotto
                      </Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link to="#" className="text-white">
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
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

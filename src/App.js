import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Farm from "./pages/Farm";
import Pool from "./pages/Pool";
import Lottery from "./pages/Lottery";
import PostDraw from "./pages/PostDraw";
import Dra from "./pages/Dra";
import ErrorPage from "./pages/404";
import Cookies from "js-cookie";

// Css Import
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/app.scss";
import "./assets/scss/style.scss";
import "./assets/scss/responsive.scss";

import Web3 from "web3";

import Web3Modal from "web3modal";
import providerOptions from "../src/utils/ProviderOption";
import cakeAbi from "../src/abi/cake.json";
import masterChefAbi from "../src/abi/masterchef.json";
import lotteryAbi from "../src/abi/lottery.json";
import { MainTvlFetcher, UsePriceCakeBusd } from "./TVLFetch/MainTvlFetcher";
import fetchFarms from "./constants/multiCaller";
import fetchFarmUSerDataAsync from "./constants/Register/fetchFarmUSerDataAsync";
import { ethers, providers } from "ethers";
import NFT from "./pages/NFT";
import Launchpad from "./pages/Launchpad";
import Meldorado from "./pages/Meldorado";

export const ContextOneApp = createContext();
export const ContextTwoApp = createContext();
export const ContextLogout = createContext();
export const ContextContractCreation = createContext();
export const ContextOnLoad = createContext();
export const ContextPrice = createContext();
export const ContextLp = createContext();

function App() {
  const [objOne, setObjOne] = useState("");
  const [objTwo, setObjTwo] = useState("");
  const [objThree, setObjThree] = useState("");
  const [web3Var, setWeb3] = useState("");
  const [web3My, setWeb3My] = useState("");
  const [userAccount, setUserAccount] = useState();
  const [chainId, setChainId] = useState(0);
  const [tSupply, setTotalSupply] = useState(0);
  const [cSupply, setSupply] = useState(0);
  const [mcSupply, setMarketSupply] = useState(0);
  const [bnBalance, setBnBalance] = useState(0);
  const [tvl, setTvl] = useState(0);
  const [price, setPrice] = useState(0);
  const [lpTokens, setLptoken] = useState();
  const [totliquidity, setTotliquidity] = useState();
  const [userlpTokens, setUserLptoken] = useState();
  const [ethSigner, setEthSigner] = useState();
  const [isregistered, setIsregistered] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  const milkAddress = "0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965";
  const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";
  const lotteryAddress = "0xc4E8Ce0AE31623B6D43Fd9946AE9B75354ad9ba2";

  const defaultOperation = async () => {
    let wei = 1000000000000000000;

    const ethProvider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed1.ninicoin.io"
    );

    const ethContract = new ethers.Contract(milkAddress, cakeAbi, ethProvider);


    setObjOne(ethContract);

    const d = await UsePriceCakeBusd();
    const r = parseFloat(d).toFixed(6);
    setPrice(r);

    //--------- contract two
    const ethContract2 = new ethers.Contract(
      masterChefAddress,
      masterChefAbi,
      ethProvider
    );
    // console.log(ethContract, "ethContract")

    setObjTwo(ethContract2);

    //--------- contract three

    const ethContract3 = new ethers.Contract(
      lotteryAddress,
      lotteryAbi,
      ethProvider
    );
    setObjThree(ethContract3);

    //stats
    // const burnedBalance = await milkContract.methods
    //   .balanceOf("0x000000000000000000000000000000000000dEaD")
    //   .call();
    const burnedBalance = await ethContract.balanceOf(
      "0x000000000000000000000000000000000000dEaD"
    );

    // const response1 = await milkContract.methods.totalSupply().call();
    const response1 = await ethContract.totalSupply();

    const _finalTSupply = Math.round(response1 / wei);
    const finalTSupply = _finalTSupply;
    const totalSupply = Math.round(response1 / wei);
    const burnedBalance2 = Math.round(burnedBalance / wei);

    const circulate2 = totalSupply - burnedBalance / wei;
    const circulateSupply = Math.ceil(circulate2);
    const marketCap2 = circulateSupply * d;
    const marketCap = Math.round(marketCap2);

    if (circulateSupply) {
      localStorage.setItem("circulateSupply", circulateSupply);
      setSupply(circulateSupply);
    }

    if (marketCap) {
      localStorage.setItem("marketCap", marketCap);
      setMarketSupply(marketCap);
    }

    if (finalTSupply) {
      localStorage.setItem("finalTSupply", finalTSupply);
      setTotalSupply(finalTSupply);
    }

    if (burnedBalance2) {
      localStorage.setItem("burnedBalance2", burnedBalance2);
      setBnBalance(burnedBalance2);
    }
    setSupply(circulateSupply);
    setMarketSupply(marketCap);
    setTotalSupply(finalTSupply);
    setBnBalance(burnedBalance2);
  };

  // all connectivity code starts===================================================

  const connect = async () => {
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions, // required
    });
    let wei = 1000000000000000000;

    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const ethersProvider = new providers.Web3Provider(provider);
    const userAddress = await ethersProvider.getSigner().getAddress();
    setWeb3(ethersProvider);
    setWeb3My(web3);
    const accounts = await web3.eth.getAccounts();
    const signer = ethersProvider.getSigner(userAddress);
    setEthSigner(signer);
    // Cookies.set("userAccountsAddress", accounts[0]);
    Cookies.set("userAccountsAddress", userAddress);
    let user = Cookies.get("userAccountsAddress");
    setUserAccount(user);
    setChainId(chainId);

    const milkContract = new ethers.Contract(milkAddress, cakeAbi, signer);
    setObjOne(milkContract);

    const masterChefContract = new ethers.Contract(
      masterChefAddress,
      masterChefAbi,
      signer
    );

    // const harvestResponse = await masterChefContract.deposit(4, "0")
    // console.log(await harvestResponse,"harvestResponse")
    setObjTwo(masterChefContract);

    const lotteryContract = new ethers.Contract(
      lotteryAddress,
      lotteryAbi,
      signer
    );
    setObjThree(lotteryContract);

    const dataFuncUser = async (userAccount) => {
      const lp = await fetchFarmUSerDataAsync(userAccount);
      setUserLptoken(lp);
    };
    dataFuncUser(userAddress)

    const isRegister = async (userAccount) => {
      if (userAccount) {
          let response = await masterChefContract.affinfo(userAccount);
          if (response) {
            setIsregistered(response.isregistered);
          }
        }
    };
    isRegister(userAddress);
  };
  // all connectivity code ends===================================================

  const logOut = () => {
    Cookies.remove("userAccountsAddress");
    setUserAccount(null);
    alert("logout");
  };

  const contractObjCreator = async (masterChefAbi, contractAddress) => {
    const ContractObj = new web3Var.eth.Contract(
      masterChefAbi,
      contractAddress
    );
    // console.log("=-=-conrtact object-=-=", ContractObj)
    return ContractObj;
  };
  // console.log("-==-==-=--=-=-=-userAccount-==-=-=-=-=--=-=-", userAccount)

  const dataFunc = async () => {
    const a = await fetchFarms();
    if (a) {
      localStorage.setItem("lptoken", JSON.stringify(a));
      setLptoken(a);
    }
    setLptoken(a);
  };

  useEffect(() => {
    async function dr() {
      const d = await UsePriceCakeBusd();
      const r = parseFloat(d).toFixed(6);
      if (r) {
        localStorage.setItem("milkprice", r);
        setPrice(r);
      } else {
        setPrice(0);
      }
      setPrice(r);
    }

    async function gettvl() {
      const value = await MainTvlFetcher();
      if (value) {
        localStorage.setItem("tvl", value[0]);
        localStorage.setItem("liquidit", JSON.stringify(value[1]));
        setTvl(value[0]);
        setTotliquidity(value[1]);
      } else {
        setTvl(40000);
      }
      setTvl(value[0]);
      setTotliquidity(value[1]);
    }
    const pr = localStorage.getItem("milkprice");
    const tv = localStorage.getItem("tvl");
    const lq = localStorage.getItem("liquidit");
    if (pr) {
      setPrice(pr);
    }
    if (tv) {
      setTvl(tv);
    }
    if (lq) {
      const d = JSON.parse(lq);
      setTotliquidity(d);
    }
    defaultOperation();
    dr();
    gettvl();
    const cr = localStorage.getItem("circulateSupply");
    const mr = localStorage.getItem("marketCap");
    const ft = localStorage.getItem("finalTSupply");
    const gt = localStorage.getItem("burnedBalance2");
    if (cr) {
      setSupply(cr);
      setMarketSupply(mr);
      setTotalSupply(ft);
      setBnBalance(gt);
    }
  }, []);

  useEffect(() => {
    dataFunc();
    const lp = localStorage.getItem("lptoken");
    const d = JSON.parse(lp);
    setLptoken(d);
    let user = Cookies.get("userAccountsAddress");
    setUserAccount(user);
  }, [userAccount]);

  return (
    <ContextOneApp.Provider
      value={{
        objOne: objOne,
        objTwo: objTwo,
        objThree: objThree,
        userAccount: userAccount,
        web3Var: web3Var,
        tSupply: tSupply,
        cSupply: cSupply,
        mcSupply: mcSupply,
        bnBalance: bnBalance,
        tvl: tvl,
        ethSigner: ethSigner,
        web3My: web3My,
      }}
    >
      <ContextTwoApp.Provider value={connect}>
        <ContextLogout.Provider value={logOut}>
          <ContextContractCreation.Provider value={contractObjCreator}>
            <ContextOnLoad.Provider value={defaultOperation}>
              <ContextPrice.Provider value={price}>
                <ContextLp.Provider
                  value={{
                    lpTokens2: lpTokens,
                    totliquidity2: totliquidity,
                    userlpTokens: userlpTokens,
                    isregistered: isregistered,
                  }}
                >
                  <Router>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/farm" element={<Farm />} />
                      <Route path="/pool" element={<Pool />} />
                      <Route path="/next-draw" element={<Lottery />} />
                      <Route path="/post-draw" element={<PostDraw />} />
                      <Route path="/dra" element={<Dra />} />
                      <Route path="/launchpad" element={<Launchpad />} />
                      <Route path="/nft-marketplace" element={<NFT />} />
                      <Route path="/m-el-dorado" element={<Meldorado />} />
                      <Route path="/404" element={<ErrorPage />} />
                    </Routes>
                  </Router>
                </ContextLp.Provider>
              </ContextPrice.Provider>
            </ContextOnLoad.Provider>
          </ContextContractCreation.Provider>
        </ContextLogout.Provider>
      </ContextTwoApp.Provider>
    </ContextOneApp.Provider>
  );
}

export default App;

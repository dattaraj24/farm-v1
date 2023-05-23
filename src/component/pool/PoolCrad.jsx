/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import cakeabi from "../../abi/cake.json";
import {
  BsFillHeartFill,
  BsFillPlusCircleFill,
  BsFillDashCircleFill,
} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Web3 from "web3";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import providerOptions from "../../../src/utils/ProviderOption";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
// import Harvest from "./Harvest";
// import { stackHandler, unStake } from "../../constants/aprove";
import { ContextOneApp } from "../../App";
import BigNumber from "bignumber.js";
import masterChefAbi from "../../abi/masterchef.json";
import LpAbi from "../../abi/cake.json";
import msAbi from "../../abi/masterchef.json";

// lp address
// 0xaBCB20886B4749205198d627FF6ccFdffFe97112

const FarmCard = (props) => {
  const [show, setShow] = useState(false);
  const [showStack, setShowStack] = useState(false);
  const [showUnStack, setShowUnStack] = useState(false);
  const [roi1, setRoi1] = useState({});
  const [roi2, setRoi2] = useState({});
  const [roi3, setRoi3] = useState({});
  const [roi4, setRoi4] = useState({});
  const [allowanceRes, setAllowanceRes] = useState(0);
  var [toggle, setToggle] = useState(true);
  var [stackValue, setStackValue] = useState(0);
  var [stackValueN, setStackValueN] = useState(0);
  var [load, setLoad] = useState(false);

  var [unStackValue, setUnStackValue] = useState(0);
  var [unStackValueN, setUnStackValueN] = useState(0);

  const handleClose = () => setShow(false);
  const handleCloseStack = () => setShowStack(false);
  const handleCloseUnStack = () => setShowUnStack(false);
  const handleShow = () => setShow(true);
  const handleShowStack = () => setShowStack(true);
  const handleShowUnStack = () => setShowUnStack(true);

  const access = useContext(ContextOneApp);

  let wei = 1000000000000000000;

  const { web3Var, userAccount, ethSigner, userlpTokens, web3My } = access;

  // const LpAddress = "0xAb6DEeC8C64aE4964Ba5e153d12b8acD1632a29F";
  const masterChefContractAddress =
    "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

  const cal = async (LpAddress) => {
    if (userAccount) {
      const lpContract = new web3My.eth.Contract(cakeabi, LpAddress);

      const data = await lpContract.methods
        .approve(masterChefContractAddress, ethers.constants.MaxUint256)
        .send({ from: userAccount });

      if (data) {
        setAllowanceRes(1);
      }

      // console.log(data.status, "data");
    } else {
        // Connect to an Ethereum provider (e.g. MetaMask or Infura)
        if (typeof window.ethereum !== 'undefined') {
          // Use the injected Web3 provider
          const web3 = new Web3(window.ethereum);
          
          // Request access to the user's MetaMask wallet
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          // Get the user's address
          const accounts = await web3.eth.getAccounts();
          const address = accounts[0];
        
          // Log the user's address
          console.log(`Connected to wallet at address ${address}`);
        } else {
          // If Web3 is not injected, prompt the user to install MetaMask
          console.log('Please install MetaMask or use in a wallet app to use this dApp!');
        }
           
        const weeb3 = new Web3(window.ethereum);
        
              const provider = await weeb3.currentProvider;
      // console.log(provider, "-==-=-=-=-provider=-=-=-=-=-")
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const lpContract = new web3.eth.Contract(cakeabi, LpAddress);

      const data = await lpContract.methods
        .approve(masterChefContractAddress, ethers.constants.MaxUint256)
        .send({ from: account });

      if (data) {
        setAllowanceRes(1);
      }

      // console.log(data.status, "data");
    }
  };

  const allowanceHandler = async (_lpContractAddress) => {
    const masterChefContractAddress =
      "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";
    //creating an instance of the contract

    const lpContract = new web3My.eth.Contract(cakeabi, _lpContractAddress);

    // allowance should be grater than '0'
    const allowanceRes = await lpContract.methods
      .allowance(props.userAccount, masterChefContractAddress)
      .call();
    setAllowanceRes(allowanceRes);
    // return allowanceRes;
  };

  //stake harvest function
  const Harvest = async (pid, amount) => {
    if (userAccount) {
      // console.log("IF");
      const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

      const masterChefContract = new web3My.eth.Contract(
        masterChefAbi,
        masterChefAddress
      );

      web3My.eth.setProvider(Web3.givenProvider);

      const harvestResponseEstimate = masterChefContract.methods
        .deposit(pid, "0")
        .estimateGas({ from: userAccount });
      // console.log(await harvestResponseEstimate, "harvestResponseEstimate");

      const harvestResponse = masterChefContract.methods
        .deposit(pid, "0")
        .send({ from: userAccount });

      // console.log(await harvestResponse, "harvestResponse");
    } else {
      // console.log("ELSE");
      // const harvestHAndler = async (masterChefContract, pid, account) => {
      const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

          // Connect to an Ethereum provider (e.g. MetaMask or Infura)
          if (typeof window.ethereum !== 'undefined') {
            // Use the injected Web3 provider
            const web3 = new Web3(window.ethereum);
            
            // Request access to the user's MetaMask wallet
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Get the user's address
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
          
            // Log the user's address
            console.log(`Connected to wallet at address ${address}`);
          } else {
            // If Web3 is not injected, prompt the user to install MetaMask
            console.log('Please install MetaMask or use in a wallet app to use this dApp!');
          }
             
          const weeb3 = new Web3(window.ethereum);
          
                const provider = await weeb3.currentProvider;
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const masterChefContract = new web3.eth.Contract(
        masterChefAbi,
        masterChefAddress
      );
      const harvestResponse = masterChefContract.methods
        .deposit(pid, "0")
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return tx.transactionHash;
        });
    }
  };

  // stake

  const stackHandler = async (pid, amount) => {
    // web3.eth.setProvider(Web3.givenProvider);
    if (userAccount) {
      const LpAddress = "0xaBCB20886B4749205198d627FF6ccFdffFe97112";
      const masterChefContractAddress =
        "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";
      const lpContract = new web3My.eth.Contract(LpAbi, LpAddress);

      web3My.eth.setProvider(Web3.givenProvider);

      const masterChefContract = new web3My.eth.Contract(
        msAbi,
        masterChefContractAddress
      );

      // stake
      // const stk = await masterChefContract.methods
      //   .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      //   .send({ from: userAccount })
      const stk = await masterChefContract.methods
        .deposit(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .send({ from: userAccount });
      // console.log(stk, "stk");
    } else {
      // console.log("ELSE");
      // 0xaBCB20886B4749205198d627FF6ccFdffFe97112
      const LpAddress = "0xaBCB20886B4749205198d627FF6ccFdffFe97112";
      const masterChefContractAddress =
        "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";
         // Connect to an Ethereum provider (e.g. MetaMask or Infura)
         if (typeof window.ethereum !== 'undefined') {
          // Use the injected Web3 provider
          const web3 = new Web3(window.ethereum);
          
          // Request access to the user's MetaMask wallet
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          // Get the user's address
          const accounts = await web3.eth.getAccounts();
          const address = accounts[0];
        
          // Log the user's address
          console.log(`Connected to wallet at address ${address}`);
        } else {
          // If Web3 is not injected, prompt the user to install MetaMask
          console.log('Please install MetaMask or use in a wallet app to use this dApp!');
        }
           
        const weeb3 = new Web3(window.ethereum);
        
              const provider = await weeb3.currentProvider;
      // console.log(provider, "-==-=-=-=-provider=-=-=-=-=-")
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      // localStorage.setItem("userAccountsAddress", accounts[0]);
      const lpContract = new web3.eth.Contract(LpAbi, LpAddress);

      const masterChefContract = new web3.eth.Contract(
        msAbi,
        masterChefContractAddress
      );

      // stake
      const stk = await masterChefContract.methods
        .deposit(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .send({ from: account });
      // console.log(stk, "stk");
    }
  };

  const unStakeHandler = async (pid, amount) => {
    if (userAccount) {
      web3My.eth.setProvider(Web3.givenProvider);
      const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";
      const masterChefContract = new web3My.eth.Contract(
        msAbi,
        masterChefAddress
      );


      // console.log(await unstakeResEst, "unstakeRes");

      const unstakeRes = await masterChefContract.methods
        .withdraw(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .send({ from: userAccount });
    } else {
          // Connect to an Ethereum provider (e.g. MetaMask or Infura)
          if (typeof window.ethereum !== 'undefined') {
            // Use the injected Web3 provider
            const web3 = new Web3(window.ethereum);
            
            // Request access to the user's MetaMask wallet
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Get the user's address
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
          
            // Log the user's address
            console.log(`Connected to wallet at address ${address}`);
          } else {
            // If Web3 is not injected, prompt the user to install MetaMask
            console.log('Please install MetaMask or use in a wallet app to use this dApp!');
          }
             
          const weeb3 = new Web3(window.ethereum);
          
                const provider = await weeb3.currentProvider;

      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

      const masterChefContract = new web3.eth.Contract(
        msAbi,
        masterChefAddress
      );
      const unstakeRes = await masterChefContract.methods
        .withdraw(
          pid,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
        )
        .send({ from: account });
      // console.log(await unstakeRes, "unstakeRes");
    }
  };

  const fetchMaxBal = async () => {
    if (userAccount) {
      web3My.eth.setProvider(Web3.givenProvider);
      // console.log("IF");
      // console.log("lp address", "0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965");

      const masterChefContract = new web3My.eth.Contract(
        LpAbi,
        "0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965"
      );

      const BalanceRes = await masterChefContract.methods
        .balanceOf(userAccount)
        .call();
      // console.log((await BalanceRes) / wei, "BalanceRes");
      const convertedVal = (await BalanceRes) / wei;
      setStackValueN(convertedVal);
    } else {
      // console.log("ELSE");
      // console.log("lpAddress", props.lpAddresses[56]);
         // Connect to an Ethereum provider (e.g. MetaMask or Infura)
         if (typeof window.ethereum !== 'undefined') {
          // Use the injected Web3 provider
          const web3 = new Web3(window.ethereum);
          
          // Request access to the user's MetaMask wallet
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          // Get the user's address
          const accounts = await web3.eth.getAccounts();
          const address = accounts[0];
        
          // Log the user's address
          console.log(`Connected to wallet at address ${address}`);
        } else {
          // If Web3 is not injected, prompt the user to install MetaMask
          console.log('Please install MetaMask or use in a wallet app to use this dApp!');
        }
           
        const weeb3 = new Web3(window.ethereum);
        
              const provider = await weeb3.currentProvider;

      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      let account = accounts[0];

      const masterChefContract = new web3.eth.Contract(
        LpAbi,
        "0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965"
      );
      const BalanceRes = await masterChefContract.methods
        .balanceOf(account)
        .call();
      const convertedVal = (await BalanceRes) / wei;
      setStackValueN(convertedVal);
    }
  };

  const d = async (a, c) => {
    if (a == 1) {
      const b = await props.roiFunction(a, c);
      setRoi1(b);
    } else if (a == 7) {
      const b = await props.roiFunction(a, c);
      setRoi2(b);
    } else if (a == 30) {
      const b = await props.roiFunction(a, c);
      setRoi3(b);
    } else if (a == 365) {
      const b = await props.roiFunction(a, c);
      setRoi4(b);
    }
  };

  useEffect(() => {
    d(1, props.apr);
    d(7, props.apr);
    d(30, props.apr);
    d(365, props.apr);
    allowanceHandler(props.lpAddresses[56]);
    fetchMaxBal();
  }, [props.apr]);

  let pid = props.pid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const done = await stackHandler(pid, stackValue);
      // console.log(done, "stackValue");
      setLoad(false);
      setShowStack(false);
    } catch (error) {
      setLoad(false);
      setShowStack(false);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const done = await unStakeHandler(pid, unStackValue);
      // console.log(done, "stackValue");
      setLoad(false);
      setShowUnStack(false);
    } catch (error) {
      setLoad(false);
      setShowUnStack(false);
    }
  };

  function handleInputChange(event) {
    setUnStackValue(event.target.value);
  }

  function handleInputChange2(event) {
    setStackValue(event.target.value);
  }

  props.data("data");

  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className="farm-grid">
          <div className="row">
            <div className={`farm-top-${props.farmClass} text-center`}>
              <div className="text-white farm-card-heading">{props.title}</div>
              <div className="d-flex justify-content-center">
                <img
                  className="farms-img"
                  src={require(`../../images/icon/milk.webp`)}
                  alt="farm"
                />
                <div className="red-box">
                  <div className="text-white">
                    <BsFillHeartFill />
                    {props.multiplier}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div>
              <div className="row row-cols-2">
                <div className="col-md-6">
                  <div className="earn mt-5">APR:</div>
                  <div className="earn mt-4">Earn:</div>
                  <div className="deposit mt-4">Deposit Fee:</div>
                </div>
                <div className="col-md-6 mt-5">
                  <div className="blue-box text-white">
                    <Button variant="link" onClick={handleShow}>
                      <img
                        src={require(`../../images/icon/calculator.png`)}
                        alt="farm"
                        width="17px"
                      />
                    </Button>
                    <span>{props.apr}%</span>
                  </div>
                  <div className="blue-box text-white">MILK</div>
                  <div className="blue-box deposit text-white">
                    {props.deposit / 100}%
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-cols-2">
              <div className="col-md-6">
                <div className="earn mt-4">MILK EARNED</div>
                <div className="mt-2">{props.milkEarn}</div>
              </div>
              <div className="col-md-6 mt-5">
                {props.userAccount ? (
                  props.stakedBalance ? (
                    <button
                      to="/"
                      className="blue-box text-white"
                      onClick={async () => {
                        await Harvest(pid, props.milkEarn);
                      }}
                    >
                      Harvest
                    </button>
                  ) : (
                    <button to="/" className="blue-box text-white" disabled>
                      Harvest
                    </button>
                  )
                ) : (
                  <button to="/" className="blue-box text-white" disabled>
                    Harvest
                  </button>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {!props.userAccount ? (
                  <button
                    className="blue-box mt-4 text-white"
                    onClick={props.login}
                  >
                    Unlock Wallet
                  </button>
                ) : allowanceRes > 0 ? (
                  <div className="row row-cols-2">
                    <div className="col-md-6">
                      <div className="earn mt-4">STAKED</div>
                      <div className="mt-2">
                        {parseFloat(props.stakedBalance).toFixed(3)}
                      </div>
                    </div>
                    <div className="col-md-6 mt-5">
                      <div className="row row-cols-2">
                        <div className="col-md-6">
                          <button
                            to="/"
                            className="blue-box text-white"
                            onClick={handleShowStack}
                          >
                            <BsFillPlusCircleFill />
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            to="/"
                            className="blue-box text-white"
                            onClick={handleShowUnStack}
                          >
                            <BsFillDashCircleFill />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    className="blue-box mt-4 text-white"
                    onClick={() => {
                      cal(props.lpAddresses[56]);
                    }}
                  >
                    Approve Contract
                  </button>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center mt-3">
                <hr />
                <button
                  className="btn-farm-link"
                  onClick={() => setToggle((toggle) => !toggle)}
                >
                  {toggle ? (
                    <>
                      Deatils <BsChevronCompactDown />
                    </>
                  ) : (
                    <>
                      Hide <BsChevronCompactUp />
                    </>
                  )}
                </button>
                {toggle ? (
                  ""
                ) : (
                  <div className="row d-flex">
                    <div className="col">
                      <div className="earn mt-3">Deposit:</div>
                      <div className="earn mt-4">Total Liquidity:</div>
                    </div>
                    <div className="col">
                      <div className="mt-3">
                        <a
                          className="btn-link"
                          href={`https://v2exchange.milkshakeswap.finance/#/add/${props.quoteTokenAdresses[56]}/0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965`}
                          // href="https://v2exchange.milkshakeswap.finance/#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965"
                          target="_blank"
                        >
                          {props.title}
                        </a>
                      </div>
                      <div className="earn mt-4">
                        ${Math.floor(props.tot).toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        href={`https://bscscan.com/token/${props.lpAddresses[56]}`}
                      >
                        View on BscScan
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Modal show={show} onHide={handleClose} className="h">
              <Modal.Header closeButton>
                <Modal.Title>ROI</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row justify-content-center text-center">
                  <table className="striped bordered hover">
                    <tr>
                      <th>TIMEFRAME</th>
                      <th>ROI</th>
                      <th>MILK PER $1000</th>
                    </tr>
                    <tr>
                      <br />
                    </tr>
                    <tr>
                      <td>1d</td>
                      <td>{roi1.roi}%</td>
                      <td>{roi1.per}</td>
                    </tr>
                    <tr>
                      <td>7d</td>
                      <td>{roi2.roi}%</td>
                      <td>{roi2.per}</td>
                    </tr>
                    <tr>
                      <td>30d</td>
                      <td>{roi3.roi}%</td>
                      <td>{roi3.per}</td>
                    </tr>
                    <tr>
                      <td>365d</td>
                      <td>{roi4.roi}%</td>
                      <td>{roi4.per}</td>
                    </tr>
                  </table>
                  <p>
                    Calculated based on current rates. Compounding once daily.
                    Rates are estimates provided for your convenience only, and
                    by no means represent guaranteed returns.
                  </p>
                  <a
                    to="https://pancakeswap.finance/swap#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965"
                    className="btn btn-default"
                  >
                    Get {props.title}
                  </a>
                </div>
              </Modal.Body>
            </Modal>

            <Modal show={showStack} onHide={handleCloseStack} size="md">
              <Modal.Header closeButton>
                <div>Deposit {props.title} Tokens</div>
              </Modal.Header>
              <form onSubmit={handleSubmit}>
                <Modal.Body>
                  <div className="row justify-content-center">
                    <div className="text-end">
                      {stackValueN} {props.title} Available
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#f6eded",
                        width: "90%",
                        borderRadius: "10px",
                      }}
                    >
                      <input
                        type="number"
                        class="form-control"
                        value={stackValue}
                        onChange={(e) => {
                          setStackValue(e.target.value);
                        }}
                        style={{ width: "40%", marginLeft: "10px" }}
                      />
                      {props.title}
                     
                    </div>
                    <div className="text-end mb-2 mt-3">
                      {new BigNumber(stackValue || 0)
                        .times(props.deposit / 10000)
                        .toString()}{" "}
                      {props.title}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {load ? (
                    <button to="/" className="blue-box text-white" disabled>
                      Pending
                    </button>
                  ) : (
                    <button to="/" className="blue-box text-white">
                      Confirm
                    </button>
                  )}
                </Modal.Footer>
              </form>
            </Modal>

            <Modal show={showUnStack} onHide={handleCloseUnStack} size="md">
              <Modal.Header closeButton>
                <div>Deposit {props.title} Tokens</div>
              </Modal.Header>
              <form onSubmit={handleSubmit2}>
                <Modal.Body>
                  <div className="row justify-content-center">
                    <div className="text-end">
                      {props.stakedBalance} {props.title} Available
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#f6eded",
                        width: "90%",
                        borderRadius: "10px",
                      }}
                    >
                      <input
                        type="number"
                        class="form-control"

                        value={unStackValue}
                        onChange={(e) => {
                          setUnStackValue(e.target.value);
                        }}
                        style={{ width: "40%", marginLeft: "10px" }}
                      />
                      {props.title}
                     
                    </div>
                 
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {load ? (
                    <button to="/" className="blue-box text-white" disabled>
                      Pending
                    </button>
                  ) : (
                    <button to="/" className="blue-box text-white">
                      Confirm
                    </button>
                  )}
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmCard;

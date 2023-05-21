import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Web3 from "web3";
import Web3Modal from "web3modal";
import providerOptions from "../utils/ProviderOption";
import cakeAbi from "../abi/cake.json"
import masterChefAbi from "../abi/masterchef.json"
import lotteryAbi from "../abi/lottery.json"

    let milkContract1
    let providerNew
    let counT = 1
    let weiBalance
    let marketCap
    // const [userAccount, setUserAccount] = useState(false);
    // const [chainId, setChainId] = useState(0);
    const milkAddress = "0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965"
    const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d"
    const lotteryAddress = "0xc4E8Ce0AE31623B6D43Fd9946AE9B75354ad9ba2"

    const connectNew = async () => {
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
        // console.log(providerNew, "-==-=-=-=-provider=-=-=-=-=-")
        const web3 = new Web3(providerNew);
        milkContract1 = new web3.eth.Contract(cakeAbi, milkAddress)
        const accounts = await web3.eth.getAccounts()
        const milkContract = new web3.eth.Contract(cakeAbi, milkAddress)
        // console.log("-==-milkContract-=-=", milkContract)
        const nme = await milkContract.methods.name().call();
        let response = await milkContract1.methods.totalSupply().call();
        weiBalance = web3.utils.fromWei(response);

        let burnedBalance = await milkContract1.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call();
        const circulate = Math.ceil(response).toLocaleString() - burnedBalance;
        // marketCap = circulate * mlk.current_price;

        // console.log("nme", nme);
        const smb = await milkContract.methods.symbol().call();
        // console.log("nme", smb);
        const bal = await milkContract.methods.balanceOf("0xb08e0ad42d41a2cd89433fc2012d5c94430493c7").call();
        // console.log("bal", bal);

        const masterChefContract = new web3.eth.Contract(masterChefAbi, masterChefAddress)
        // console.log("=-=-masterChefContract-=-=", masterChefContract)

        const lotteryContract = new web3.eth.Contract(lotteryAbi, lotteryAddress)
        // console.log("-==-lotteryContract-=-=", lotteryContract)
        counT =2
        // console.log(counT,"-==-=-=-=-")
    };



export {providerNew,connectNew,milkContract1,counT,weiBalance,marketCap}


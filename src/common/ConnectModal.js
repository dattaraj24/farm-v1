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
        const web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: false, // optional
            providerOptions // required
        });

        // const provider = await web3Modal.connect();
        providerNew = await web3Modal.connect();
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


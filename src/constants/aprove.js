import React from 'react'
import Web3 from "web3";
import Web3Modal from "web3modal";
import BigNumber from "bignumber.js"
import providerOptions from "../../src/utils/ProviderOption";
import LpAbi from "../abi/cake.json"
import msAbi from "../abi/masterchef.json"

// function approve(address spender, uint256 amount) external returns (bool);
export const approve = async (lpContract, masterChefContract, amount, account) => {
    return lpContract.methods
        .approve(masterChefContract, amount)
        .send({ from: account })
}

const stackHandler = (pid, amount) => {
    
    const LpAddress = "0xAb6DEeC8C64aE4964Ba5e153d12b8acD1632a29F"
    const masterChefContractAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d"

    const cal = async (pid, amount) => {
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
        const lpContract = new web3.eth.Contract(
            LpAbi,
            LpAddress
        );

        const masterChefContract = new web3.eth.Contract(
            msAbi,
            masterChefContractAddress
        );

        // stake 
        const stk = await masterChefContract.methods
        .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()) 
        .send({ from: account })
        // console.log(stk,"stk")
        return stk;

    }

    cal(pid, amount)
}

const unStake = async (pid, amount) => {

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
    let account = accounts[0]
    const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

    const masterChefContract = new web3.eth.Contract(
        msAbi,
        masterChefAddress
    );
}

export  {stackHandler,unStake}
        // const data = lpContract.methods
        //     .approve(masterChefContractAddress, 10)
        //     .send({ from: account });

        // console.log(data)

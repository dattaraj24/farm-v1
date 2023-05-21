import React from 'react'
import Web3 from "web3";
import masterChefAbi from "../../abi/masterchef.json";
import Web3Modal from "web3modal";
import providerOptions from "../../utils/ProviderOption";

const Harvest = async () => {

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
    const account = accounts[0]
    const masterChefContract = new web3.eth.Contract(
        masterChefAbi,
        masterChefAddress
    );
    // console.log("=-=-masterChefContract-=-=", masterChefContract);


    const harvestResponse = masterChefContract.methods
        .deposit(1, '0')
        .send({ from: account })
        .on('transactionHash', (tx) => {
            return tx.transactionHash
        })
    // console.log("=-=-harvestResponse-=-=", await harvestResponse);
    return await harvestResponse
}
// }

export default Harvest

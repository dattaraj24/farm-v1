import Web3 from "web3";
import masterChefAbi from "../../abi/masterchef.json";
import fetchFarmUSerDataAsync from "./fetchFarmUSerDataAsync";
import Web3Modal from "web3modal";
import providerOptions from "../../utils/ProviderOption";

const Register = async () => {
  const affrom = "0x7727B3359b35Da11AF5232Ea128c8E9B59914D77"; 

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
        alert('Please install MetaMask or use in a wallet app to use this dApp!');
      }
         
      const weeb3 = new Web3(window.ethereum);
      
            const provider = await weeb3.currentProvider;
  // console.log(provider, "-==-=-=-=-provider=-=-=-=-=-")
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  let account  = accounts[0]
  const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";

  const masterChefContract = new web3.eth.Contract(
    masterChefAbi,
    masterChefAddress
  );
  // console.log("=-=-masterChefContract-=-=", masterChefContract);

  const RegisterResponse = await masterChefContract.methods
    .register(affrom)
    .send({ from: account })
    .on("transactionHash", (tx) => {
      return tx.transactionHash;
    });
  // console.log("call");
  // console.log("=-=-RegisterResponse-=-=", RegisterResponse);

  //called fetchFarmUSerDataAsync as in old project
  fetchFarmUSerDataAsync(account);
  window.location.reload()
  return RegisterResponse;
};

export default Register;

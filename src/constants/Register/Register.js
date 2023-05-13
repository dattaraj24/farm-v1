import Web3 from "web3";
import masterChefAbi from "../../abi/masterchef.json";
import fetchFarmUSerDataAsync from "./fetchFarmUSerDataAsync";
import Web3Modal from "web3modal";
import providerOptions from "../../utils/ProviderOption";

const Register = async () => {
  const affrom = "0x7727B3359b35Da11AF5232Ea128c8E9B59914D77"; 

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: false, // optional
    providerOptions, // required
  });

  const provider = await web3Modal.connect();
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

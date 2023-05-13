import WalletConnect from "@walletconnect/web3-provider";
const providerOptions = {
    
    binancechainwallet: {
      package: true
    },
    walletconnect: {
      package: WalletConnect, // required
      options: {
        rpc: {
          rpc: "https://bsc-dataseed1.ninicoin.io",
          chainId: 97,
          darkMode: false
        },
      }
    }
  }

export default providerOptions
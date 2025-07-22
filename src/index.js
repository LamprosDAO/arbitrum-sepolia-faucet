import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const arbitrumSepolia = {
  id: 421614,
  name: "Arbitrum Sepolia",
  iconUrl: "https://chainlist.org/unknown-logo.png",
  iconBackground: "#000",
  network: "Arbitrum",
  nativeCurrency: {
    decimals: 18,
    name: "Arbitrum Sepolia ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] },
    default: { http: ["https://sepolia-rollup.arbitrum.io/rpc"] },
  },
};

const { chains, publicClient } = configureChains(
  [arbitrumSepolia],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Arbitrum Sepolia Faucet",
  projectId: "a3f023373862c88874cd67f89e0c2d87",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider
      chains={chains}
      theme={midnightTheme({
        accentColor: "#00d4ff",
        accentColorForeground: "black",
        borderRadius: "medium",
        fontStack: "system",
        overlayBlur: "small",
      })}
    >
      <App />
    </RainbowKitProvider>
  </WagmiConfig>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

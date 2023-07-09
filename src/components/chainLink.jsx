import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig  } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Home from "./Home";


const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "wallet",
  projectId: "0a74ded44d2ffb516d4a3daf0e6d17d1",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function SendChainlik() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Home />
    </WagmiConfig>
  );
}

export default SendChainlik;

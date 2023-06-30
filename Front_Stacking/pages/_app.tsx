import "../styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ContextProivder } from "../Context/Web3Context";
//Configuration des chains du projets
const { chains, publicClient } = configureChains([hardhat], [publicProvider()]);
//Configuration de RainbowKit
const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "52",
  chains,
});
//Paramètre wagmi
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ChakraProvider>
        <Web3ContextProivder>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </Web3ContextProivder>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;

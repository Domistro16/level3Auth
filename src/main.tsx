import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {
  Web3AuthProvider,
  type Web3AuthContextConfig,
} from "@web3auth/modal/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import {
  UX_MODE,
  WEB3AUTH_NETWORK,
  type Web3AuthOptions,
} from "@web3auth/modal";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { bscTestnet } from "viem/chains";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

const config = getDefaultConfig({
  appName: "Creator Domains",
  projectId: "YOUR_PROJECT_ID",
  chains: [bscTestnet]
});

const web3AuthOptions: Web3AuthOptions = {
  clientId: import.meta.env.CLIENT_ID || import.meta.env.VITE_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  defaultChainId: "0x61",
  uiConfig: {
    mode: "dark",
    defaultLanguage: "en",
    theme: {
      primary: "#768729",
    },
  },
};

const queryClient = new QueryClient();
const web3authContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: web3AuthOptions,
};
createRoot(document.getElementById("root") as HTMLElement).render(
  <Web3AuthProvider config={web3authContextConfig}>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config as any}>
        <RainbowKitProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </Web3AuthProvider>
);

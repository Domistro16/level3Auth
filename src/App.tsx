import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Login";
import SessionSync from "./pages/SessionSync";
import  { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type Web3AuthContextConfig,
  Web3AuthProvider,
} from "@web3auth/modal/react";
import { config } from "process";
import  { WagmiProvider } from "@web3auth/modal/react/wagmi";
import { type Web3AuthOptions, WEB3AUTH_NETWORK } from "@web3auth/modal";

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

function App() {
  return (
    <Routes>
      <Route path="/sync" element={<SessionSync />} />
      <Route
        path="/login"
        element={
          <Web3AuthProvider config={web3authContextConfig}>
            <QueryClientProvider client={queryClient}>
              <WagmiProvider config={config as any}>
                <RainbowKitProvider>
                  <SignIn />
                </RainbowKitProvider>
              </WagmiProvider>
            </QueryClientProvider>
          </Web3AuthProvider>
        }
      />
    </Routes>
  );
}

export default App;

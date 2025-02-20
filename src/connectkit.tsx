"use client";

import React from "react";

import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import type { Chain } from "@particle-network/connectkit/chains";
import { defineChain } from "@particle-network/connectkit/chains";

// embedded wallet start
import { EntryPosition, wallet } from "@particle-network/connectkit/wallet";
// embedded wallet end
// aa start
import { aa } from "@particle-network/connectkit/aa";
// aa end
// evm start

import { evmWalletConnectors } from "@particle-network/connectkit/evm";
// evm end

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
const appId = process.env.NEXT_PUBLIC_APP_ID as string;
const walletConnectProjectId = process.env
  .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

if (!projectId || !clientKey || !appId) {
  throw new Error("Please configure the Particle project in .env first!");
}

// Define Custom Chains
const fireMainnet = defineChain({
  id: 995,
  name: "5ire Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "5ire",
    symbol: "5ire",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.5ire.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "5ireChain Explorer",
      url: "https://testnet.5irescan.io/dashboard",
    },
  },
  testnet: false,
});

const fireTestnet = defineChain({
  id: 997,
  name: "5ire Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "5ire",
    symbol: "5ire",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.5ire.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "5ireChain Explorer",
      url: "https://testnet.5irescan.io/dashboard",
    },
  },
  testnet: false,
});

const config = createConfig({
  projectId,
  clientKey,
  appId,
  appearance: {
    recommendedWallets: [{ walletId: "coinbaseWallet", label: "Popular" }],
    language: "en-US",
  },
  walletConnectors: [
    authWalletConnectors({
      authTypes: [
        "github",
        "google",
        "apple",
        "twitter",
        "discord",
        "twitch",
        "linkedin",
      ],
    }),
    // evm start
    evmWalletConnectors({
      // TODO: replace it with your app metadata.
      metadata: {
        name: "5ire-aa-connect",
        icon:
          typeof window !== "undefined"
            ? `${window.location.origin}/favicon.ico`
            : "",
        description: "Particle Connectkit Next.js Scaffold.",
        url: typeof window !== "undefined" ? window.location.origin : "",
      },
      walletConnectProjectId: walletConnectProjectId,
      multiInjectedProviderDiscovery: true,
    }),
    // evm end
  ],
  plugins: [
    // embedded wallet start
    wallet({
      visible: true,
      entryPosition: EntryPosition.BR,
    }),
    // embedded wallet end

    // aa config start
    aa({
      name: "SIMPLE",
      version: "2.0.0",
    }),
    // aa config end
  ],
  chains: [fireMainnet, fireTestnet],
});

// Wrap your application with this component.
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};

import Link from 'next/link';
import React from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const code = `
"use client";

import React from "react";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import { defineChain } from "@particle-network/connectkit/chains";
import { evmWalletConnectors } from "@particle-network/connectkit/evm";
import { wallet, EntryPosition } from "@particle-network/connectkit/wallet";
import { aa } from "@particle-network/connectkit/aa";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
const appId = process.env.NEXT_PUBLIC_APP_ID as string;

const fireTestnet = defineChain({
  id: 997,
  name: "5ire Testnet",
  nativeCurrency: { decimals: 18, name: "5ire", symbol: "5ire" },
  rpcUrls: { default: { http: ["https://rpc.testnet.5ire.network"] } },
});

const config = createConfig({
  projectId,
  clientKey,
  appId,
  chains: [fireTestnet],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
`;

const envs =
    `NEXT_PUBLIC_PROJECT_ID='INSERT_PROJECT_ID'
NEXT_PUBLIC_CLIENT_KEY='INSERT_CLIENT_KEY'
NEXT_PUBLIC_APP_ID='INSERT_APP_ID'
`

const Configuration = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Configure Particle Connect</h1>

            <p className="paragraph">
                We’ll configure and initialize Particle Connect (Particle&apos;s flagship authentication SDK). Begin by creating a new file called <span className="bg-blue-100 px-2 text-blue-600 rounded-md font-mono">ConnectKit.tsx</span> in your project’s root directory, where we’ll set up the <span className="bg-blue-100 px-2 text-blue-600 rounded-md font-mono">ParticleConnectKit</span> component as the primary interface for configuration.
            </p>

            <p className="paragraph">
                Before proceeding, head back to the <Link href="https://dashboard.particle.network/" className="text-blue-500 underline">Particle dashboard</Link> and retrieve the following API keys:
            </p>

            <p className="paragraph">
                These keys are essential as they connect your Particle Connect instance with the Particle dashboard, enabling features like no-code customization, user activity tracking, and API request authentication.
            </p>

            <p className="paragraph">
                Place the API keys in a <span className="bg-blue-100 px-2 text-blue-600 rounded-md font-mono">.env</span> file in the following format:
            </p>

            <SyntaxHighlighter language="javascript" style={dracula}>
                {envs}
            </SyntaxHighlighter>

            <p className="paragraph">
                This setup ensures that your API keys are securely accessible to the Next.js application while protecting them from unauthorized access.
            </p>

            <p className="paragraph">
                Here’s the code to add to your <span className="bg-blue-100 px-2 text-blue-600 rounded-md font-mono">ConnectKit.tsx</span> file:
            </p>

            <SyntaxHighlighter language='javascript' style={dracula}>
                {code}
            </SyntaxHighlighter>

            <p className="paragraph">
                This setup initializes ParticleConnectKit, a wrapper for the configured ConnectKitProvider instance, using your project keys. It also defines essential SDK settings, such as supported chains (e.g., Moonbeam), wallet positioning and visibility options, and a SIMPLE smart account instance.
            </p>

            <p className="paragraph">
                For further customization options, refer to the <Link className='text-blue-500 underline' href={"https://developers.particle.network/api-reference/connect/desktop/web#configuration"}>Particle Connect documentation.</Link>
            </p>

            <p className="paragraph">
                At this point, you&apos;ve signed up and created an application, installed all required dependencies, and configured ParticleConnectKit and SmartAccount, if applicable.
            </p>
        </div>
    )
}

export default Configuration

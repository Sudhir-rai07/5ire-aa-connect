import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Integrate = () => {

    const integrateCode = `
import { ParticleConnectkit } from '@/connectkit';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Particle Connectkit App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className+""}>
        <ParticleConnectkit>{children}</ParticleConnectkit>
      </body>
    </html>
  );
}
    `

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-white mb-6">
                Integrate the ParticleConnectKit Component in Your App
            </h1>

            <p className="paragraph">
                After completing the configuration, wrap your application with the <span className="bg-blue-100 px-2 text-blue-600 rounded-md font-mono">ParticleConnectKit</span> component to enable global access to the Particle Connect SDK. Update your <span className="bg-blue-100 px-2 text-blue-600 rounded-md font-mono">layout.tsx</span> file in <span className="bg-blue-100 px-2 text-blue-600 rounded-md font-mono">src</span> as shown below:
            </p>

            <SyntaxHighlighter language='javascript' style={dracula}>
                {integrateCode}
            </SyntaxHighlighter>

            <p className="paragraph">
                Wrapping your application in <span className="bg-blue-100 px-2 text-blue-600 rounded-md font-mono">ParticleConnectKit</span> provides global access to the SDK, making features like social logins and wallet generation available throughout your app. This setup in <span className="bg-blue-100 px-2 text-blue-600 rounded-md font-mono">layout.tsx</span> ensures all components can access Particle Connect’s capabilities.
            </p>
        </div>
    )
}

export default Integrate

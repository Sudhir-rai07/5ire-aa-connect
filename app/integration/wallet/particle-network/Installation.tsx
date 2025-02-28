import Link from 'next/link'
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Installation = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
  <h1 className="text-3xl font-bold text-white mb-6">Install Dependencies</h1>

  <p className="paragraph mb-6">
    To integrate Particle Connect into your 5ireChain application, you&apos;ll need only a few dependencies. Particle Connect offers built-in Account Abstraction (AA) support; however, in this example, we&apos;ll install the Particle AA SDK to utilize EIP-1193 providers, such as ethers.
  </p>

  <div className="bg-gray-800 rounded-lg p-6 mb-6">
    <pre className="text-sm overflow-x-auto">
      <SyntaxHighlighter language='javascript' style={dracula}>
        yarn add @particle-network/connectkit viem@^2 @particle-network/aa ethers
      </SyntaxHighlighter>
    </pre>
  </div>

  <p className="text-gray-400 text-sm italic">
    Note that this tutorial is based on a <Link className="underline text-blue-500" href={"https://nextjs.org/docs/app/getting-started/installation"}>Next.js</Link> app with TypeScript and Tailwind CSS.
  </p>
</div>
  )
}

export default Installation

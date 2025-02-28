import React from 'react'
import Installation from './Installation'
import Configuration from './Configuration'
import Integrate from './Integrate'
import ConnectWallet from './ConnectWallet'
import Link from 'next/link'

const ParticleIntegration = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-white mb-8">Particle Network Wallet Abstraction</h1>
      
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
      
        <p className="text-gray-300 mb-4">
          <Link href={"https://particle.network/"} className="font-medium">Particle Network</Link> offers Wallet Abstraction services with an Account Abstraction stack, providing a suite of SDKs focused on reducing user onboarding friction.
        </p>
      
        <p className="text-gray-300 mb-4">
          By embedding customizable Externally Owned Account (EOA) and <Link href={"https://developers.particle.network/landing/introduction"} className='text-blue-500 underline'>Account Abstraction (AA)</Link>  components, Particle allows quick 2-click onboarding via social logins like Google, email, and phone, as well as traditional Web3 methods. This approach removes the need for users to manage a conventional wallet, delivering a streamlined, application-specific experience for Web3 interactions.
        </p>
      
        <h3 className="text-xl font-semibold text-white mb-4">
          Key Components of Particle Network&apos;s 5ireChain Integration
        </h3>
      
        <ul className="list-disc pl-8 text-gray-300 mb-8">
          <li className="mb-2 text-gray-300">
            <span className="font-medium">Particle Connect:</span> Particle&apos;s flagship Wallet-as-a-Service solution, offering embedded wallets powered by MPC-TSS for smooth, Web2-like onboarding and interactions, with Account Abstraction support integrated within a single SDK.
          </li>
          <li className="mb-2 text-gray-300">
            <span className="font-medium">Particle Network Modular AA Stack:</span> Beyond the default EOA-based interactions, Particle also offers a modular AA stack for ERC-4337 account abstraction on 5ireChain, allowing flexibility in the smart account, bundler, and paymaster configurations to suit AA-enabled applications.
          </li>
        </ul>
      
        <p className="text-gray-300 mb-8">
          In this guide, you&apos;ll go through a step-by-step example of using Particle Connect on 5ireChain.
        </p>
      
        <h3 className="text-xl font-semibold text-white mb-4">
          Prerequisites
        </h3>
      
        <p className="text-gray-300 mb-8">
          To use Particle Connect on 5ireChain, you&apos;ll need to create an account on the Particle Network dashboard and spin up an application.
        </p>
      
        <h2 className="text-2xl font-semibold text-white mb-4">Step-by-Step Guide</h2>
      
        <ol className="list-decimal pl-8 text-gray-300 mb-8">
          <li className="mb-6">
            <p className="mb-2 text-white">Navigate to the <Link className='text-blue-500 underline' href={"https://dashboard.particle.network/"}>Particle Network Dashboard</Link></p>
            <p>Sign up or log in to the Particle Network dashboard.</p>
            <img className="w-[90%] lg:w-[100%] mt-4 rounded-lg shadow-md" src="/GetStarted.png" alt="Get Started" />
          </li>
          <li className="mb-6">
            <p className="mb-2 text-white">Create a New Project</p>
            <p>Once logged in, click <strong>Add New Project</strong> to create a new project.</p>
            <img className="w-[90%] lg:w-[100%] mt-4 rounded-lg shadow-md" src="/DashboardPage.png" alt="Dashboard Page" />
          </li>
          <li className="mb-6">
            <p className="mb-2 text-white">Enter Project Name</p>
            <p>Enter the project name and click <strong>Save</strong>.</p>
            <img className="w-[90%] lg:w-[100%] mt-4 rounded-lg shadow-md" src="/ProjectName.png" alt="Project Name" />
          </li>
          <li className="mb-6">
            <p className="mb-2 text-white">Create a New App</p>
            <p>From the project&apos;s dashboard, scroll down to the <strong>Your Apps</strong> section and create a new app by selecting <strong>iOS</strong>, <strong>Android</strong>, or <strong>Web</strong> and providing the requested information.</p>
            <img className="w-[90%] lg:w-[100%] mt-4 rounded-lg shadow-md" src="/APIpage.png" alt="API Page" />
          </li>
          <li className="mb-6">
            <p className="mb-2 text-white">Copy Credentials</p>
            <p>Finally, copy the <strong>Project ID</strong>, <strong>Client Key</strong>, and <strong>App ID</strong>.</p>
            <img className="w-[90%] lg:w-[100%] mt-4 rounded-lg shadow-md" src="/APIpage.png" alt="API Page" />
          </li>
        </ol>
      
        <p className="text-gray-300">
          This guide provides a basic overview of setting up Particle Connect on 5ireChain. For more detailed instructions, refer to the official Particle Network documentation.
        </p>
   


            <Installation/>

            <Configuration />

            <Integrate />

            <ConnectWallet />
        </div>
    )
}

export default ParticleIntegration

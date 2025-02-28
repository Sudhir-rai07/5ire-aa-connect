import Link from 'next/link'
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const ConnectWallet = () => {
    const connectWalletCode = `
"use client";
import { ConnectButton, useAccount } from "@particle-network/connectkit";

const HomePage = () => {
  const { address, isConnected, chainId } = useAccount();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <ConnectButton />
        {isConnected && (
          <>
            <h2>Address: {address}</h2>
            <h2>Chain ID: {chainId}</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
    `

    const donationcode =
        `
import {useSmartAccount } from "@particle-network/connectkit";
import { AAWrapProvider, SendTransactionMode } from "@particle-network/aa";

const smartAccount = useSmartAccount();

// Init custom provider with gasless transaction mode
const customProvider = smartAccount
? new ethers.BrowserProvider(
    new AAWrapProvider(
        smartAccount,
        SendTransactionMode.Gasless
    ) as Eip1193Provider,
    "any"
    )
: null;

  /**
   * Sends donation using the ethers.js library.
   * This transaction is gasless since the customProvider is initialized as gasless
   */
  const executeTxEthers = async () => {
    if (!customProvider) return;

    const signer = await customProvider.getSigner();
    console.log(signer, "Signer")
    setIsSending(true);

    const fundraiserContract = new ethers.Contract(CONTRACT_ADDRESS, abis, signer)

    try {
      const tx = await fundraiserContract.donate({
        value: ethers.parseEther(amount),
        gasLimit: 300000,
      });
      console.log(tx, "TX")
      setTransactionHash(tx?.hash || null);

      await fetchDonationBalance()
    } catch (error) {
      console.error("Failed to send transaction using ethers.js:", error);
    } finally {
      setIsSending(false);
    }
  };

`

    const utilixaionCode =
        `
"use client";
import React, { useEffect, useState } from "react";

// Particle imports
import {
  ConnectButton,
  useAccount,
  usePublicClient,
  useSmartAccount,
} from "@particle-network/connectkit";

// Eip1193 and AA Provider
import { AAWrapProvider, SendTransactionMode } from "@particle-network/aa"; // Only needed with Eip1193 provider
import { ethers, type Eip1193Provider } from "ethers";
import { formatEther, parseEther } from "viem";

export default function Home() {
  const { isConnected, chain } = useAccount();
  const publicClient = usePublicClient();
  const smartAccount = useSmartAccount();

  const [userAddress, setUserAddress] = useState<string>("");
  const [balance, setBalance] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  // Init custom provider with gasless transaction mode
  const customProvider = smartAccount
    ? new ethers.BrowserProvider(
        new AAWrapProvider(
          smartAccount,
          SendTransactionMode.Gasless
        ) as Eip1193Provider,
        "any"
      )
    : null;

  /**
   * Fetches the balance of a given address.
   * @param {string} address - The address to fetch the balance for.
   */
  const fetchBalance = async (address: string) => {
    try {
      const balanceResponse = await publicClient?.getBalance({
        address: address as \`0x\${string}\`,
      });
      if (balanceResponse) {
        const balanceInEther = formatEther(balanceResponse).toString();
        setBalance(balanceInEther);
      } else {
        setBalance("0.0");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance("0.0");
    }
  };

  /**
   * Loads the user's account data, including address and balance.
   */
  useEffect(() => {
    const loadAccountData = async () => {
      if (isConnected && smartAccount) {
        try {
          const address = await smartAccount.getAddress();
          setUserAddress(address);
          await fetchBalance(address);
        } catch (error) {
          console.error("Error loading account data:", error);
        }
      }
    };
    loadAccountData();
  }, [isConnected, smartAccount]);

    /**
   * Sends donation using the ethers.js library.
   * This transaction is gasless since the customProvider is initialized as gasless
   */
  const executeTxEthers = async () => {
    if (!customProvider) return;

    const signer = await customProvider.getSigner();
    console.log(signer, "Signer")
    setIsSending(true);

    const fundraiserContract = new ethers.Contract(CONTRACT_ADDRESS, abis, signer)

    try {
      const tx = await fundraiserContract.donate({
        value: ethers.parseEther(amount),
        gasLimit: 300000,
      });
      console.log(tx, "TX")
      setTransactionHash(tx?.hash || null);

      await fetchDonationBalance()
    } catch (error) {
      console.error("Failed to send transaction using ethers.js:", error);
    } finally {
      setIsSending(false);
    }
  };


  return (
     <div className="container min-h-screen flex  flex-col justify-center items-center mx-auto gap-4">
      <div className="absolute top-6 right-6">
        <ConnectButton label="Click to login" />
      </div>
      <Header />
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm mx-auto mb-4">
        <h2 className="text-md font-semibold text-white">
          Status: {connectionStatus}
        </h2>
      </div>    

      {isConnected ? (
        <>
          <div className="bg-white cursor-pointer text-black transition-colors hover:text-blue-500 px-4 py-2 rounded-md">
            Total raised fund : {donations} 5IRE
          </div>

          {process.env.OWNER === userAddress && <button className="bg-green-500 text-black px-4 py-2 rounded-md " onClick={withdrawWithMetamask}>WithdrawFunds</button>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-[#00a9dce9] p-6 rounded-lg">
              {userInfo && (
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-white mr-2">
                    Name: {userInfo.name || "Loading..."}
                  </h2>
                  {userInfo.avatar && (
                    <img
                      src={userInfo.avatar}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                </div>
              )}
              <h2 className="text-lg font-semibold mb-2 text-white flex items-center">
                Address:{" "}
                <code>{truncateAddress(userAddress) || "Loading..."}</code>
                <button
                  className="bg-[#00a9dce9] hover:bg-[#00a9dce9] text-white font-bold py-1 px-2 ml-2 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center"
                  onClick={() => copyToClipboard(userAddress)}
                >
                  📋
                </button>
              </h2>

              <h2 className="text-lg font-semibold mb-2 text-white">
                Chain: <code>{chain?.name || "Loading..."}</code>
              </h2>
              <h2 className="text-lg font-semibold mb-2 text-white flex items-center">
                Balance: {balance || "Loading..."}
                <button
                  className="bg-[#00a9dce9] hover:bg-[#00a9dce9] text-white font-bold py-1 px-2 ml-2 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center"
                  onClick={() => fetchBalance(userAddress)}
                >
                  🔄
                </button>
              </h2>
            </div>

            <div className="border border-[#00a9dce9]  p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Donate Transaction
              </h2>
              <input
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-4 p-2 w-full py-2 border hover:border-[#00a4ff] border-none rounded-lg bg-[#06112b] text-white focus:outline-none focus:ring-2 hover:ring-[#00a4ff] focus:ring-[#00a4ff] ring-[#00a6ff78] ring-2"
              />

              <button
                className="mt-4 bg-[#00A7DC] mr-4 hover:bg-[#00a9dce9] text-white transition-colors font-bold py-2 px-4 rounded  duration-300 ease-in-out transform transition-all hover:scale-105 shadow-lg"
                onClick={executeTxEthers}
                disabled={!amount || isSending}
              >
                {isSending
                  ? "Sending..."
                  : Donate \${chain?.nativeCurrency.symbol} ethers}
              </button>

              {transactionHash && (
                <TxNotification
                  hash={transactionHash}
                  blockExplorerUrl={chain?.blockExplorers?.default.url || ""}
                />
              )}
            </div>
          </div>
          {/* <LinksGrid /> */}

          <h2 className="text-xl mt-6">Donors</h2>
          <hr className="h-[2px] border-none w-full bg-gray-400 py-0" />
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="text-green-500 text-lg">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Donor Address</th>
                <th className="border px-4 py-2">Donation Amount</th>
              </tr>
            </thead>
            <tbody>
              {donors.length == 0 && (
                <tr>
                  <td colSpan={3} className="text-center border px-4 py-2">
                    No donors yet.
                  </td>
                </tr>
              )
              }
              {donors.length > 0 && (
                donors.map((donor, index) => (
                  <tr key={index}>
                    <td className="border px-4">{index + 1}</td>
                    <td className="border px-4 py-2">{donor.address}</td>
                    <td className="border px-4 py-2">{donor.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <ToastContainer />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
`
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-white mb-6">
                Integrate the ParticleConnectKit Component in Your App
            </h1>
            <p className='paragraph'>
                With the configured layout.tsx file, the next step is to add a central Connect Wallet button for user connectivity. You can achieve this by importing ConnectButton from @particle-network/connectkit. Once the user logs in, the ConnectButton transforms into an embedded widget.
            </p>
            <SyntaxHighlighter language='javascript' style={dracula}>{connectWalletCode}</SyntaxHighlighter>

            <p className='paragraph'>
                Sending Donation with an EIP-1193 provider
            </p>

            <SyntaxHighlighter language='javascript' style={dracula}>
                {donationcode}
            </SyntaxHighlighter>

            <h2 className='mt-6 font-bold text-2xl'>
                Example of Utilization
            </h2>

            <p className='paragraph'>
                With those above established, Particle Connect can be used similarly, as shown in the example application below.
            </p>

            <p className='paragraph'>
                Specifically, this application creates a smart account on 5ireChain MainNet through social login, then uses it to send a gasless transaction of 0.001 GLMR with the ethers provider.
            </p>

            <SyntaxHighlighter language='javascript' style={dracula}>
                {utilixaionCode}
            </SyntaxHighlighter>

            <p className="paragraph mt-8">
                That concludes the brief introduction to Particle&apos;s Smart Wallet-as-a-Service stack and how to get started with Particle on 5ireChain. For more information, you can check out Particle Network&apos;s <Link className='underline text-blue-500' href={"https://developers.particle.network/landing/introduction"}>documentation.</Link>
                <p className="paragraph mt-6">Find the repository with the complete code implementation on the Particle Network GitHub.</p>
            </p>
        </div>
    )
}

export default ConnectWallet


import { useConnect, useAccount, useBalance } from "wagmi";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { useState, useEffect } from "react";
import { useContractWrite } from "wagmi";
import LinkAbi from "../Abi/LinkAbi.js";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Home() {
  const [sendAmount, setSendAmount] = useState("");
  const [receiver, setReceiver] = useState(null);
  const a = 1000000000000000000;

  const {
    data: send,
    error,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite({
    address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    abi: LinkAbi,
    functionName: "transfer",
    args: [receiver, sendAmount * a],
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Transfer successful!");
    }
  }, [isSuccess]);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { data: balance } = useBalance({
    address,
    token: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    watch: true,
  });

  return (
    <div className="flex flex-col  items-center text-center m-4 p-8">
      <img
        className="w-[500px] m-4 pb-4"
        src="https://assets-global.website-files.com/5f6b7190899f41fb70882d08/5f760a499b56c47b8fa74fbb_chainlink-logo.svg"
        alt=""
      />
      <h1 className="text-blue-800 font-bold text-2xl pb-6">Send Chainlink</h1>
      {isConnected ? (
        <div>
          <h2 className="text-xl">Connected Wallet:</h2>
          <h3 className="text-l">{address}</h3>
        </div>
      ) : (
        <button
          onClick={connect}
          className="bg-blue-500 item-center h-12 w-[160px] rounded-full hover:bg-blue-900"
        >
          Connect Your Wallet
        </button>
      )}
      {isConnected ? (
        <div>
          <div className="flex">
            <h2 className="text-xl   font-bold ">You Have :</h2>
            <h2 className="text-xl pl-20  text-center text-blue-900">
              {balance?.formatted} {balance?.symbol}
            </h2>
          </div>
          <div className="flex flex-col m-6 p-2">
            <input
              className="p-3 m-4 text-xl hover:bg-slate-300 text-center rounded"
              placeholder="send to"
              type="text"
              onChange={(e) => setReceiver(e.target.value)}
            />
            <input
              className="p-3 m-4 text-xl hover:bg-slate-300 text-center rounded"
              type="number"
              placeholder="Amount"
              onChange={(e) => setSendAmount(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 item-center h-12 w-[160px] rounded-full hover:bg-blue-900"
              onClick={() => write()}
            >
              Trsnsfer
            </button>
            {isLoading && <div className="text-green-500">Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(send)}</div>}
            {error && <div>Error : {error?.name}</div>}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;

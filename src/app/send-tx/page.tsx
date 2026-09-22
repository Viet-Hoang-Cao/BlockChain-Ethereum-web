"use client";

import { FormEvent, useState } from "react";
import { isAddress, parseEther } from "viem";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";

export default function SendTxPage() {
  const { isConnected } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const {
    data: hash,
    sendTransaction,
    isPending,
    error: sendError,
    reset,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    if (!isAddress(recipient)) {
      setFormError("Recipient address is not a valid Ethereum address.");
      return;
    }

    let value: bigint;
    try {
      value = parseEther(amount);
    } catch {
      setFormError("Amount must be a valid ETH value (e.g. 0.01).");
      return;
    }

    if (value <= BigInt(0)) {
      setFormError("Amount must be greater than 0.");
      return;
    }

    sendTransaction({ to: recipient as `0x${string}`, value });
  }

  function handleReset() {
    setRecipient("");
    setAmount("");
    setFormError(null);
    reset();
  }

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <h1 className="text-2xl font-semibold">Send Transaction</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Send native ETH to any address on the connected network.
      </p>

      {!isConnected ? (
        <p className="mt-6 rounded-md bg-amber-50 p-4 text-sm text-amber-800">
          Connect your wallet to send a transaction.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium" htmlFor="recipient">
              Recipient address
            </label>
            <input
              id="recipient"
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 font-mono text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="amount">
              Amount (ETH)
            </label>
            <input
              id="amount"
              type="text"
              inputMode="decimal"
              placeholder="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isPending || isConfirming}
            className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800 disabled:opacity-50"
          >
            {isPending
              ? "Confirm in wallet..."
              : isConfirming
                ? "Waiting for confirmation..."
                : "Send"}
          </button>

          {formError && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {formError}
            </p>
          )}

          {sendError && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {sendError.message}
            </p>
          )}

          {isConfirmed && hash && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
              <p>Transaction confirmed!</p>
              <p className="mt-1 break-all font-mono text-xs">{hash}</p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 underline"
              >
                Send another
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

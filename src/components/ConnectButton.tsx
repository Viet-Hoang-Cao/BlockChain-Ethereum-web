"use client";

import { useState } from "react";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { formatUnits } from "viem";
import { truncateAddress } from "@/lib/format";

export function ConnectButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="text-neutral-500">
          {balance
            ? `${Number(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}`
            : "..."}
        </span>
        <span className="rounded-md bg-neutral-100 px-3 py-1.5 font-mono">
          {truncateAddress(address)}
        </span>
        <button
          onClick={() => disconnect()}
          className="rounded-md border border-neutral-300 px-3 py-1.5 hover:bg-neutral-100"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((open) => !open)}
        disabled={isPending}
        className="rounded-md bg-black px-4 py-1.5 text-sm text-white hover:bg-neutral-800 disabled:opacity-50"
      >
        {isPending ? "Connecting..." : "Connect Wallet"}
      </button>
      {menuOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-neutral-200 bg-white shadow-lg">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => {
                connect({ connector });
                setMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-neutral-100"
            >
              {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

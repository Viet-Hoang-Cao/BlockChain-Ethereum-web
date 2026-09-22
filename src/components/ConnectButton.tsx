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
        <span className="text-foreground/100">
          {balance
            ? `${Number(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}`
            : "..."}
        </span>
        <span className="rounded-full bg-primary/10 px-3 py-1.5 font-mono text-primary">
          {truncateAddress(address)}
        </span>
        <button
          onClick={() => disconnect()}
          className="rounded-full border border-primary/20 px-3 py-1.5 text-foreground transition-colors hover:bg-primary/5"
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
        className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-50"
      >
        {isPending ? "Connecting..." : "Connect Wallet"}
      </button>
      {menuOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-primary/10 bg-background shadow-lg">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => {
                connect({ connector });
                setMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-primary/10"
            >
              {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

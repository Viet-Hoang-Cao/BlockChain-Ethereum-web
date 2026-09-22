"use client";

import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { SUPPORTED_CHAINS } from "@/lib/wagmi";

export function WrongNetworkBanner() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending, variables } = useSwitchChain();

  const isSupported = SUPPORTED_CHAINS.some((chain) => chain.id === chainId);

  if (!isConnected || isSupported) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
      <span>
        Wrong network (chain id {chainId}). Please switch to a supported
        network:
      </span>
      {SUPPORTED_CHAINS.map((chain) => (
        <button
          key={chain.id}
          onClick={() => switchChain({ chainId: chain.id })}
          disabled={isPending}
          className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {isPending && variables?.chainId === chain.id
            ? "Switching..."
            : `Switch to ${chain.name}`}
        </button>
      ))}
    </div>
  );
}

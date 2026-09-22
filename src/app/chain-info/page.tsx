"use client";

import { useBlock, useChainId, useGasPrice } from "wagmi";
import { formatEther, formatGwei } from "viem";
import { SUPPORTED_CHAINS } from "@/lib/wagmi";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 p-4">
      <div className="text-xs uppercase tracking-wide text-neutral-500">
        {label}
      </div>
      <div className="mt-1 break-all font-mono text-sm">{value}</div>
    </div>
  );
}

export default function ChainInfoPage() {
  const chainId = useChainId();
  const chainName =
    SUPPORTED_CHAINS.find((chain) => chain.id === chainId)?.name ?? "Unknown";

  const { data: block, isLoading: isBlockLoading } = useBlock({
    watch: true,
  });
  const { data: gasPrice, isLoading: isGasPriceLoading } = useGasPrice();

  const burntFees =
    block?.baseFeePerGas != null && block?.gasUsed != null
      ? block.baseFeePerGas * block.gasUsed
      : undefined;

  const isLoading = isBlockLoading || isGasPriceLoading;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Chain Info</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Live data for {chainName} (chain id {chainId})
      </p>

      {isLoading && !block ? (
        <p className="mt-6 text-sm text-neutral-500">Loading chain data...</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard label="Chain ID" value={String(chainId)} />
          <StatCard
            label="Last Block Number"
            value={block?.number?.toString() ?? "-"}
          />
          <StatCard
            label="Latest Block Hash"
            value={block?.hash ?? "-"}
          />
          <StatCard
            label="Gas Used"
            value={block?.gasUsed?.toString() ?? "-"}
          />
          <StatCard
            label="Gas Price"
            value={gasPrice !== undefined ? `${formatGwei(gasPrice)} Gwei` : "-"}
          />
          <StatCard
            label="Burnt Fees"
            value={burntFees !== undefined ? `${formatEther(burntFees)} ETH` : "-"}
          />
        </div>
      )}
    </div>
  );
}

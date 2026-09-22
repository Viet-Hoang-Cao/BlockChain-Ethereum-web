import Link from "next/link";

const PAGES = [
  {
    href: "/chain-info",
    title: "Chain Info",
    description: "Chain id, latest block, gas price and burnt fees.",
  },
  {
    href: "/token-data",
    title: "Token Data",
    description: "Token info, balances and metrics via the SQD indexer.",
  },
  {
    href: "/send-tx",
    title: "Send Transaction",
    description: "Send native ETH to any address.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Web3 Dapp</h1>
      <p className="mt-2 text-neutral-500">
        Connect a wallet using the button in the header, then explore:
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400"
          >
            <div className="font-medium">{page.title}</div>
            <p className="mt-1 text-sm text-neutral-500">
              {page.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

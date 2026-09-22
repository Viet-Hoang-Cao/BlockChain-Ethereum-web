import Link from "next/link";
import { ConnectButton } from "@/components/ConnectButton";
import { WrongNetworkBanner } from "@/components/WrongNetworkBanner";

const NAV_LINKS = [
  { href: "/chain-info", label: "Chain Info" },
  { href: "/token-data", label: "Token Data" },
  { href: "/send-tx", label: "Send Tx" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">
            Web3 Dapp
          </Link>
          <nav className="flex gap-4 text-sm text-neutral-600">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <ConnectButton />
      </div>
      <WrongNetworkBanner />
    </header>
  );
}

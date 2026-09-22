import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

export const SUPPORTED_CHAINS = [mainnet, sepolia] as const;

export const wagmiConfig = createConfig({
  chains: SUPPORTED_CHAINS,
  connectors: [metaMask(), injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, 2 + chars)}...${address.slice(-chars)}`;
}

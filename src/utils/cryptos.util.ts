export function truncateCryptoAddress(addr: string) {
  return addr.slice(0, 8) + "..." + addr.slice(-8);
}

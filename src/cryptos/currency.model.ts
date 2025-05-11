export interface CryptoCurrency {
  name: string;
  symbol: string;
  color: string;
}

/*
  Supported currencies for the app.
  The name and symbol are used to identify the currency in the app.
  The color is used to display the currency in the UI.

  This array should be enriched to support more currencies.
*/
const supportedCurrencies: CryptoCurrency[] = [
  {
    name: "bitcoin",
    symbol: "btc",
    color: "#F7931A",
  },
  {
    name: "ethereum",
    symbol: "eth",
    color: "#454A75",
  },
  {
    name: "solana",
    symbol: "sol",
    color: "#9945FF",
  },
  {
    name: "ripple",
    symbol: "xrp",
    color: "#000000",
  },
  {
    name: "Tezos",
    symbol: "xtz",
    color: "#2C7BF4",
  },
];

const currenciesByName: Record<string, CryptoCurrency> = {};
const currenciesBySymbol: Record<string, CryptoCurrency> = {};

supportedCurrencies.forEach((currency) => {
  currenciesByName[currency.name.toLowerCase()] = currency;
});

supportedCurrencies.forEach((currency) => {
  currenciesBySymbol[currency.symbol.toLowerCase()] = currency;
});

export { currenciesByName, currenciesBySymbol };

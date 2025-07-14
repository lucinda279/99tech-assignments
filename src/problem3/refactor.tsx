// Assumption: useWalletBalances, usePrices, and WalletRow are imported or defined elsewhere

import React, { useMemo } from "react";

// Define blockchain types and priorities as enums
export enum Blockchain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

export enum BlockchainPriority {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20,
  Default = -99,
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

interface Props {
  // Add any additional props if needed
  className?: string;
}

function getPriority(blockchain: Blockchain): number {
  switch (blockchain) {
    case Blockchain.Osmosis:
      return BlockchainPriority.Osmosis;
    case Blockchain.Ethereum:
      return BlockchainPriority.Ethereum;
    case Blockchain.Arbitrum:
      return BlockchainPriority.Arbitrum;
    case Blockchain.Zilliqa:
      return BlockchainPriority.Zilliqa;
    case Blockchain.Neo:
      return BlockchainPriority.Neo;
    default:
      return BlockchainPriority.Default;
  }
}

const WalletPage: React.FC<Props> = (props) => {
  const { className, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Combine filter, sort, formatting, and usdValue calculation in a single pass
  const formattedBalances: FormattedWalletBalance[] = useMemo(
    () =>
      balances
        .filter((balance: WalletBalance) => {
          const priority = getPriority(balance.blockchain);
          return priority > BlockchainPriority.Default && balance.amount > 0;
        })
        .sort((a: WalletBalance, b: WalletBalance) => {
          const aPriority = getPriority(a.blockchain);
          const bPriority = getPriority(b.blockchain);
          if (aPriority > bPriority) return -1;
          if (bPriority > aPriority) return 1;
          return 0;
        })
        .map((balance) => {
          const price = prices[balance.currency];
          return {
            ...balance,
            formatted: balance.amount.toFixed(),
            usdValue: price ? price * balance.amount : 0,
          };
        }),
    [balances, prices]
  );

  return (
    <div {...rest}>
      {formattedBalances.map((balance) => (
        <WalletRow
          className={className}
          key={balance.currency}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};

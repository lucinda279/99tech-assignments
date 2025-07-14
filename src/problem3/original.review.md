# Code Review: `original.tsx`

## 1. **Type Issues**

- **`WalletBalance` interface does not have a `blockchain` property, but code expects it.**

  ```tsx
  interface WalletBalance {
    currency: string;
    amount: number;
  }
  const balancePriority = getPriority(balance.blockchain);
  ```

- **`FormattedWalletBalance` is used as a type for `balance` in the `rows` map, but `sortedBalances` is of type `WalletBalance[]`.**

  ```tsx
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      // ...
    }
  );
  ```

- **The `rows` mapping expects `balance` to have a `formatted` property, but `sortedBalances` does not include it.**

  ```tsx
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      // ...
      formattedAmount={balance.formatted}
    }
  );
  ```

## 2. **Logic Bugs**

- **In the `filter` function inside `useMemo`, `lhsPriority` is referenced but not defined. Likely should use `balancePriority`.**

  ```tsx
  .filter((balance: WalletBalance) => {
    const balancePriority = getPriority(balance.blockchain);
    if (lhsPriority > -99) { // lhsPriority is not defined
      if (balance.amount <= 0) {
        return true;
      }
    }
    return false;
  })
  ```

- **The filter logic seems incorrect: it returns `true` only if `balance.amount <= 0` and `balancePriority > -99`, which may not be the intended behavior, it should be `balance.amount > 0` instead?**

  ```tsx
  if (lhsPriority > -99) {
    if (balance.amount <= 0) {
      return true;
    }
  }
  return false;
  ```

- **The `sort` function does not handle the case when priorities are equal (should return 0).**
  ```tsx
  .sort((lhs: WalletBalance, rhs: WalletBalance) => {
    const leftPriority = getPriority(lhs.blockchain);
    const rightPriority = getPriority(rhs.blockchain);
    if (leftPriority > rightPriority) {
      return -1;
    } else if (rightPriority > leftPriority) {
      return 1;
    }
    // missing: return 0 for equal priorities
  });
  ```

## 3. **General Code Quality**

- **Unused variables: `children` is destructured but not used.**

  ```tsx
  const { children, ...rest } = props;
  // ... 'children' is not used
  ```

- **`formattedBalances` is created but never used; instead, `rows` is mapped from `sortedBalances`.**

  ```tsx
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });
  // ... but only 'sortedBalances' is used for rows
  ```

- **The `WalletRow` component is used with a `className` prop referencing `classes.row`, but `classes` is not defined.**
  ```tsx
  <WalletRow
    className={classes.row}
    // ...
  />
  ```

## 4. **Additional Observations & Best Practices**

- **`getPriority` is a pure function and should be defined outside the component to avoid unnecessary re-creation on each render.**

  ```tsx
  // Inside component:
  const getPriority = (blockchain: any): number => {
    /* ... */
  };
  // Better:
  function getPriority(blockchain: any): number {
    /* ... */
  }
  // or define outside the component
  ```

- **Should use `enum` or constant for priority values and blockchain types for better maintainability and type safety.**

  ```tsx
  // Current:
  switch (blockchain) {
    case "Osmosis":
      return 100;
    // ...
  }
  // Better:
  enum BlockchainPriority {
    Osmosis = 100,
    Ethereum = 50,
    // ...
  }
  // or use a constant map
  ```

- **Poor naming: `lhs` and `rhs` are not descriptive for balances.**

  ```tsx
  .sort((lhs: WalletBalance, rhs: WalletBalance) => {
    // ...
  });
  // Better: use 'a' and 'b' or 'balanceA' and 'balanceB'
  ```

- **Should check if there is a price for the specific currency; `prices[balance.currency]` can be undefined.**

  ```tsx
  const usdValue = prices[balance.currency] * balance.amount;
  // Better:
  const price = prices[balance.currency];
  const usdValue = price ? price * balance.amount : 0;
  ```

- **Using `index` as the key for `WalletRow` can cause rendering issues if the list order changes. Use a unique identifier if available.**
  ```tsx
  <WalletRow key={index} ... />
  // Better:
  <WalletRow key={balance.currency} ... />
  ```

## 5. **Performance & Data Transformation**

- **The data transformation (filter, sort, map to formatted and usdValue) can be combined into a single pass for better performance and clarity.**

  ```tsx
  // Current (multiple passes):
  const sortedBalances = useMemo(() => {
    return balances
      .filter(...)
      .sort(...);
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map(...);
  const rows = formattedBalances.map(balance => {
    const price = prices[balance.currency];
    const usdValue = price ? price * balance.amount : 0;
    // ...
  });

  // Better (single pass):
  const formattedBalances = useMemo(() =>
    balances
      .filter(...)
      .sort(...)
      .map(balance => {
        const price = prices[balance.currency];
        return {
          ...balance,
          formatted: balance.amount.toFixed(),
          usdValue: price ? price * balance.amount : 0,
        };
      }),
    [balances, prices]
  );
  ```

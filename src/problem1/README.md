# Problem 1: Sum to N

This folder contains solutions for the "Sum to N" problem, which computes the sum of all integers from 1 to n (inclusive).

## Problem Statement

Given an integer n, compute the sum 1 + 2 + ... + n.

- If n is 0, return 0.
- If n is negative or not an integer, throw an error.

## Solution Approaches

Three different implementations are provided:

- **Iterative:** Uses a loop to sum numbers from 1 to n.
- **Mathematical:** Uses the formula sum = n \* (n + 1) / 2.
- **Recursive:** Uses recursion to sum numbers from 1 to n.

## Assumptions

- Input n will always be a valid integer.
- For negative or non-integer inputs, an error is thrown.
- For zero input, the function returns 0.
- Result will always be less than Number.MAX_SAFE_INTEGER.

## How to Run

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

You can also run the code directly (edit `main.ts` as needed):

```bash
npm start
```

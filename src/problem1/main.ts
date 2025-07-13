import { INPUT_VALIDATION_ERROR } from "./constants";

/**
 * Problem: Sum to N Function
 *
 * Function: sum_to_n(n)
 * Input: n - any integer
 * Output: summation from 1 to n (inclusive)
 *
 * Example: sum_to_n=(5) === 1 + 2 + 3 + 4 + 5 === 15
 *
 * Assumptions:
 * - Input n will always be a valid integer
 * - Result will always be less than Number.MAX_SAFE_INTEGER
 * - For negative inputs, the function throws an error
 * - For non-numeric inputs, the function throws an error
 * - For zero input, the function returns 0
 */

// Input validation helper function
function validateInput(n: unknown): { isValid: boolean; error?: string } {
  if (typeof n !== "number" || isNaN(n)) {
    return { isValid: false, error: INPUT_VALIDATION_ERROR.INVALID_NUMBER };
  }

  if (!Number.isInteger(n)) {
    return { isValid: false, error: INPUT_VALIDATION_ERROR.INVALID_INTEGER };
  }

  if (n < 0) {
    return {
      isValid: false,
      error: INPUT_VALIDATION_ERROR.INVALID_NON_NEGATIVE,
    };
  }

  return { isValid: true };
}

// Implementation 1: Iterative approach using a loop
export function sumByIterative(n: number): number {
  const { isValid, error } = validateInput(n);

  if (!isValid) throw new Error(error);

  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

// Implementation 2: Mathematical formula approach
// Formula: sum = n * (n + 1) / 2
export function sumByMathematical(n: number): number {
  const { isValid, error } = validateInput(n);

  if (!isValid) throw new Error(error);

  return (n * (n + 1)) / 2;
}

// Implementation 3: Recursive approach
export function sumByRecursive(n: number): number {
  const { isValid, error } = validateInput(n);

  if (!isValid) throw new Error(error);

  if (n === 0) return 0;

  if (n === 1) return 1;

  return n + sumByRecursive(n - 1);
}

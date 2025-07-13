import { INPUT_VALIDATION_ERROR } from "./constants";
import { sumByIterative, sumByMathematical, sumByRecursive } from "./main";

const validTestCases = [
  { input: 0, expected: 0 },
  { input: 1, expected: 1 },
  { input: 5, expected: 15 },
  { input: 10, expected: 55 },
  { input: 100, expected: 5050 },
];

const errorTestCases = [
  { input: -5, expectedError: INPUT_VALIDATION_ERROR.INVALID_NON_NEGATIVE },
  { input: 3.5, expectedError: INPUT_VALIDATION_ERROR.INVALID_INTEGER },
  { input: NaN, expectedError: INPUT_VALIDATION_ERROR.INVALID_NUMBER },
  { input: null, expectedError: INPUT_VALIDATION_ERROR.INVALID_NUMBER },
];

describe("Sum to N Functions", () => {
  describe("sumByIterative - Iterative Solution", () => {
    test.each(validTestCases)(
      "should return $expected for input $input",
      ({ input, expected }) => {
        expect(sumByIterative(input)).toBe(expected);
      }
    );

    test.each(errorTestCases)(
      'should throw "$expectedError" for input $input',
      ({ input, expectedError }) => {
        expect(() => sumByIterative(input)).toThrow(expectedError);
      }
    );
  });

  describe("sumByMathematical - Mathematical Formula Solution", () => {
    test.each(validTestCases)(
      "should return $expected for input $input",
      ({ input, expected }) => {
        expect(sumByMathematical(input)).toBe(expected);
      }
    );

    test.each(errorTestCases)(
      'should throw "$expectedError" for input $input',
      ({ input, expectedError }) => {
        expect(() => sumByMathematical(input)).toThrow(expectedError);
      }
    );
  });

  describe("sumByRecursive - Recursive Solution", () => {
    test.each(validTestCases)(
      "should return $expected for input $input",
      ({ input, expected }) => {
        expect(sumByRecursive(input)).toBe(expected);
      }
    );

    test.each(errorTestCases)(
      'should throw "$expectedError" for input $input',
      ({ input, expectedError }) => {
        expect(() => sumByRecursive(input)).toThrow(expectedError);
      }
    );
  });
});

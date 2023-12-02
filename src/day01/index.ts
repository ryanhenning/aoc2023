import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isDigitNumber = (value: string) => {
  return !isNaN(parseFloat(value));
};

const validNumbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const part1 = (rawInput: string) => {
  const input: string[] = parseInput(rawInput).split("\n");
  const result: number = getNumberFromString(input);
  return result.toString();
};

const part2 = (rawInput: string) => {
  const input: string[] = parseInput(rawInput).split("\n");

  const result = input.reduce((acc, line) => {
    return acc + getNumberFromStringWithWords(line);
  }, 0);

  return result.toString();
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`,
        expected: "142",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: "281",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
function getNumberFromString(input: string[]): number {
  return input.reduce((acc: number, line: string) => {
    let firstAndLastDigit: string = "";

    for (const char of Array.from(line)) {
      if (isDigitNumber(char)) {
        firstAndLastDigit = char;
        break;
      }
    }

    for (const char of Array.from(line).reverse()) {
      if (isDigitNumber(char)) {
        firstAndLastDigit += char;
        break;
      }
    }

    return !!firstAndLastDigit ? acc + parseInt(firstAndLastDigit) : acc;
  }, 0);
}
function getNumberFromStringWithWords(input: string) {
  let firstDigit = "";
  let lastDigit = "";

  for (let i = 0; i <= input.length; i++) {
    const intParsedChar = parseInt(input[i], 10);
    const digitAtIndex = !isNaN(intParsedChar)
      ? intParsedChar
      : getDigitFromWord(input, i);

    if (digitAtIndex) {
      if (!firstDigit) {
        firstDigit = digitAtIndex.toString();
      } else {
        lastDigit = digitAtIndex.toString();
      }
    }
  }
  if (!lastDigit) {
    lastDigit = firstDigit;
  }

  return parseInt(`${firstDigit}${lastDigit}`) || 0;
}

function getDigitFromWord(line: string, index: number) {
  const remainingLinePart = line.slice(index);

  for (const numberWord of validNumbers) {
    if (remainingLinePart.startsWith(numberWord)) {
      return validNumbers.indexOf(numberWord) + 1;
    }
  }

  return false;
}

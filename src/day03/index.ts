import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

interface Schematic {
  data: string[][];
  rows: number;
  columns: number;
}

const loadSchematic = (input: string): Schematic => {
  const data = input.split("\n").map((line) => line.split(""));
  const rows = data.length - 1;
  const columns = data[0].length - 1;
  return { data, rows, columns };
};

interface NumberLocation {
  number: string[];
  row?: number;
  columns: number[];
}

const symbolRegex = (charToTest: string) => /[^a-zA-Z0-9.]/.test(charToTest);
const numberRegex = (charToTest: string) => /[0-9]/.test(charToTest);

const getNumbers = (schematicData: string[][]): NumberLocation[] => {
  const numberLocations: NumberLocation[] = [];

  schematicData.forEach((row, rowIndex) => {
    let potentialLocation: NumberLocation = {
      number: [],
      row: undefined,
      columns: [],
    };
    row.forEach((character, colIndex) => {
      if (numberRegex(character) && potentialLocation.number.length < 3) {
        potentialLocation.number.push(character);
        potentialLocation.row = rowIndex;
        potentialLocation.columns.push(colIndex);
        if (colIndex === row.length - 1)
          numberLocations.push(potentialLocation);
      } else if (potentialLocation.number.length > 0) {
        numberLocations.push(potentialLocation);
        potentialLocation = { number: [], row: undefined, columns: [] };
      } else {
        potentialLocation = { number: [], row: undefined, columns: [] };
      }
    });
  });
  return numberLocations;
};

const checkIfNumberIsValid = (
  numberLocation: NumberLocation,
  schematic: Schematic,
) => {
  const result: boolean[] = [];
  const previousRow = schematic.rows >= 0 ? numberLocation.row! - 1 : -1;
  const currentRow = numberLocation.row!;
  const nextRow =
    schematic.rows >= numberLocation.row! ? numberLocation.row! + 1 : -1;

  const lastColumnIndex = numberLocation.columns.length - 1;
  const leftColumn =
    numberLocation.columns[0] > 0 ? numberLocation.columns[0] - 1 : -1;
  const rightColumn =
    numberLocation.columns[lastColumnIndex] < schematic.columns
      ? numberLocation.columns[lastColumnIndex] + 1
      : -1;

  // Adjacent spaces above number (if number is not in first row)
  if (previousRow >= 0) {
    if (leftColumn >= 0)
      result.push(symbolRegex(schematic.data[previousRow][leftColumn]));

    numberLocation.columns.forEach((column) =>
      result.push(symbolRegex(schematic.data[previousRow][column])),
    );

    if (rightColumn <= schematic.columns)
      result.push(symbolRegex(schematic.data[previousRow][rightColumn]));
  }

  // Left of number in same row (if number is not on the leftmost side of the grid)
  if (leftColumn >= 0)
    result.push(symbolRegex(schematic.data[currentRow][leftColumn]));

  // Right of Number in same row (if number is not on the rightmost side of the grid)
  if (rightColumn <= schematic.columns)
    result.push(symbolRegex(schematic.data[currentRow][rightColumn]));

  // Row below numberLocation
  if (nextRow <= schematic.rows) {
    if (leftColumn >= 0)
      result.push(symbolRegex(schematic.data[nextRow][leftColumn]));

    numberLocation.columns.forEach((column) =>
      result.push(symbolRegex(schematic.data[nextRow][column])),
    );

    if (rightColumn <= schematic.columns)
      result.push(symbolRegex(schematic.data[nextRow][rightColumn]));
  }

  const isValid = result.some((value) => value === true);

  return isValid;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const schematic = loadSchematic(input);

  const allNumbers = getNumbers(schematic.data);

  return allNumbers.reduce((acc, numberLocation) => {
    if (checkIfNumberIsValid(numberLocation, schematic)) {
      return (acc += parseInt(
        numberLocation.number.reduce((acc, value) => (acc += value), ""),
      ));
    }
    return acc;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
      {
        input: `12.......*..
+.........34
.......-12..
..78........
..*....60...
78..........
.......23...
....90*12...
............
2.2......12.
.*.........*
1.1.......56`,
        expected: 413,
      },
      {
        input: `12.......*..
+.........34
.......-12..
..78........
..*....60...
78.........9
.5.....23..$
8...90*12...
............
2.2......12.
.*.........*
1.1..503+.56`,
        expected: 925,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

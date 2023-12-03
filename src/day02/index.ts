import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const maxColors: { [index: string]: number } = {
  blue: 14,
  green: 13,
  red: 12,
};

const validateGames = (input: string) => {
  const games = input.split(":")[1].split(";");

  let areGamesValid: boolean[] = [];

  games.forEach((game) => {
    const singleColors = game.split(",");
    let isGameValid = true;
    const colors: { [index: string]: number } = {
      red: 0,
      blue: 0,
      green: 0,
    };

    singleColors.forEach((numberColor) => {
      const [number, color] = numberColor.trim().split(" ");

      colors[color] += Number(number);
    });

    for (let [color, number] of Object.entries(colors)) {
      if (number > maxColors[color]) {
        isGameValid = false;
      }
    }
    areGamesValid.push(isGameValid);
  });

  return areGamesValid.every((isValid) => isValid);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  let sum = 0;
  const result = input.reduce((acc, line, index) => {
    const isValidGame = validateGames(line);
    sum++;
    return isValidGame ? acc + index + 1 : acc;
  }, 0);

  return result;
};

const determinePower = (input: string) => {
  const games = input.split(":")[1].split(";");
  const colors: { [index: string]: number } = {
    red: 0,
    blue: 0,
    green: 0,
  };
  games.forEach((game) => {
    const singleColors = game.split(",");

    singleColors.forEach((numberColor) => {
      const [number, color] = numberColor.trim().split(" ");

      colors[color] = Math.max(colors[color], Number(number));
    });
  });

  return colors.red * colors.blue * colors.green;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  let sum = 0;
  const result = input.reduce((acc, line) => {
    return acc + determinePower(line);
  }, 0);
  return result;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

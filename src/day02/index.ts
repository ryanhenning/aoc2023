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

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
      {
        input: `Game 1: 15 blue; 11 blue, 2 red, 1 green; 1 green, 7 red; 1 red, 18 blue, 1 green; 16 blue; 3 red, 6 blue
        Game 2: 11 blue, 6 green, 4 red; 9 green, 11 red, 8 blue; 5 green, 5 red, 2 blue; 11 green, 4 blue, 11 red; 3 green, 9 blue, 2 red
        Game 3: 7 green, 2 red; 8 red, 1 blue, 15 green; 3 red, 6 green, 6 blue
        Game 4: 9 blue, 9 green; 3 green, 7 blue, 1 red; 6 green, 1 red, 1 blue; 6 green, 1 red, 1 blue
        Game 5: 1 green, 15 blue, 1 red; 1 red, 12 blue, 1 green; 16 blue; 5 red, 11 green, 14 blue; 6 green, 4 red, 14 blue
        Game 6: 14 red, 9 green; 11 red, 5 green, 6 blue; 1 red, 6 blue, 9 green
        Game 7: 6 green, 1 blue, 9 red; 1 green, 9 red; 7 red; 11 red, 1 blue, 2 green; 8 red, 10 green; 6 green, 1 blue, 5 red
        Game 8: 1 red, 19 blue, 3 green; 9 blue, 1 red; 8 green, 17 blue; 11 blue, 4 green
        Game 9: 7 blue; 5 blue, 1 red, 1 green; 3 blue, 1 red
        Game 10: 9 red, 2 green, 1 blue; 5 red, 1 green, 3 blue; 2 green, 7 red; 2 green, 12 red
        Game 11: 1 red, 1 blue, 17 green; 14 blue, 10 green, 6 red; 12 green, 11 blue, 3 red
        Game 12: 2 red, 1 green, 3 blue; 7 blue, 4 green; 1 red, 3 green, 5 blue
        Game 13: 9 blue, 1 green, 9 red; 12 blue, 2 green, 12 red; 3 blue, 12 red; 2 green, 14 blue, 11 red; 10 red, 12 blue
        Game 14: 6 blue, 2 red; 5 blue; 6 green, 9 blue, 3 red; 3 green, 1 red, 2 blue`,
        expected: 2 + 4 + 7 + 9 + 10 + 12 + 13 + 14,
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

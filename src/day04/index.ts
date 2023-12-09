import run from "aocrunner";
import {
  getIntersection,
  numberRegex,
  splitInputByLine,
} from "../utils/index.js";
import { cachedDataVersionTag } from "v8";

const parseInput = (rawInput: string) => rawInput;

const mapStringToCard = (input: string) => {
  const numberLists = input.split(":")[1].split("|");
  const numberSets = numberLists.map((number) => {
    const set = new Set<number>();
    const array = number.match(numberRegex)?.map(Number) || [];
    array.forEach((digit) => set.add(digit));
    return set;
  });

  return numberSets;
};

const countWinningGames = (numbers: number[]): number => {
  let score = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (score === 0) score++;
    else score = score * 2;
  }

  return score;
};

const part1 = (rawInput: string) => {
  const input = splitInputByLine(parseInput(rawInput));
  const cardSets = input.map((line) => mapStringToCard(line));

  let points: number = 0;

  cardSets.forEach((card) => {
    const numbersYouWon = getIntersection(card[0], card[1]);
    points += countWinningGames([...numbersYouWon.values()]);
  });

  return points;
};

const findCardCopies = (cardSets: Set<number>[][]) => {
  // to start, we know we have at least one of each card
  let countOfEachCard: number[] = cardSets.map(() => 1);

  cardSets.forEach((card, index) => {
    const intersections = getIntersection(card[0], card[1]);
    const multiplier = countOfEachCard[index]; // we'll take the current count of our current card to multiply
    if (intersections.size > 0)
      // for the total matches in the current card (i) we use the multiplier to add product to the count of the next (i) cards
      for (let i = index + 1; i < index + intersections.size + 1; i++) {
        i < countOfEachCard.length
          ? (countOfEachCard[i] += 1 * multiplier)
          : (countOfEachCard[i] = 1);
      }
  });

  return countOfEachCard.reduce((acc, count) => (acc += count));
};

const part2 = (rawInput: string) => {
  const input = splitInputByLine(parseInput(rawInput));
  const cardSets = input.map((line) => mapStringToCard(line));

  const cardCopies = findCardCopies(cardSets);

  return cardCopies;
};

run({
  part1: {
    tests: [
      {
        input: `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

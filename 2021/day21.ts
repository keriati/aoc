let dice = 0;
let rolls = 0;

const rollDice = () => {
  rolls++;
  if (dice === 100) dice = 0;
  dice++;
  return dice;
};

export const getResult = (input: string) => {
  let [positions1, positions2] = input
    .split("\n")
    .map((l) => l.split(" ").slice(-1))
    .map(Number);
  let score1 = 0;
  let score2 = 0;

  while (true) {
    const rolls = rollDice() + rollDice() + rollDice();

    positions1 =
      (positions1 + rolls) % 10 === 0 ? 10 : (positions1 + rolls) % 10;

    score1 += positions1;

    if (score1 >= 1000) break;

    const rolls2 = rollDice() + rollDice() + rollDice();

    positions2 =
      (positions2 + rolls2) % 10 === 0 ? 10 : (positions2 + rolls2) % 10;

    score2 += positions2;

    if (score2 >= 1000) break;
  }

  return (score1 < 1000 ? score1 : score2) * rolls;
};

const getScores = (
  position1: number,
  score1: number,
  position2: number,
  score2: number,
  isOne = true,
  cache = new Map<string, [number, number]>()
): [number, number] => {
  if (score1 >= 21) return [1, 0];
  if (score2 >= 21) return [0, 1];

  const key = `${position1}-${score1}-${position2}-${score2}-${isOne}`;
  if (cache.has(key)) return cache.get(key);

  const rolls = [1, 2, 3];

  let wins: [number, number] = [0, 0];

  for (const roll1 of rolls) {
    for (const roll2 of rolls) {
      for (const roll3 of rolls) {
        const rollScore = roll1 + roll2 + roll3;
        if (isOne) {
          const newPosition1 =
            (position1 + rollScore) % 10 === 0
              ? 10
              : (position1 + rollScore) % 10;

          const newScore1 = score1 + newPosition1;

          const [w1, w2] = getScores(
            newPosition1,
            newScore1,
            position2,
            score2,
            false,
            cache
          );

          wins[0] += w1;
          wins[1] += w2;
        } else {
          const newPosition2 =
            (position2 + rollScore) % 10 === 0
              ? 10
              : (position2 + rollScore) % 10;

          const newScore2 = score2 + newPosition2;

          const [w1, w2] = getScores(
            position1,
            score1,
            newPosition2,
            newScore2,
            true,
            cache
          );

          wins[0] += w1;
          wins[1] += w2;
        }
      }
    }
  }

  cache.set(key, wins);
  return wins;
};

export const getResultPart2 = (input: string) => {
  let [position1, position2] = input
    .split("\n")
    .map((l) => l.split(" ").slice(-1))
    .map(Number);

  return Math.max(...getScores(position1, 0, position2, 0));
};

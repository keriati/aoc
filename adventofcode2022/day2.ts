/*
 * Rock: A X
 * Paper: B Y
 * Scissors: C Z
 */
export const scores = {
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
};

export const wins = {
  "A Y": 6,
  "B Z": 6,
  "C X": 6,
};

export const draws = {
  "A X": 3,
  "B Y": 3,
  "C Z": 3,
};

export const loss = {
  "A Z": 0,
  "B X": 0,
  "C Y": 0,
};

export const getScore = (input) => {
  const inputArray = input.split("\n");

  return inputArray.reduce((score, game) => {
    const item = game.split(" ")[1];
    const itemScore = scores[item];
    const winScore = game in wins ? wins[game] : 0;
    const drawScore = game in draws ? draws[game] : 0;
    const lossScore = game in loss ? loss[game] : 0;
    return score + winScore + drawScore + lossScore + itemScore;
  }, 0);
};

/*
 * Rock: A
 * Paper: B
 * Scissor: C
 *
 * Win: Z
 * Draw: Y
 * Loss: X
 */

export const wins2 = {
  "A Z": 6 + 2, // Paper
  "B Z": 6 + 3, // Scissor
  "C Z": 6 + 1, // Rock
};

export const draws2 = {
  "A Y": 3 + 1, // Rock
  "B Y": 3 + 2, // Paper
  "C Y": 3 + 3, // Scissor
};

export const loss2 = {
  "A X": 3, // Scissor
  "B X": 1, // Rock
  "C X": 2, // Paper
};

export const getScore2 = (input) => {
  const inputArray = input.split("\n");

  return inputArray.reduce((score, game) => {
    const winScore = game in wins2 ? wins2[game] : 0;
    const drawScore = game in draws2 ? draws2[game] : 0;
    const lossScore = game in loss2 ? loss2[game] : 0;
    return score + winScore + drawScore + lossScore;
  }, 0);
};

const pairs = new Map([
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["<", ">"],
]);

const getIllegalChar = (line: string) => {
  const chars = [];
  let illegalChar;

  for (let i = 0; i < line.length; i += 1) {
    const lineChar = line[i];
    if (Array.from(pairs.keys()).includes(lineChar)) {
      chars.push(lineChar);
    } else {
      const lastOpen = chars.pop();
      if (pairs.get(lastOpen) !== lineChar) {
        illegalChar = lineChar;
        break;
      }
    }
  }

  return illegalChar;
};

const getScore = (illegalChars: string[]) => {
  const scores = new Map([
    [")", 3],
    ["]", 57],
    ["}", 1197],
    [">", 25137],
  ]);

  return illegalChars.reduce((sum, char) => sum + scores.get(char), 0);
};

export const getResult = (input) => {
  const lines = input.split("\n");

  const illegalChars = lines.reduce((illegalChars, line) => {
    const illegalChar = getIllegalChar(line);

    if (illegalChar) {
      illegalChars.push(illegalChar);
    }
    return illegalChars;
  }, []);

  return getScore(illegalChars);
};

const getMissingChars = (line: string) => {
  const chars = [];
  const missingChars = [];

  for (let i = 0; i < line.length; i += 1) {
    const lineChar = line[i];
    if (Array.from(pairs.keys()).includes(lineChar)) {
      chars.push(lineChar);
    } else {
      const lastOpen = chars.pop();
      if (pairs.get(lastOpen) !== lineChar) {
        missingChars.push(pairs.get(lastOpen));
      }
    }
  }

  if (missingChars.length > 0) {
    return null;
  }

  return [...chars.map((char) => pairs.get(char)).reverse()];
};

const getScoresPart2 = (allMissingChars: string[][]) => {
  const charScores = new Map<string, number>([
    [")", 1],
    ["]", 2],
    ["}", 3],
    [">", 4],
  ]);
  const scores = allMissingChars.reduce((scores, missingChars) => {
    scores.push(
      missingChars.reduce((sum, char) => sum * 5 + charScores.get(char), 0)
    );
    return scores;
  }, new Array<number>());

  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};

export const getResultPart2 = (input) => {
  const lines = input.split("\n");

  const allMissingChars = lines.reduce((state, line) => {
    const missingChars = getMissingChars(line);

    if (missingChars) {
      state.push(missingChars);
    }
    return state;
  }, []);

  // return allMissingChars;
  return getScoresPart2(allMissingChars);
};

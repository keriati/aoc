const isPossible = (
  towels: Set<string>,
  design: string,
  memo = new Map<string, boolean>()
): boolean => {
  if (design.length === 0) {
    return true;
  }

  if (memo.has(design)) {
    return memo.get(design);
  }

  if (towels.has(design)) {
    return true;
  }

  for (let i = 1; i < design.length; i++) {
    const left = design.slice(0, i);
    const right = design.slice(i);
    if (isPossible(towels, left, memo) && isPossible(towels, right, memo)) {
      memo.set(design, true);
      return true;
    }
  }

  memo.set(design, false);
  return false;
};

const parseInput = (input: string) => {
  const [towelsRaw, designsRaw] = input.split("\n\n");
  const towels: Set<string> = new Set(towelsRaw.split(", "));
  const designs: string[] = designsRaw.split("\n");
  return { towels, designs };
};

export const getDesignCount = (input: string) => {
  const { towels, designs } = parseInput(input);

  const memo = new Map<string, boolean>();
  let sum = 0;

  for (let i = 0; i < designs.length; i++) {
    if (isPossible(towels, designs[i], memo)) {
      sum++;
    }
  }

  return sum;
};

const getPossibleCount = (
  towels: Set<string>,
  design: string,
  memo = new Map<string, number>()
) => {
  if (design.length === 0) {
    return 1;
  }

  if (memo.has(design)) {
    return memo.get(design);
  }

  let results = 0;

  for (const towel of towels) {
    if (design.startsWith(towel)) {
      results += getPossibleCount(towels, design.slice(towel.length), memo);
    }
  }

  memo.set(design, results);
  return results;
};

export const getDesignCombinations = (input: string) => {
  const { towels, designs } = parseInput(input);

  let result = 0;

  for (let i = 0; i < designs.length; i++) {
    const possibleDesigns = getPossibleCount(towels, designs[i]);
    result += possibleDesigns;
  }

  return result;
};

const patterns = new Map<string, Set<string>>();

const fillPatterns = (
  towels: Set<string>,
  originalDesing,
  design: string,
  memo = new Map<string, number>()
) => {
  if (design.length === 0) {
    return 1;
  }

  if (memo.has(design)) {
    return memo.get(design);
  }

  let results = 0;

  for (const towel of towels) {
    if (design.startsWith(towel)) {
      let possibleCount = fillPatterns(
        towels,
        originalDesing,
        design.slice(towel.length),
        memo
      );
      if (possibleCount > 0) {
        patterns.set(
          originalDesing,
          new Set([...(patterns.get(originalDesing) || new Set()), towel])
        );
      }
      results += possibleCount;
    }
  }

  memo.set(design, results);
  return results;
};

const colorMap = {
  r: "🟥",
  g: "🟩",
  u: "🟦",
  w: "⬜️",
  b: "⬛",
};

const createTowelCombinations = (
  towels: Set<string>,
  design: string,
  memo = new Map<string, string[][]>()
): string[][] => {
  if (design.length === 0) {
    return [[]];
  }

  if (memo.has(design)) {
    return memo.get(design);
  }

  let results = [];

  for (const towel of towels) {
    if (design.startsWith(towel)) {
      let possibleCombinations = createTowelCombinations(
        towels,
        design.slice(towel.length),
        memo
      );
      for (const combination of possibleCombinations) {
        if (results.length >= 2000000) {
          break;
        }
        results.push([towel, ...combination]);
      }
    }
  }

  memo.set(design, results);
  return results;
};

export const getPatterns = (input: string) => {
  const { towels, designs } = parseInput(input);

  let result = 0;

  for (let i = 0; i < designs.length; i++) {
    const possibleDesigns = fillPatterns(towels, designs[i], designs[i]);
    result += possibleDesigns;
  }

  let i = 0;

  const draw = () => {
    const [design, towels] = Array.from(patterns)[i];

    let designString = "";
    for (let i = 0; i < design.length; i++) {
      designString += colorMap[design[i]];
    }
    const towelCombinations = createTowelCombinations(towels, design);

    console.clear();
    console.log("Design:");
    console.log(designString);
    console.log("Towels:");

    for (let i1 = 0; i1 < towelCombinations.length; i1 += 20000) {
      const towelCombination = towelCombinations[i1];
      let towelString = "";
      for (let i = 0; i < towelCombination.length; i++) {
        const towel = towelCombination[i];
        for (let j = 0; j < towel.length; j++) {
          towelString += colorMap[towel[j]];
        }
        towelString += "  ";
      }
      console.log(towelString);
    }
    i++;
    if (i < Array.from(patterns).length) {
      setTimeout(draw, 250);
    }
  };

  draw();
};

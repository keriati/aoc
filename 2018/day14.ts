export const getRecipeScoreIndex = (startIndex: number) => {
  const recipes = [3, 7];
  let elf1Pos = 0;
  let elf2Pos = 1;

  while (recipes.length < startIndex + 10) {
    const recipe1 = recipes[elf1Pos];
    const recipe2 = recipes[elf2Pos];

    const result = recipe1 + recipe2;

    if (result < 10) {
      recipes.push(result);
    } else {
      const result1 = 1;
      const result2 = result - 10;
      recipes.push(result1, result2);
    }
    elf1Pos = (elf1Pos + 1 + recipe1) % recipes.length;
    elf2Pos = (elf2Pos + 1 + recipe2) % recipes.length;
  }

  return recipes.slice(-10).join("");
};

export const getScoreIndex = (sequenceString: string) => {
  const sequence = sequenceString.split("").map((n) => Number(n));
  let candidate = 0;
  let candidateMatching = 0;
  const recipes = [3, 7];

  let elf1Pos = 0;
  let elf2Pos = 1;

  while (candidateMatching < sequence.length) {
    elf1Pos = (elf1Pos + 1 + recipes[elf1Pos]) % recipes.length;
    elf2Pos = (elf2Pos + 1 + recipes[elf2Pos]) % recipes.length;

    const result = recipes[elf1Pos] + recipes[elf2Pos];

    if (result < 10) {
      recipes.push(result);

      if (result === sequence[candidateMatching]) {
        if (candidate === 0) candidate = recipes.length - 1;
        candidateMatching++;
      } else {
        candidate = 0;
        candidateMatching = 0;
      }
      continue;
    }

    const result1 = 1;
    const result2 = result - 10;
    recipes.push(result1, result2);

    if (
      result1 === sequence[candidateMatching] &&
      result2 === sequence[candidateMatching + 1]
    ) {
      if (candidate === 0) candidate = recipes.length - 2;
      candidateMatching += 2;
    } else if (
      result1 === sequence[candidateMatching] ||
      result2 === sequence[0]
    ) {
      if (result1 === sequence[candidateMatching]) {
        if (candidate >= sequence.length - 1) break;
        candidate = 0;
        candidateMatching = 0;
      }

      if (result2 === sequence[0]) {
        candidate = recipes.length - 1;
        candidateMatching = 1;
      }
    } else {
      candidate = 0;
      candidateMatching = 0;
    }
  }

  return candidate;
};

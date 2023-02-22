export const getGarbageScore = (input) => {
  const chars = input.split("");
  let isGarbage = false;
  let depth = 0;
  let score = 0;
  let garbage = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (char === "!") {
      i++;
      continue;
    }

    if (char === "{" && !isGarbage) {
      depth++;
      score += depth;
      continue;
    }

    if (char === "}" && !isGarbage) {
      depth--;
      continue;
    }

    if (char === "<" && !isGarbage) {
      isGarbage = true;
      continue;
    }

    if (char === ">") {
      isGarbage = false;
    }

    if (isGarbage) garbage++;
  }

  return [score, garbage];
};

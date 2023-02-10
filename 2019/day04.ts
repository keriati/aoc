export const getValidPasswords = (from, to) => {
  let count = 0;

  for (let i = from; i <= to; i++) {
    const val = `${i}`.split("");

    let hasDouble = false;
    let allIncreasing = true;

    for (let j = 1; j < val.length; j++) {
      if (Number(val[j]) < Number(val[j - 1])) {
        allIncreasing = false;
        break;
      }

      if (Number(val[j]) === Number(val[j - 1])) {
        hasDouble = true;
      }
    }

    if (hasDouble && allIncreasing) count++;
  }

  return count;
};

export const getValidPasswords2 = (from, to) => {
  let count = 0;

  for (let i = from; i <= to; i++) {
    const val = `${i}`.split("");

    let allIncreasing = true;

    const charCount = new Map<string, number>();
    charCount.set(val[0], 1);

    for (let j = 1; j < val.length; j++) {
      if (Number(val[j]) < Number(val[j - 1])) {
        allIncreasing = false;
        break;
      }

      if (!charCount.has(val[j])) charCount.set(val[j], 0);
      charCount.set(val[j], charCount.get(val[j]) + 1);
    }

    const hasDouble = Array.from(charCount).find(([, b]) => b === 2);

    if (hasDouble && allIncreasing) count++;
  }

  return count;
};

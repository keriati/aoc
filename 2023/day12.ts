const getVariants = (
  springs: string,
  checkSum: number[],
  cache = new Map<string, number>()
) => {
  let checkKey = 0;
  for (let i = 0; i < checkSum.length; i++) {
    checkKey = checkKey * 10 + checkSum[i];
  }

  let key = `${springs}|${checkKey}`;
  if (cache.has(key)) return cache.get(key);

  if (springs.length === 0) {
    const result = checkSum.length === 0 ? 1 : 0;

    cache.set(key, result);
    return result;
  }

  if (springs[0] === "?") {
    const result =
      getVariants(`.${springs.substring(1)}`, checkSum, cache) +
      getVariants(`#${springs.substring(1)}`, checkSum, cache);

    cache.set(key, result);
    return result;
  }

  if (springs[0] === ".") {
    const result = getVariants(springs.slice(1), checkSum, cache);

    cache.set(key, result);
    return result;
  }

  if (springs[0] === "#") {
    let checkSumValue = 0;

    for (let i = 0; i < checkSum.length; i++) {
      checkSumValue += checkSum[i];
    }

    if (
      springs.length < checkSumValue ||
      springs.slice(0, checkSum[0]).includes(".")
    ) {
      const result = 0;

      cache.set(key, result);
      return result;
    }

    if (checkSum.length < 1) {
      const result = 0;

      cache.set(key, result);
      return result;
    }

    if (checkSum.length === 1) {
      const result = getVariants(
        springs.slice(checkSum[0]),
        checkSum.slice(1),
        cache
      );

      cache.set(key, result);
      return result;
    }

    if (checkSum.length > 1) {
      if (springs.length < checkSum[0] + 1 || springs[checkSum[0]] === "#") {
        const result = 0;

        cache.set(key, result);
        return result;
      }
      const result = getVariants(
        springs.slice(checkSum[0] + 1),
        checkSum.slice(1),
        cache
      );

      cache.set(key, result);
      return result;
    }
  }
};

export const getArrangementSum = (input: string, expand = 1) =>
  input
    .split("\n")
    .map((line) => line.split(" "))
    .map(([springs, check]): [string, string] => [
      Array(expand).fill(springs).join("?"),
      Array(expand).fill(check).join(","),
    ])
    .map(([springs, check]): [string, number[]] => [
      springs,
      check.split(",").map(Number),
    ])
    .reduce((sum, [springs, check]) => sum + getVariants(springs, check), 0);

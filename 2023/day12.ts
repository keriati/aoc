const getVariants = (
  springs: string,
  check: number[],
  cache = new Map<string, number>()
): number => {
  let checkKey = 0;
  for (let i = 0; i < check.length; i++) {
    checkKey = checkKey * 17 + check[i];
  }

  let key = `${springs}|${checkKey}`;
  if (cache.has(key)) return cache.get(key);

  if (springs.length === 0) {
    const result = check.length === 0 ? 1 : 0;

    cache.set(key, result);
    return result;
  }

  let firstChar = springs[0];

  if (firstChar === "?") {
    let springsRest = springs.substring(1);
    const result =
      getVariants(`.${springsRest}`, check, cache) +
      getVariants(`#${springsRest}`, check, cache);

    cache.set(key, result);
    return result;
  }

  if (firstChar === ".") {
    const result = getVariants(springs.slice(1), check, cache);

    cache.set(key, result);
    return result;
  }

  if (firstChar === "#") {
    let checkSum = 0;

    for (let i = 0; i < check.length; i++) {
      checkSum += check[i];
    }

    if (springs.length < checkSum || springs.slice(0, check[0]).includes(".")) {
      return 0;
    }

    if (check.length < 1) {
      return 0;
    }

    if (check.length === 1) {
      const result = getVariants(
        springs.slice(check[0]),
        check.slice(1),
        cache
      );

      cache.set(key, result);
      return result;
    }

    if (check.length > 1) {
      if (springs.length < check[0] + 1 || springs[check[0]] === "#") {
        return 0;
      }
      const result = getVariants(
        springs.slice(check[0] + 1),
        check.slice(1),
        cache
      );

      cache.set(key, result);
      return result;
    }
  }
  throw new Error("Invalid input");
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

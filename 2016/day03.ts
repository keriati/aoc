export const getValidTA = (input) =>
  input
    .split("\n")
    .map((l) =>
      l
        .split(" ")
        .map((n) => Number(n))
        .filter((n) => n !== 0)
    )
    .filter((n) => {
      n.sort((a, b) => a - b);

      const [a, b, c] = n;
      return a + b > c;
    }).length;

export const getValidTACol = (input) =>
  input
    .split("\n")
    .map((l) =>
      l
        .split(" ")
        .map((n) => Number(n))
        .filter((n) => n !== 0)
    )
    .reduce(
      (s, l) => {
        s[0].push(l[0]);
        s[1].push(l[1]);
        s[2].push(l[2]);

        return s;
      },
      [[], [], []]
    )
    .reduce((s, a) => s.concat(a), [])
    .filter((n, i, e) => {
      if (i % 3 !== 0) return false;

      const arr = [n, e[i + 1], e[i + 2]];

      arr.sort((a, b) => a - b);

      const [a, b, c] = arr;
      return a + b > c;
    }).length;

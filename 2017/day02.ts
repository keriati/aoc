export const getChecksum = (input) =>
  input
    .split("\n")
    .map((l) =>
      l
        .split("\t")
        .reduce(
          ([s, b], sn) => {
            const n = Number(sn);
            if (s === null) s = n;
            if (b === null) b = n;
            if (n < s) s = n;
            if (n > b) b = n;
            return [s, b];
          },
          [null, null]
        )
        .reduce((s, n) => n - s, 0)
    )
    .flat()
    .reduce((s, n) => s + n, 0);

export const getRowSun = (input) =>
  input
    .split("\n")
    .map((l) => l.split("\t").map((n) => Number(n)))
    .map((l) => {
      for (let i = 0; i < l.length - 1; i++) {
        const a = l[i];
        for (let j = i + 1; j < l.length; j++) {
          const b = l[j];

          if (a > b) {
            if (a % b === 0) return a / b;
          } else if (b % a === 0) return b / a;
        }
      }
      return 0;
    })
    .reduce((s, n) => s + n, 0);

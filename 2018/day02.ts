export const getChecksum = (input) =>
  input
    .split("\n")
    .reduce(
      ([count2, count3], line) => {
        const charMap = line.split("").reduce((m, c) => {
          if (!m.has(c)) m.set(c, 0);
          m.set(c, m.get(c) + 1);
          return m;
        }, new Map<string, number>());

        let has2 = false;
        let has3 = false;

        charMap.forEach((c) => {
          if (c === 2 && !has2) {
            has2 = true;
            count2++;
          }
          if (c === 3 && !has3) {
            has3 = true;
            count3++;
          }
        });

        return [count2, count3];
      },
      [0, 0]
    )
    .reduce((s, n) => s * n, 1);

export const getCommonLetters = (input) => {
  const lines = input.split("\n").map((s) => s.split(""));

  for (let i = 0; i < lines.length - 1; i++) {
    const word = lines[i];
    let diff = "";

    for (let j = i; j < lines.length; j++) {
      const word2 = lines[j];

      diff = "";

      for (let k = 0; k < word.length; k++) {
        if (word[k] !== word2[k]) {
          diff += word[k];
          if (diff.length > 1) break;
        }
      }

      if (diff.length === 1)
        return word.reduce(
          (res, char, i) => (char === word2[i] ? res + char : res),
          ""
        );
    }
  }

  return null;
};

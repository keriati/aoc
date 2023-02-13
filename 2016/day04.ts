function parseLine(line) {
  const [p1, p2] = line.split("[");
  const checksum = p2.substring(0, p2.length - 1);
  const words = p1.split("-");
  const id = Number(words.pop());
  return { checksum, words, id };
}

export const getResult = (input) => {
  const lines = input.split("\n");

  let idSum = 0;

  lines.forEach((line) => {
    const { checksum, words, id } = parseLine(line);

    const letters = words.join("");

    const letterMap = new Map();

    for (let i = 0; i < letters.length; i++) {
      if (!letterMap.has(letters[i])) letterMap.set(letters[i], 0);
      letterMap.set(letters[i], letterMap.get(letters[i]) + 1);
    }

    const checkSumOfLetters = Array.from(letterMap)
      .sort((a, b) => {
        if (a[1] === b[1]) {
          if (a[0] < b[0]) return -1;
          if (a[0] > b[0]) return 1;
          return 0;
        }
        return b[1] - a[1];
      })
      .map(([c]) => c)
      .join("")
      .substring(0, 5);

    if (checksum === checkSumOfLetters) {
      idSum += id;
    }
  });

  return idSum;
};

export const getResult2 = (input) => {
  const lines = input.split("\n");

  for (const line of lines) {
    const { words, id } = parseLine(line);
    const rot = id % 26;

    const decryptedWords = words
      .map((word) =>
        word
          .split("")
          .map((char) => {
            const charCode = char.charCodeAt(0);
            let newCode = charCode + rot;
            if (newCode > 122) {
              newCode = 97 + (newCode - 122 - 1);
            }
            return String.fromCharCode(newCode);
          })
          .join("")
      )
      .join(" ");

    if (decryptedWords.indexOf("northpole object storage") > -1) return id;
  }
  return null;
};

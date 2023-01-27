export const getAnyYesCount = (input) =>
  input
    .split("\n\n")
    .map((s) => s.replaceAll("\n", ""))
    .reduce((count, chars) => count + new Set(chars.split("")).size, 0);

export const getEveryYesCount = (input) =>
  input.split("\n\n").reduce((count, group) => {
    const answerCounter = new Map();
    let personCount = 0;

    group.split("\n").forEach((person) => {
      personCount++;
      person.split("").forEach((answer) => {
        if (!answerCounter.has(answer)) answerCounter.set(answer, 0);

        answerCounter.set(answer, answerCounter.get(answer) + 1);
      });
    });

    const allYesCount = Array.from(answerCounter.values()).reduce(
      (c, occurrence) => (occurrence === personCount ? c + 1 : c),
      0
    );

    return count + allYesCount;
  }, 0);

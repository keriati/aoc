export const getListDistance = (input: string) =>
  input
    .split("\n")
    .map((l) => l.split("   "))
    .reduce(
      (acc, val) => [
        [...acc[0], val[0]],
        [...acc[1], val[1]],
      ],
      [[], []]
    )
    .map((a) => a.sort())
    .reduce((acc, val) => {
      if (typeof acc[0] === "undefined") {
        val.forEach((v, j) => {
          acc[j] = [v];
        });
        return acc;
      }

      val.forEach((v, j) => {
        acc[j].push(v);
      });
      return acc;
    }, [])
    .reduce((acc, val) => acc + Math.abs(val[0] - val[1]), 0);

export const getSimilarityScore = (input: string) => {
  const numbers = [];
  const occurrences = Array(99999).fill(0);

  const lines = input.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const nums = lines[i].split("   ");

    numbers.push(Number(nums[0]));
    occurrences[Number(nums[1])]++;
  }

  let similarityScore = 0;

  for (let i = 0; i < numbers.length; i++) {
    similarityScore += numbers[i] * occurrences[numbers[i]];
  }

  return similarityScore;
};

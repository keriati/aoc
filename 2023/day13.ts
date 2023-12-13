import { transpose } from "../util/utils";

const findMirror = (pattern: string[][], maxSmudges = 0) => {
  for (
    let mirrorPosition = 1;
    mirrorPosition < pattern[0].length;
    mirrorPosition++
  ) {
    const columns = pattern[0].length;
    const startX = Math.max(0, mirrorPosition - (columns - mirrorPosition));
    let smudges = 0;

    for (let y = 0; y < pattern.length; y++) {
      for (let x = startX; x < mirrorPosition; x++) {
        let leftElement = pattern[y][x];
        let rightElement =
          pattern[y][mirrorPosition + (mirrorPosition - x - 1)];

        if (leftElement !== rightElement) {
          smudges++;
        }
      }
      if (smudges > maxSmudges) {
        break;
      }
    }

    if (smudges === maxSmudges) {
      return mirrorPosition;
    }
  }

  return 0;
};

export const getPatternNotesSum = (input: string, smudges = 0) =>
  input
    .split("\n\n")
    .map((pattern) => pattern.split("\n").map((row) => row.split("")))
    .map((pattern) => [pattern, transpose(pattern)])
    .map(
      ([pattern, transposedPattern]) =>
        findMirror(pattern, smudges) +
        100 * findMirror(transposedPattern, smudges)
    )
    .reduce((sum, mirrorPosition) => sum + mirrorPosition, 0);

import { transpose } from "../util/utils";

const frames: [string[][], number, boolean][] = [];
let oddPattern = true;
const cacheForPrint = (pattern: string[][], mirrorPosition: number) => {
  frames.push([pattern, mirrorPosition, oddPattern]);
};

const findMirror = (pattern: string[][], maxSmudges = 0) => {
  oddPattern = !oddPattern;
  for (
    let mirrorPosition = 1;
    mirrorPosition < pattern[0].length;
    mirrorPosition++
  ) {
    const columns = pattern[0].length;
    const startX = Math.max(0, mirrorPosition - (columns - mirrorPosition));
    let smudges = 0;
    // cacheForPrint(pattern, mirrorPosition);

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
      // cacheForPrint(pattern, mirrorPosition);
      // cacheForPrint(pattern, mirrorPosition);
      // cacheForPrint(pattern, mirrorPosition);
      // cacheForPrint(pattern, mirrorPosition);
      // cacheForPrint(pattern, mirrorPosition);
      return mirrorPosition;
    }
  }

  return 0;
};

let startFrames = false;

function runFrames() {
  let i = 0;
  const t = setInterval(() => {
    if (i === frames.length) {
      clearInterval(t);
      return;
    }

    let [pattern, mirrorPosition, odd] = frames[i];
    let rendered: string[][];
    i++;

    if (!odd) {
      rendered = pattern.map((row) => [
        ...row.slice(0, mirrorPosition),
        "|",
        ...row.slice(mirrorPosition),
      ]);
    } else {
      pattern = transpose(pattern);
      rendered = [
        ...pattern.slice(0, mirrorPosition),
        "-".repeat(pattern[0].length).split(""),
        ...pattern.slice(mirrorPosition),
      ];
    }

    console.clear();
    console.log("\n");
    console.log("\n");
    console.log(`${rendered.map((row) => `   ${row.join(" ")}`).join("\n")}`);
    console.log("\n");
    console.log("\n");
    console.log("\n");
    console.log("\n");
  }, 84);
}

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
    // .map((a) => {
    //   if (!startFrames) {
    //     startFrames = true;
    //     runFrames();
    //   }
    //   return a;
    // })
    .reduce((sum, mirrorPosition) => sum + mirrorPosition, 0);

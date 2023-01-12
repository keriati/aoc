import * as crypto from "crypto";

function isWinner(candidate: number, input: string, startsWith: string) {
  const hash: string = crypto
    .createHash("md5")
    .update(`${input}${candidate}`)
    .digest("hex");

  return hash.startsWith(startsWith);
}

export const getHashNumber = (input, startsWith) => {
  let candidate = 0;

  while (!isWinner(candidate, input, startsWith)) {
    candidate += 1;
  }

  return candidate;
};

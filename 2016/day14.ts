import crypto from "crypto";

const getTriplet = (s): string => {
  for (let i = 0; i < s.length - 2; i++) {
    if (s[i] === s[i + 1] && s[i + 1] === s[i + 2]) {
      return s[i];
    }
  }
  return null;
};

const hasFiver = (s, char: string) => {
  const char5 = new Array(5).fill(char).join("");
  return s.indexOf(char5) > -1;
};

export const getResult = (salt: string, rounds = 0) => {
  let ind = 0;
  const candidates = {};
  const foundKeys = [];

  while (true) {
    let hash = `${salt}${ind}`;

    for (let i = 0; i <= rounds; i++) {
      hash = crypto.createHash("md5").update(hash).digest("hex");
    }

    for (const c in candidates) {
      candidates[c][1]++;
      if (candidates[c][1] === 1001) {
        delete candidates[c];
        continue;
      }
      if (hasFiver(hash, candidates[c][0])) {
        foundKeys.push(c);
        delete candidates[c];
      }
    }

    if (foundKeys.length > 63) break;

    const triplet = getTriplet(hash);

    if (triplet !== null) {
      candidates[ind] = [triplet, 0];
    }

    ind++;
  }

  return foundKeys.sort((a, b) => a - b)[63];
};

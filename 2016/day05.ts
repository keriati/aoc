import crypto from "crypto";

export const getPassword = (input) => {
  let i = 0;
  let pass = "";

  while (true) {
    const hash: string = crypto
      .createHash("md5")
      .update(`${input}${i}`)
      .digest("hex");

    if (hash.startsWith("00000")) pass += hash.substr(5, 1);
    if (pass.length >= 8) break;
    i++;
  }

  return pass;
};
export const getPasswordBetter = (input) => {
  let i = 0;
  const pass = new Map<number, string>();

  while (true) {
    const hash: string = crypto
      .createHash("md5")
      .update(`${input}${i}`)
      .digest("hex");

    if (hash.startsWith("00000")) {
      const index = Number(hash.substr(5, 1));
      const char = hash.substr(6, 1);
      if (index < 8 && !pass.has(index)) {
        pass.set(index, char);
      }
    }

    if (pass.size >= 8) break;
    i++;
  }

  const chars = Array.from(pass);
  chars.sort(([a], [b]) => a - b);
  return chars.map(([, c]) => c).join("");
};

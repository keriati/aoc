const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

export const getValidPassports = (input) => {
  const passports = input.split("\n\n").map((p) => p.replaceAll("\n", " "));

  return passports.reduce((sum, p, i) => {
    const invalidField = fields.find((f) => p.indexOf(f) < 0);
    return typeof invalidField === "undefined" ? sum + 1 : sum;
  }, 0);
};

const isValid = {
  byr: (s: string) => {
    const n = parseInt(s, 10);
    return n >= 1920 && n <= 2002;
  },
  iyr: (s: string) => {
    const n = parseInt(s, 10);
    return n >= 2010 && n <= 2020;
  },
  eyr: (s: string) => {
    const n = parseInt(s, 10);
    return n >= 2020 && n <= 2030;
  },
  hgt: (s: string) => {
    const [, hs, u] = s.match(/(\d+)(\w+)/);
    const h = parseInt(hs, 10);
    if (u === "cm" && h >= 150 && h <= 193) return true;
    if (u === "in" && h >= 59 && h <= 76) return true;
    return false;
  },
  hcl: (s: string) => /^#[0-9a-f]{6}$/.test(s),
  ecl: (s: string) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(s),
  pid: (s: string) => /^\d{9}$/.test(s),
};

export const getValidPassportsBetter = (input) =>
  input
    .split("\n\n")
    .map((p) =>
      p
        .replaceAll("\n", " ")
        .split(" ")
        .map((f) => f.split(":"))
        .reduce((p, [k, v]) => {
          p[k] = v;
          return p;
        }, {})
    )
    .reduce((sum, p) => {
      const invalidField = Object.keys(isValid).find(
        (k) => !(k in p) || !isValid[k](p[k])
      );

      return typeof invalidField === "undefined" ? sum + 1 : sum;
    }, 0);

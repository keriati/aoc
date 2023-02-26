import { ABC_LOWER } from "../util/utils";

const BAD_LETTERS = ["i", "o", "l"];

export const isValidPassword = (password: string): boolean => {
  if (password === "zzzzzzzz") return true;

  for (const letter of BAD_LETTERS) {
    if (password.includes(letter)) return false;
  }

  let has3Inc = false;
  for (let i = 0; i < password.length - 2; i++) {
    const letters = password[i] + password[i + 1] + password[i + 2];
    if (ABC_LOWER.includes(letters)) {
      has3Inc = true;
      break;
    }
  }
  if (!has3Inc) return false;

  let pairs = 0;
  const pairChars = [];
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1] && !pairChars.includes(password[i])) {
      pairs++;
      i++;
    }
  }
  if (pairs < 2) return false;

  return true;
};

const getNextString = (password: string): string => {
  const pass = password.split("");
  let wasZ = true;
  let i = pass.length - 1;

  while (wasZ && i >= 0) {
    if (pass[i] === "z") {
      pass[i] = "a";
    } else {
      wasZ = false;
      pass[i] = ABC_LOWER[ABC_LOWER.indexOf(pass[i]) + 1];
    }
    i--;
  }

  return pass.join("");
};

export const getResult = (password: string) => {
  let newPassword = password;

  while (true) {
    newPassword = getNextString(newPassword);
    if (isValidPassword(newPassword)) return newPassword;
  }
};

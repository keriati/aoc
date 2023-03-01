import { defaultDict } from "../util/utils";

export const getNumberSum = (input) => {
  const chars: string[] = input.split("");
  let parsing = false;
  let startIndex = 0;
  let sum = 0;

  for (let i = 0; i < chars.length; i++) {
    if (parsing) {
      if (chars[i].match(/\d/)) continue;

      const num = chars.slice(startIndex, i).join("");
      sum += Number(num);

      parsing = false;
    } else if (chars[i] === "-" || chars[i].match(/\d/)) {
      parsing = true;
      startIndex = i;
    }
  }

  return sum;
};

export const getNotRedSum = (input) => {
  const chars: string[] = input.split("");

  let parsingNumber = false;
  let numberStartIndex = 0;

  const pathSums = defaultDict(0);
  const redPaths = [];
  const pathSiblingCounter = {};
  const path = [];

  for (let i = 0; i < chars.length; i++) {
    if (parsingNumber) {
      if (chars[i].match(/\d/)) continue;

      const num = chars.slice(numberStartIndex, i).join("");
      pathSums[path.join("")] += Number(num);

      parsingNumber = false;
    }

    if (chars[i] === "-" || chars[i].match(/\d/)) {
      parsingNumber = true;
      numberStartIndex = i;
    }

    switch (chars[i]) {
      case "{":
      case "[":
        if (!pathSiblingCounter[path.join("") + chars[i]]) {
          pathSiblingCounter[path.join("") + chars[i]] = 1;
        } else {
          pathSiblingCounter[path.join("") + chars[i]]++;
        }
        path.push(chars[i] + pathSiblingCounter[path.join("") + chars[i]]);
        break;
      case "}":
      case "]":
        path.pop();
        break;
      case ":":
        if (chars.slice(i, i + 6).join("") === ':"red"') {
          redPaths.push(path.join(""));
        }
        break;
      default:
    }
  }

  let sum = 0;

  for (const level in pathSums) {
    let isRed = false;

    for (const redLevel of redPaths) {
      if (level.startsWith(redLevel)) {
        isRed = true;
        break;
      }
    }

    if (!isRed) sum += pathSums[level];
  }

  return sum;
};

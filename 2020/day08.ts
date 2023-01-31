/* eslint-disable */
export const getAccValue = (input) => {
  return runInstructions(input.split("\n"))[1];
};

export const runInstructions = (l) => {
  const visited = new Set<number>();
  let accumulator = 0,
    i = 0,
    success = false;

  while (true) {
    if (i >= l.length) {
      success = true;
      break;
    }

    if (visited.has(i)) break;
    visited.add(i);

    const [operation, argString] = l[i].split(" ");
    const argument = parseInt(argString, 10);

    if (operation === "jmp") {
      i += argument;
      continue;
    }

    if (operation === "acc") accumulator += argument;

    i++;
  }

  return [success, accumulator];
};

export const getAccValueFixed = (input) => {
  const instructions = input.split("\n");

  let acc = null;

  for (let i = 0; i < instructions.length; i++) {
    if (
      instructions[i].startsWith("nop") ||
      instructions[i].startsWith("jmp")
    ) {
      const temp = [...instructions];

      if (instructions[i].startsWith("nop")) {
        temp[i] = temp[i].replaceAll("nop", "jmp");
      }

      if (instructions[i].startsWith("jmp")) {
        temp[i] = temp[i].replaceAll("jmp", "nop");
      }

      const [win, res] = runInstructions(temp);
      if (win) {
        acc = res;
        break;
      }
    }
  }

  return acc;
};

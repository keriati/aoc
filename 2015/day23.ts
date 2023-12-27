export const getRegisterValue = (input: string, a = 0) => {
  const register = {
    a,
    b: 0,
  };

  const instructions = input
    .split("\n")
    .map((line) =>
      [line.split(", ")[0].split(" "), line.split(", ")[1]].flat()
    );
  let pointer = 0;

  while (pointer < instructions.length) {
    const [instruction, value1, value2] = instructions[pointer];

    if (instruction === "hlf") {
      register[value1] /= 2;
      pointer++;
      continue;
    }

    if (instruction === "tpl") {
      register[value1] *= 3;
      pointer++;
      continue;
    }

    if (instruction === "inc") {
      register[value1]++;
      pointer++;
      continue;
    }

    if (instruction === "jmp") {
      let step = parseInt(value1, 10);
      pointer += step;
      continue;
    }

    if (instruction === "jie") {
      if (register[value1] % 2 === 0) {
        let step = parseInt(value2, 10);
        pointer += step;
      } else {
        pointer++;
      }
      continue;
    }

    if (instruction === "jio") {
      if (register[value1] === 1) {
        let step = parseInt(value2, 10);
        pointer += step;
      } else {
        pointer++;
      }
      continue;
    }

    throw new Error(`Unknown instruction: ${instruction}`);
  }

  return register;
};

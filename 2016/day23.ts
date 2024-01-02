type Command = "cpy" | "inc" | "dec" | "jnz" | "tgl" | "mul" | "add";
type Register = "a" | "b" | "c" | "d";
type Argument = Register | number;
type Instruction = [Command, Argument, Argument?];

export const getSafeValue = (input: string, a = 7) => {
  const instructions: Instruction[] = input
    .split("\n")
    .map(
      (line): Instruction =>
        line
          .split(" ")
          .map((x: string) =>
            /^-?\d+$/.test(x) ? Number(x) : x
          ) as Instruction
    );

  if (a === 12) {
    instructions[4] = ["mul", "b", "d"];
    instructions[5] = ["add", "d", "a"];
    instructions[6] = ["cpy", 0, "c"];
    instructions[7] = ["jnz", 0, 0];
    instructions[8] = ["jnz", 0, 0];
    instructions[9] = ["jnz", 0, 0];
  }

  const register = new Map<Register, number>([
    ["a", a],
    ["b", 0],
    ["c", 0],
    ["d", 0],
  ]);

  for (let i = 0; i < instructions.length; i++) {
    const [cmd, arg1raw, arg2raw] = instructions[i];
    const arg1 = typeof arg1raw === "string" ? register.get(arg1raw) : arg1raw;
    const arg2 = typeof arg2raw === "string" ? register.get(arg2raw) : arg2raw;

    if (cmd === "mul") {
      register.set(arg2raw as Register, arg1 * arg2);
    }

    if (cmd === "add") {
      register.set(arg2raw as Register, arg1 + arg2);
    }

    if (cmd === "tgl") {
      const tglArg = arg1 + i;
      if (tglArg < 0 || tglArg >= instructions.length) {
        continue;
      }
      const tglCmd = instructions[tglArg];

      if (tglCmd.length === 2) {
        instructions[tglArg] =
          tglCmd[0] === "inc" ? ["dec", tglCmd[1]] : [`inc`, tglCmd[1]];
      }

      if (tglCmd.length === 3) {
        instructions[tglArg] =
          tglCmd[0] === "jnz"
            ? [`cpy`, tglCmd[1], tglCmd[2]]
            : [`jnz`, tglCmd[1], tglCmd[2]];
      }
    }

    if (cmd === "cpy") {
      if (typeof arg2raw === "string") {
        register.set(arg2raw, arg1);
      }
    }

    if (cmd === "inc") {
      register.set(arg1raw as Register, arg1 + 1);
    }

    if (cmd === "dec") {
      register.set(arg1raw as Register, arg1 - 1);
    }

    if (cmd === "jnz") {
      if (arg1 !== 0 && arg2 !== 0) {
        i += arg2 - 1;
      }
    }
  }

  return register.get("a");
};

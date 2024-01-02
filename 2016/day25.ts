type Command = "cpy" | "inc" | "dec" | "jnz" | "out";
type Register = "a" | "b" | "c" | "d";
type Argument = Register | number;
type Instruction = [Command, Argument, Argument?];

export const getSignalValue = (input: string) => {
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

  let aValue = 0;

  while (true) {
    const register = new Map<Register, number>([
      ["a", aValue],
      ["b", 0],
      ["c", 0],
      ["d", 0],
    ]);

    const result = [];

    for (let i = 0; i < instructions.length; i++) {
      const [cmd, arg1raw, arg2raw] = instructions[i];
      const arg1 =
        typeof arg1raw === "string" ? register.get(arg1raw) : arg1raw;
      const arg2 =
        typeof arg2raw === "string" ? register.get(arg2raw) : arg2raw;

      if (cmd === "out") {
        if (result.length > 1) {
          if (result[result.length - 1] === result[result.length - 2]) {
            break;
          }
        }
        result.push(arg1);
        if (result.length > 10) {
          return aValue;
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

    aValue++;
  }
};

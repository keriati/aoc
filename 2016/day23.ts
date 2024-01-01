type Command = "cpy" | "inc" | "dec" | "jnz" | "tgl";
type Register = "a" | "b" | "c" | "d";
type Argument = Register | number;
type Instruction = [Command, Argument, Argument?];

export const getResult = (input, a = 7) => {
  const instructions: Instruction[] = input
    .split("\n")
    .map((line) =>
      line.split(" ").map((x: string) => (/^-?\d+$/.test(x) ? Number(x) : x))
    );

  const register = new Map<Register, number>([
    ["a", a],
    ["b", 0],
    ["c", 0],
    ["d", 0],
  ]);

  let rounds = 0;

  for (let i = 0; i < instructions.length; i++) {
    if (rounds % 100_000_000 === 0) {
      console.log({ rounds, i, register });
    }
    rounds++;
    const [cmd, arg1raw, arg2raw] = instructions[i];
    const arg1 = typeof arg1raw === "string" ? register.get(arg1raw) : arg1raw;
    const arg2 = typeof arg2raw === "string" ? register.get(arg2raw) : arg2raw;

    switch (cmd) {
      case "tgl":
        const tglArg = arg1 + i;
        if (tglArg >= 0 && tglArg < instructions.length) {
          const tglCmd = instructions[tglArg];
          if (tglCmd.length === 2) {
            instructions[tglArg] =
              tglCmd[0] === "inc" ? ["dec", tglCmd[1]] : [`inc`, tglCmd[1]];
          } else if (tglCmd.length === 3) {
            instructions[tglArg] =
              tglCmd[0] === "jnz"
                ? [`cpy`, tglCmd[1], tglCmd[2]]
                : [`jnz`, tglCmd[1], tglCmd[2]];
          }
        }
        break;
      case "cpy":
        if (typeof arg2raw === "string") {
          register.set(arg2raw, arg1);
        }
        break;
      case "inc":
        register.set(arg1raw as Register, arg1 + 1);
        break;
      case "dec":
        register.set(arg1raw as Register, arg1 - 1);
        break;
      case "jnz":
        if (arg1 !== 0 && arg2 !== 0) {
          i += arg2 - 1;
        }
        break;
      default:
        throw new Error(`Unknown command: ${cmd}`);
        break;
    }
  }

  return register.get("a");
};

export const getResultPart2 = (input) => 1;

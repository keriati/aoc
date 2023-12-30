const runCode = (
  input: string,
  debug: boolean,
  steps = Number.MAX_SAFE_INTEGER
) => {
  const instructions = input.split("\n").map((l) => l.split(" "));
  const registers = new Map<string, number>();

  registers.set("a", debug ? 0 : 1);
  registers.set("b", 0);
  registers.set("c", 0);
  registers.set("d", 0);
  registers.set("e", 0);
  registers.set("f", 1);
  registers.set("g", 0);
  registers.set("h", 0);

  let pointer = 0;
  let mulCount = 0;

  while (pointer < instructions.length) {
    if (pointer >= steps) break;
    const [instruction, a, b] = instructions[pointer];
    const vA = Number.isNaN(Number(a)) ? registers.get(a) : Number(a);
    const vB = Number.isNaN(Number(b)) ? registers.get(b) : Number(b);

    switch (instruction) {
      case "set":
        registers.set(a, vB);
        pointer++;
        break;
      case "sub":
        registers.set(a, vA - vB);
        pointer++;
        break;
      case "mul":
        registers.set(a, vA * vB);
        pointer++;
        mulCount++;
        break;
      case "jnz":
        if (vA !== 0) {
          pointer += vB;
        } else {
          pointer++;
        }
        break;
      default:
        throw new Error(`Unknown instruction: ${instruction}`);
    }
  }
  return { registers, mulCount };
};

export const getRegisterH = (input: string) => {
  let { registers, mulCount } = runCode(input, true);

  return mulCount;
};

export const getRegisterHNonDebug = (input: string) => {
  let { registers, mulCount } = runCode(input, false, 8);

  const from = registers.get("b");
  const to = registers.get("c");
  let h = 0;

  for (let current = from; current <= to; current += 17) {
    for (let d = 2; d < Math.floor(Math.sqrt(current)); d++) {
      if (current % d === 0) {
        h++;
        break;
      }
    }
  }

  return h;
};

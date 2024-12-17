const opcodes = {
  0: "adv",
  1: "bxl",
  2: "bst",
  3: "jnz",
  4: "bxc",
  5: "out",
  6: "bdv",
  7: "cdv",
};

class Computer {
  pointer = 0n;

  output: bigint[] = [];

  getCombo(combo: bigint) {
    if (combo <= 3n) return combo;
    if (combo === 4n) return this.A;
    if (combo === 5n) return this.B;
    if (combo === 6n) return this.C;

    throw new Error(`Unknown combo: ${combo}`);
  }

  adv(combo: bigint) {
    this.A /= 2n ** this.getCombo(combo);
  }

  bxl(combo: bigint) {
    this.B ^= combo;
  }

  bst(combo: bigint) {
    this.B = this.getCombo(combo) % 8n;
  }

  jnz(combo: bigint) {
    if (this.A !== 0n) this.pointer = combo - 2n;
  }

  bxc(combo: bigint) {
    this.B ^= this.C;
  }

  out(combo: bigint) {
    this.output.push(this.getCombo(combo) % 8n);
  }

  bdv(combo: bigint) {
    this.B = this.A / 2n ** this.getCombo(combo);
  }

  cdv(combo: bigint) {
    this.C = this.A / 2n ** this.getCombo(combo);
  }

  constructor(
    public A: bigint,
    public B: bigint,
    public C: bigint,
    program: bigint[]
  ) {
    while (this.pointer < program.length) {
      const opcode = program[Number(this.pointer)];
      const combo = program[Number(this.pointer + 1n)];

      const method = opcodes[Number(opcode)];

      if (this[method]) {
        if (this[method](combo) !== true) {
          this.pointer++;
          this.pointer++;
        }
      } else {
        throw new Error(`Unknown opcode: ${opcode}`);
      }
    }
  }
}

export const getResult = (input: string) => {
  const [registers, programRaw] = input.split("\n\n");

  const [A, B, C] = registers
    .split("\n")
    .map((line) => BigInt(line.split(": ")[1]));

  const program: bigint[] = programRaw.split(": ")[1].split(",").map(BigInt);

  return new Computer(A, B, C, program).output.join(",");
};

const findA = (program: bigint[], A = 0n, i = program.length - 1): bigint => {
  if (i < 0) return A;
  let shiftedA = A << 3n;

  for (let nextA = shiftedA; nextA < shiftedA + 8n; nextA++) {
    const computer = new Computer(nextA, 0n, 0n, program);

    if (computer.output[0] === program[i]) {
      const result = findA(program, nextA, i - 1);
      if (result >= 0) return result;
    }
  }

  return -1n;
};

export const getResultPart2 = (input: string) => {
  const program: bigint[] = input
    .split("\n\n")[1]
    .split(": ")[1]
    .split(",")
    .map(BigInt);

  return findA(program);
};

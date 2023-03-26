const ops = [
  "bani",
  "addr",
  "mulr",
  "addi",
  "gtri",
  "banr",
  "borr",
  "eqri",
  "seti",
  "eqrr",
  "bori",
  "setr",
  "eqir",
  "muli",
  "gtrr",
  "gtir",
];

class Device {
  registers: number[] = [];

  addr(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] + this.registers[b];
  }

  addi(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] + b;
  }

  mulr(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] * this.registers[b];
  }

  muli(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] * b;
  }

  banr(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] & this.registers[b];
  }

  bani(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] & b;
  }

  borr(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] | this.registers[b];
  }

  bori(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] | b;
  }

  setr(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a];
  }

  seti(a: number, b: number, c: number) {
    this.registers[c] = a;
  }

  gtir(a: number, b: number, c: number) {
    this.registers[c] = a > this.registers[b] ? 1 : 0;
  }

  gtri(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] > b ? 1 : 0;
  }

  gtrr(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] > this.registers[b] ? 1 : 0;
  }

  eqir(a: number, b: number, c: number) {
    this.registers[c] = a === this.registers[b] ? 1 : 0;
  }

  eqri(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] === b ? 1 : 0;
  }

  eqrr(a: number, b: number, c: number) {
    this.registers[c] = this.registers[a] === this.registers[b] ? 1 : 0;
  }
}

const parseSample = (sample: string) => {
  const [, br0, br1, br2, br3, o1, o2, o3, o4, ar0, ar1, ar2, ar3] =
    sample.match(
      /Before: \[(\d), (\d), (\d), (\d)]\n(\d+) (\d) (\d) (\d)\nAfter: {2}\[(\d), (\d), (\d), (\d)]/
    );

  const br0n = Number(br0);
  const br1n = Number(br1);
  const br2n = Number(br2);
  const br3n = Number(br3);

  const o1n = Number(o1);
  const o2n = Number(o2);
  const o3n = Number(o3);
  const o4n = Number(o4);

  const ar0n = Number(ar0);
  const ar1n = Number(ar1);
  const ar2n = Number(ar2);
  const ar3n = Number(ar3);

  return { o1n, br0n, br1n, br2n, br3n, o2n, o3n, o4n, ar0n, ar1n, ar2n, ar3n };
};

export const getSampleMatches = (input) => {
  const [samples] = input.split("\n\n\n");
  const sampleArr = samples.split("\n\n");
  let result = 0;

  for (const sample of sampleArr) {
    let matches = 0;

    const { br0n, br1n, br2n, br3n, o2n, o3n, o4n, ar0n, ar1n, ar2n, ar3n } =
      parseSample(sample);

    for (const op of ops) {
      const myDevice = new Device();
      myDevice.registers = [br0n, br1n, br2n, br3n];

      myDevice[op](o2n, o3n, o4n);

      if (
        myDevice.registers[0] === ar0n &&
        myDevice.registers[1] === ar1n &&
        myDevice.registers[2] === ar2n &&
        myDevice.registers[3] === ar3n
      ) {
        matches++;
      }
    }

    if (matches >= 3) {
      result++;
    }
  }

  return result;
};

export const getOpsCodeMap = (input) => {
  const [samples] = input.split("\n\n\n");
  const sampleArr = samples.split("\n\n");
  const matched = {};
  const q = [...ops];

  while (q.length > 0) {
    const op = q.pop();
    const matches = [];

    for (let i = 0; i < 16; i++) {
      if (matched[i]) continue;
      let pass = true;

      for (const sample of sampleArr) {
        const {
          o1n,
          br0n,
          br1n,
          br2n,
          br3n,
          o2n,
          o3n,
          o4n,
          ar0n,
          ar1n,
          ar2n,
          ar3n,
        } = parseSample(sample);

        if (o1n !== i) continue;

        const myDevice = new Device();
        myDevice.registers = [br0n, br1n, br2n, br3n];

        myDevice[op](o2n, o3n, o4n);

        if (
          !(
            myDevice.registers[0] === ar0n &&
            myDevice.registers[1] === ar1n &&
            myDevice.registers[2] === ar2n &&
            myDevice.registers[3] === ar3n
          )
        ) {
          pass = false;
          break;
        }
      }

      if (pass) {
        matches.push(i);
      }
    }
    if (matches.length === 1) {
      matched[matches[0]] = op;
    } else {
      q.unshift(op);
    }
  }

  return matched;
};

export const getTestProgramResult = (input) => {
  const ops = getOpsCodeMap(input);
  const [, codeString] = input.split("\n\n\n\n");
  const code = codeString.split("\n");
  const myDevice = new Device();
  myDevice.registers = [0, 0, 0, 0];

  for (const line of code) {
    const [, op, a, b, c] = line.match(/(\d+) (\d+) (\d+) (\d+)/);

    const opn = Number(op);
    const an = Number(a);
    const bn = Number(b);
    const cn = Number(c);

    myDevice[ops[opn]](an, bn, cn);
  }

  return myDevice.registers[0];
};

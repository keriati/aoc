import { defaultDict } from "../util/utils";

class Duet {
  register = defaultDict(0);

  lastPlayed = null;

  recovered = null;

  pointer = 0;

  constructor(public readonly code) {}

  run() {
    while (this.pointer < this.code.length && this.pointer > -1) {
      const [ins, arg1, arg2] = this.code[this.pointer];

      if (typeof arg2 !== "undefined") {
        this[ins](arg1, arg2);
      } else {
        this[ins](arg1);
      }
    }

    return this.recovered;
  }

  snd(x: string) {
    this.lastPlayed = this.register[x];
    this.pointer++;
  }

  set(x: string, y: string | number) {
    if (typeof y === "number") {
      this.register[x] = y;
    } else {
      this.register[x] = this.register[y];
    }
    this.pointer++;
  }

  add(x: string, y: string | number) {
    if (typeof y === "number") {
      this.register[x] += y;
    } else {
      this.register[x] += this.register[y];
    }
    this.pointer++;
  }

  mul(x: string, y: string | number) {
    if (typeof y === "number") {
      this.register[x] *= y;
    } else {
      this.register[x] *= this.register[y];
    }
    this.pointer++;
  }

  mod(x: string, y: string | number) {
    if (typeof y === "number") {
      this.register[x] %= y;
    } else {
      this.register[x] %= this.register[y];
    }
    this.pointer++;
  }

  rcv(x: string) {
    if (this.register[x] !== 0) {
      this.recovered = this.lastPlayed;
      this.pointer = Number.MAX_SAFE_INTEGER;
    }
    this.pointer++;
  }

  jgz(x: string | number, y: string | number) {
    const arg = typeof x === "number" ? x : this.register[x];

    if (arg > 0) {
      this.pointer += typeof y === "number" ? y : this.register[y];
    } else {
      this.pointer++;
    }
  }
}

const parseCode = (input) =>
  input.split("\n").map((l) => {
    const [ins, arg1, arg2] = l.split(" ");

    let arg1p = arg1;
    let arg2p = arg2;
    if (!/[a-z]/.test(arg1)) arg1p = Number(arg1);

    if (typeof arg2 === "undefined") return [ins, arg1p];

    if (!/[a-z]/.test(arg2)) arg2p = Number(arg2);

    return [ins, arg1p, arg2p];
  });

export const getResult = (input) => {
  const code = parseCode(input);

  const myDuet = new Duet(code);

  return myDuet.run();
};

const STATUS_RUNNING = 0;
const STATUS_SUSPENDED = 1;

class Duet2 {
  register = defaultDict(0);

  lastPlayed = null;

  recovered = null;

  pointer = 0;

  sends = 0;

  q = [];

  pair: Duet2 = null;

  constructor(public readonly code, id: number) {
    const idRegister = "p";
    this.register[idRegister] = id;
  }

  run() {
    if (this.pointer > this.code.length || this.pointer < -1) {
      return STATUS_SUSPENDED;
    }
    const pointerBefore = this.pointer;

    const [ins, arg1, arg2] = this.code[this.pointer];

    if (typeof arg2 !== "undefined") {
      this[ins](arg1, arg2);
    } else {
      this[ins](arg1);
    }

    if (this.pointer === pointerBefore) return STATUS_SUSPENDED;
    return STATUS_RUNNING;
  }

  snd(x: string) {
    this.pair.q.push(this.register[x]);
    this.pointer++;
    this.sends++;
  }

  set(x: string, y: string | number) {
    if (typeof y === "number") {
      this.register[x] = y;
    } else {
      this.register[x] = this.register[y];
    }
    this.pointer++;
  }

  add(x: string, y: string | number) {
    if (typeof y === "number") {
      this.register[x] += y;
    } else {
      this.register[x] += this.register[y];
    }
    this.pointer++;
  }

  mul(x: string, y: string | number) {
    if (typeof y === "number") {
      this.register[x] *= y;
    } else {
      this.register[x] *= this.register[y];
    }
    this.pointer++;
  }

  mod(x: string, y: string | number) {
    if (typeof y === "number") {
      this.register[x] %= y;
    } else {
      this.register[x] %= this.register[y];
    }
    this.pointer++;
  }

  rcv(x: string) {
    if (this.q.length > 0) {
      this.register[x] = this.q.shift();
      this.pointer++;
    }
  }

  jgz(x: string | number, y: string | number) {
    const arg = typeof x === "number" ? x : this.register[x];

    if (arg > 0) {
      this.pointer += typeof y === "number" ? y : this.register[y];
    } else {
      this.pointer++;
    }
  }
}

export const getResult2 = (input) => {
  const code = parseCode(input);

  const myDuet0 = new Duet2(code, 0);
  const myDuet1 = new Duet2(code, 1);

  myDuet0.pair = myDuet1;
  myDuet1.pair = myDuet0;

  let duet0Status = STATUS_RUNNING;
  let duet1Status = STATUS_RUNNING;

  while (duet0Status === STATUS_RUNNING || duet1Status === STATUS_RUNNING) {
    duet0Status = myDuet0.run();
    duet1Status = myDuet1.run();
  }

  return myDuet1.sends;
};

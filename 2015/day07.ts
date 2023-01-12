type CircuitElement = Record<string, Gate>;
type Gates = "AND" | "OR" | "NOT" | "RSHIFT" | "LSHIFT" | "SIGNAL" | "WIRE";

const uint16 = (n) => n & 0xffff;

const isStringDigitsOnly = (s) => /^\d+$/g.test(s);

class Gate {
  public readonly process: (x?, y?) => number;

  constructor(
    public readonly type: Gates,
    public readonly dependencies: string[],
    param: number | string = null
  ) {
    if (
      type === "RSHIFT" ||
      type === "LSHIFT" ||
      type === "SIGNAL" ||
      type === "WIRE"
    ) {
      this.process = Gate.operations[type](param);
    } else {
      this.process = Gate.operations[type];
    }
  }

  private static readonly operations = {
    AND: (x, y) => uint16(x & y),
    OR: (x, y) => uint16(x | y),
    NOT: (x) => uint16(~x),
    RSHIFT: (y) => (x) => uint16(x >> y),
    LSHIFT: (y) => (x) => uint16(x << y),
    SIGNAL: (x) => () => x,
    WIRE: (x) => () => x,
  };
}

class Circuit {
  private elements: CircuitElement = {};

  constructor(instructions: string[]) {
    instructions.forEach((instruction) => {
      const [value, key] = instruction.split(" -> ");

      this.elements[key] = Circuit.createGate(value);
    });
  }

  private static createGate(value: string): Gate {
    if (value.includes("AND")) {
      const deps = value.split(" AND ");
      return new Gate("AND", deps);
    }

    if (value.includes("OR")) {
      const deps = value.split(" OR ");
      return new Gate("OR", deps);
    }

    if (value.includes("NOT")) {
      const deps = [value.split(" ")[1]];
      return new Gate("NOT", deps);
    }

    if (value.includes("RSHIFT")) {
      const deps = [value.split(" RSHIFT ")[0]];
      const by = Number.parseInt(value.split("RSHIFT ")[1], 10);
      return new Gate("RSHIFT", deps, by);
    }

    if (value.includes("LSHIFT")) {
      const deps = [value.split(" LSHIFT ")[0]];
      const by = Number.parseInt(value.split("LSHIFT ")[1], 10);
      return new Gate("LSHIFT", deps, by);
    }

    if (isStringDigitsOnly(value)) {
      return new Gate("SIGNAL", [], Number.parseInt(value, 10));
    }

    return new Gate("WIRE", [], value);
  }

  getSignal(wire: string, cache = {}) {
    const gate = this.elements[wire];

    if (cache[wire]) {
      return cache[wire];
    }

    if (gate.type === "SIGNAL") {
      return gate.process();
    }

    if (gate.type === "WIRE") {
      return this.getSignal(gate.process() as unknown as string, cache);
    }

    if (gate.dependencies.length === 1) {
      cache[wire] = gate.process(this.getSignal(gate.dependencies[0], cache));
      return cache[wire];
    }

    const x = isStringDigitsOnly(gate.dependencies[0])
      ? Number.parseInt(gate.dependencies[0], 10)
      : this.getSignal(gate.dependencies[0], cache);

    const y = isStringDigitsOnly(gate.dependencies[1])
      ? Number.parseInt(gate.dependencies[1], 10)
      : this.getSignal(gate.dependencies[1], cache);

    cache[wire] = gate.process(x, y);

    return cache[wire];
  }
}

export const getSignal = (input, wire) => {
  const instructions = input.split("\n");

  const circuit = new Circuit(instructions);

  return circuit.getSignal(wire);
};

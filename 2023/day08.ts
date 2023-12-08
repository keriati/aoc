import { lcm } from "../util/utils";

type Network = Map<string, { L: string; R: string }>;

export const getSteps = (input: string) => {
  const [instructions, networkRaw] = input.split("\n\n");

  const network: Network = networkRaw.split("\n").reduce((network, line) => {
    const [, name, L, R] = line.match(/(\w{3}) = \((\w{3}), (\w{3})\)/);

    network.set(name, { L, R });

    return network;
  }, new Map());

  let steps = 0;
  let instructionIndex = 0;
  let position = "AAA";

  while (position !== "ZZZ") {
    const instruction = instructions[instructionIndex];
    position = network.get(position)[instruction];

    steps++;

    instructionIndex++;
    if (instructionIndex >= instructions.length) instructionIndex = 0;
  }

  return steps;
};

export const getGhostSteps = (input: string) => {
  const [instructions, networkRaw] = input.split("\n\n");

  const positions: string[] = [];

  const network: Network = networkRaw.split("\n").reduce((network, line) => {
    const [, name, L, R] = line.match(/(\w{3}) = \((\w{3}), (\w{3})\)/);

    network.set(name, { L, R });

    if (name.endsWith("A")) {
      positions.push(name);
    }

    return network;
  }, new Map());

  let steps = 0;
  let instructionIndex = 0;
  let reached = [];

  while (true) {
    steps++;
    const instruction = instructions[instructionIndex];

    for (let i = 0; i < positions.length; i++) {
      const nextPosition = network.get(positions[i])[instruction];
      positions[i] = nextPosition;

      if (nextPosition.endsWith("Z")) {
        if (!reached.includes(steps)) {
          reached.push(steps);
        }
      }
    }

    if (reached.length === positions.length) {
      return reached.reduce(lcm);
    }

    instructionIndex++;
    if (instructionIndex >= instructions.length) instructionIndex = 0;
  }
};

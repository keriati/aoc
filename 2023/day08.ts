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

const printAsSlotMachine = (
  prevPositions: string[],
  positions: string[],
  nextPositions: string[],
  win = 0
) => {
  console.clear();

  const content = [];
  const linePrev = `┃     [${prevPositions.join("] [")}]     ┃`;
  const line = `┃    >[${positions.join("] [")}]<    ┃`;
  const lineNext = `┃     [${nextPositions.join("] [")}]     ┃`;
  let winLine = `┃                                             ┃`;

  if (win !== 0) {
    winLine = `┃          You won ${win} $!          ┃`;
  }

  content.push(`       ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
  content.push(`       ┃        AoC 2023 Day 08        ┃`);
  content.push(`┏━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━┓`);
  content.push(`┃                                             ┃`);
  content.push(`┃                                             ┃`);
  content.push(linePrev);
  content.push(line);
  content.push(lineNext);
  content.push(`┃                                             ┃`);
  content.push(`┃                                             ┃`);
  content.push(`┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);
  content.push(`┃                                             ┃`);
  content.push(winLine);
  content.push(`┃                                             ┃`);
  content.push(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
  content.push(`\n`);

  console.log(content.join("\n"));
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const animateGhostSteps = async (input: string) => {
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
  let found = [];

  let prevPositions = [...positions];
  let nextPositions = [...positions];

  while (true) {
    steps++;
    const instruction = instructions[instructionIndex];

    for (let i = 0; i < positions.length; i++) {
      if (found.includes(i)) continue;
      const nextPosition = network.get(positions[i])[instruction];

      positions[i] = nextPosition;

      if (nextPosition.endsWith("Z")) {
        found.push(i);
        if (!reached.includes(steps)) {
          reached.push(steps);
        }
      } else if (steps % 2 === 0) {
        prevPositions[i] = nextPosition;
      } else {
        nextPositions[i] = nextPosition;
      }
    }

    printAsSlotMachine(prevPositions, positions, nextPositions);
    await sleep(1);

    if (reached.length === positions.length) {
      let result = reached.reduce(lcm);

      printAsSlotMachine(prevPositions, positions, nextPositions, result);

      return result;
    }

    instructionIndex++;
    if (instructionIndex >= instructions.length) instructionIndex = 0;
  }
};

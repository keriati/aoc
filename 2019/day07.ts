import { IntCodeComputer } from "./IntCode07";

const getPermutations = (items: number[]): number[][] => {
  if (items.length === 0) return [[]];

  const first = items[0];

  const all = [];

  for (const perm of getPermutations(items.slice(1))) {
    for (let i = 0; i <= perm.length; i++) {
      all.push([...perm.slice(0, i), first, ...perm.slice(i)]);
    }
  }

  return all;
};

const runPhase = (code: number[], phase: number[]) => {
  let output = 0;

  for (let i = 0; i < 5; i++) {
    const intCodeComputer = new IntCodeComputer(code);

    intCodeComputer.addInput(phase[i]);
    intCodeComputer.addInput(output);

    intCodeComputer.run();

    output = intCodeComputer.getOutput();
  }

  return output;
};

export const getHighestSignal = (input: string, params?: number[]) => {
  const code = input.split(",").map((n) => Number(n));

  if (Array.isArray(params)) {
    return runPhase(code, params);
  }

  const allPhases = getPermutations([0, 1, 2, 3, 4]);

  return allPhases.reduce((max, phase) => {
    const out = runPhase(code, phase);
    return out > max ? out : max;
  }, 0);
};

const runPhaseLoop = (code: number[], phase: number[]) => {
  const computers: IntCodeComputer[] = [];

  for (let i = 0; i < 5; i++) {
    const intCodeComputer = new IntCodeComputer([...code]);
    intCodeComputer.addInput(phase[i]);
    computers.push(intCodeComputer);
  }

  let output = 0;

  while (true) {
    for (let i = 0; i < 5; i++) {
      computers[i].addInput(output);

      const status = computers[i].run();

      output = computers[i].getOutput();

      if (i === 4 && status === 1) {
        return output;
      }
    }
  }
};

export const getHighestSignalLoop = (input: string, params?: number[]) => {
  const code = input.split(",").map((n) => Number(n));

  if (Array.isArray(params)) {
    return runPhaseLoop(code, params);
  }

  const allPhases = getPermutations([5, 6, 7, 8, 9]);

  return allPhases.reduce((max, phase) => {
    const out = runPhaseLoop(code, phase);
    return out > max ? out : max;
  }, 0);
};

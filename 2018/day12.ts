import { defaultDict } from "../util/utils";

const parseInput = (input) => {
  const [initialStateInput, spreadInput] = input.split("\n\n");

  const state: string[] = initialStateInput.split(": ")[1].split("");

  const spreadMap = spreadInput.split("\n").reduce((spreadMap, line) => {
    const [pattern, result] = line.split(" => ");
    spreadMap.set(pattern, result);
    return spreadMap;
  }, new Map<string, string>());

  return { state, spreadMap };
};

const getStateSum = (state: string[], indexOffset: number) =>
  state.reduce(
    (count, plant, i) => (plant === "#" ? count + i - indexOffset : count),
    0
  );

const getNewState = (state: string[], spreadMap) => {
  const newState = [];

  for (let j = 2; j < state.length - 2; j++) {
    const llcrr = state.slice(j - 2, j + 3).join("");
    if (spreadMap.has(llcrr)) {
      newState.push(spreadMap.get(llcrr));
    } else {
      newState.push(".");
    }
  }

  return newState;
};

const findIncrease = (diffs) => {
  let increase;
  let mostCommonDiff = 0;

  for (const diff in diffs) {
    if (diffs[diff] > mostCommonDiff) {
      mostCommonDiff = diffs[diff];
      increase = diff;
    }
  }

  return increase;
};

export const getPotSum20 = (input, rounds = 20) => {
  let { state, spreadMap } = parseInput(input);

  let indexOffset = 0;

  for (let i = 0; i < 20; i++) {
    state.unshift(".", ".", ".", ".");
    state.push(".", ".", ".", ".");
    indexOffset += 2;

    state = getNewState(state, spreadMap);
  }

  return getStateSum(state, indexOffset);
};

export const getPotSum50b = (input) => {
  let { state, spreadMap } = parseInput(input);

  const diffs = defaultDict(0);
  let prevStateCount = 0;
  let indexOffset = 0;

  for (let i = 0; i < 1000; i++) {
    state.unshift(".", ".", ".", ".");
    state.push(".", ".", ".", ".");
    indexOffset += 2;

    const newState = getNewState(state, spreadMap);

    const newStateCount = getStateSum(newState, indexOffset);

    if (prevStateCount > 0) {
      const newStepDiff = newStateCount - prevStateCount;
      diffs[newStepDiff]++;
    }

    prevStateCount = newStateCount;
    state = newState;
  }

  const increase = findIncrease(diffs);

  return (50_000_000_000 - 1000) * increase + prevStateCount;
};

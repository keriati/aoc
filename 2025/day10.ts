import { MinBucketQueue } from "bucket-priority-queue";
import { init } from "z3-solver";
import { MinPriorityQueue } from "priority-queue-typed";

type PatternLine = {
  pattern: string;
  buttons: number[][];
  joltages: number[];
};

function getMinimumPresses(line: PatternLine) {
  let initialState = Array(line.pattern.length).fill(".").join("");
  const queue = new MinBucketQueue<{ state: string; presses: number }>();

  queue.push({ state: initialState, presses: 0 }, 0);

  const visitedStates = new Set<string>();

  while (queue.size > 0) {
    const { state, presses } = queue.pop();

    if (state === line.pattern) {
      return presses;
    }

    for (let i = 0; i < line.buttons.length; i++) {
      const button = line.buttons[i];

      let newStateArray = state.split("");

      for (const index of button) {
        newStateArray[index] = newStateArray[index] === "." ? "#" : ".";
      }

      const newState = newStateArray.join("");

      if (visitedStates.has(newState)) {
        continue;
      }

      visitedStates.add(newState);

      queue.push({ state: newState, presses: presses + 1 }, presses + 1);
    }
  }

  return 0;
}

export const getResult = (input: string) => {
  const lines = input.split("\n").map((line) => {
    const linecut = line.replaceAll(/[\[\(\{)}\]]/g, "").split(" ");
    return {
      pattern: linecut[0],
      buttons: linecut
        .slice(1, -1)
        .map((group) => group.split(",").map(Number)),
      joltages: linecut[linecut.length - 1].split(",").map(Number),
    };
  });

  let minimumPresses = 0;

  for (const line of lines) {
    minimumPresses += getMinimumPresses(line);
  }

  return minimumPresses;
};

function getMinimumPressesJoltage(line: PatternLine) {
  let initialState: number[] = Array(line.joltages.length).fill(0);
  let targetStateString: string = line.joltages.join(",");

  const queue = new MinPriorityQueue<{
    state: number[];
    presses: number;
    heuristic: number;
  }>([], {
    comparator: (a, b) => a.heuristic - b.heuristic,
  });

  queue.add({
    state: initialState,
    presses: 0,
    heuristic: Number.MAX_SAFE_INTEGER,
  });

  let minPresses = Number.MAX_SAFE_INTEGER;

  const visitedStates = new Map<string, number>();

  while (queue.size > 0) {
    const { state, presses } = queue.poll()!;
    if (presses >= minPresses) continue;

    if (state.join(",") === targetStateString) {
      console.log("hit", presses);
      minPresses = presses;
      return minPresses;
    }

    for (let i = 0; i < line.buttons.length; i++) {
      const button = line.buttons[i];

      let newState = [...state];

      for (const index of button) {
        newState[index]++;
      }

      let invalidState = false;

      for (let j = 0; j < state.length; j++) {
        if (newState[j] > line.joltages[j]) invalidState = true;
      }

      if (invalidState) continue;

      // const newStateString = newState.join(",");

      // if (visitedStates.has(newStateString)) {
      //   if (visitedStates.get(newStateString)! <= presses + 1) {
      //     continue;
      //   }
      // }
      // visitedStates.set(newStateString, presses + 1);

      const heuristic = newState.reduce((acc, val, i) => {
        return acc + (line.joltages[i] - val);
      }, 0);

      queue.add({ state: newState, presses: presses + 1, heuristic });
    }
  }
  console.log(`Minimum presses for line: ${minPresses}`);
  return minPresses;
}

export const getResultPart2AStar = (input: string) => {
  const lines = input.split("\n").map((line) => {
    const linecut = line.replaceAll(/[\[\(\{)}\]]/g, "").split(" ");
    return {
      pattern: linecut[0],
      buttons: linecut
        .slice(1, -1)
        .map((group) => group.split(",").map(Number)),
      joltages: linecut[linecut.length - 1].split(",").map(Number),
    };
  });

  let minimumPresses = 0;

  for (const line of lines) {
    minimumPresses += getMinimumPressesJoltage(line);
  }

  return minimumPresses;
};

export const getResultPart2 = async (input: string) => {
  const lines = input.split("\n").map((line) => {
    const linecut = line.replaceAll(/[\[\(\{)}\]]/g, "").split(" ");
    return {
      pattern: linecut[0],
      buttons: linecut
        .slice(1, -1)
        .map((group) => group.split(",").map(Number)),
      joltages: linecut[linecut.length - 1].split(",").map(Number),
    };
  });

  let result = 0;

  for (const { buttons, joltages } of lines) {
    let { Context } = await init();
    let Z3 = Context("main");
    const optimize = new Z3.Optimize();

    const presses = buttons.map((_, j) => Z3.Int.const(`${j}`));

    for (const press of presses) {
      optimize.add(press.ge(0));
    }

    for (let i = 0; i < joltages.length; i++) {
      const involved = buttons
        .map((button, j) => (button.includes(i) ? presses[j] : null))
        .filter((x) => x !== null);

      if (involved.length === 0) {
        continue;
      }

      optimize.add(Z3.Sum(...involved).eq(joltages[i]));
    }

    optimize.minimize(Z3.Sum(...presses));

    await optimize.check();

    const model = optimize.model();

    for (const press of presses) {
      result += +model.get(press).toString();
    }

    Z3 = null;
    Context = null;
  }

  return result;
};

const ABC = "0ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const parseInput = (input) =>
  input.split("\n").reduce(
    ({ stepsNext, stepsPrev }, l) => {
      const [, n1, n2] = l.match(
        /Step (\w) must be finished before step (\w) can begin./
      );

      if (!(n1 in stepsNext)) stepsNext[n1] = [];
      stepsNext[n1].push(n2);

      if (!(n2 in stepsPrev)) stepsPrev[n2] = [];
      stepsPrev[n2].push(n1);

      return { stepsNext, stepsPrev };
    },
    { stepsNext: {}, stepsPrev: {} }
  );

const getStepsReady = (stepsNext, stepsPrev) => {
  const stepsReady = [];

  for (const step in stepsNext) {
    if (!(step in stepsPrev)) {
      stepsReady.push(step);
    }
  }

  stepsReady.sort();

  return stepsReady;
};

export const getStepOrder = (input) => {
  const { stepsNext, stepsPrev } = parseInput(input);
  let stepsReady = getStepsReady(stepsNext, stepsPrev);

  const result = [];

  while (stepsReady.length > 0) {
    stepsReady.sort();

    const newSteps = [];

    stepsReady.forEach((node) => {
      const children = stepsNext[node];

      if (!Array.isArray(children)) return;

      children.forEach((child) => {
        if (
          stepsReady.indexOf(child) === -1 &&
          newSteps.indexOf(child) === -1 &&
          result.indexOf(child) === -1
        ) {
          newSteps.push(child);
        }
      });
    });

    const next = stepsReady.find((step) => {
      if (step in stepsPrev) {
        const deps = stepsPrev[step];
        const hasMissing = deps.find((n) => !result.includes(n));

        return typeof hasMissing === "undefined";
      }
      return true;
    });

    result.push(next);

    stepsReady = stepsReady.filter((n) => n !== next);

    stepsReady.push(...newSteps);
  }

  return result.join("");
};

const updateWorkers = (workers: [string, number][]) =>
  workers.map(([step, time]) => [step, --time]);

export const getAssemblyTime = (input, wc, t) => {
  const { stepsNext, stepsPrev } = parseInput(input);
  const stepsReady = getStepsReady(stepsNext, stepsPrev);

  const done = [];
  let workers = [];
  let min = 0;

  while (stepsReady.length > 0 || workers.length > 0) {
    workers = updateWorkers(workers);

    workers = workers
      .map(([step, val]) => {
        if (val < 1) {
          done.push(step);
          return null;
        }
        return [step, val];
      })
      .filter((w) => w !== null);

    done.forEach((node) => {
      const children = stepsNext[node];

      if (!Array.isArray(children)) return;

      children.forEach((child) => {
        if (stepsReady.indexOf(child) === -1 && done.indexOf(child) === -1) {
          if (workers.find(([step]) => step === child)) return;

          const deps = stepsPrev[child];
          const hasMissing = deps.find((n) => !done.includes(n));

          if (typeof hasMissing === "undefined") {
            stepsReady.push(child);
          }
        }
      });
    });

    stepsReady.sort();

    while (workers.length < wc && stepsReady.length > 0) {
      const step = stepsReady.shift();
      workers.push([step, t + ABC.indexOf(step)]);
    }

    min++;
  }

  return min - 1;
};

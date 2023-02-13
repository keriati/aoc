const getReacted = (polymer: string): string => {
  let reacting = true;
  let pol = polymer;
  let reactedPolymer = "";

  while (reacting) {
    reacting = false;
    reactedPolymer = "";

    for (let i = 0; i < pol.length; i++) {
      const a = pol[i];
      const b = pol[i + 1];

      if (typeof b === "undefined") {
        reactedPolymer += a;
        break;
      }

      let skip = false;

      if (a === a.toLowerCase()) {
        if (b === b.toUpperCase()) {
          if (a === b.toLowerCase()) {
            skip = true;
          }
        }
      } else if (b === b.toLowerCase()) {
        if (a === b.toUpperCase()) {
          skip = true;
        }
      }

      if (skip) {
        reacting = true;
        i++;
      } else {
        reactedPolymer += a;
      }
    }
    pol = reactedPolymer;
  }

  return pol;
};

export const getReactedLength = (input) => {
  const reactedPolymer = getReacted(input);

  return reactedPolymer.length;
};

export const getShortestPolymerLength = (input) => {
  const pol = input;
  const counter = new Map();
  const abc = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < abc.length; i++) {
    const currentChar = abc[i];

    const currentPol = pol
      .split("")
      .filter((c) => c.toLowerCase() !== currentChar)
      .join("");

    const reactedPolymer = getReacted(currentPol);

    counter.set(currentChar, reactedPolymer.length);
  }

  return Array.from(counter.values()).reduce(
    (min, val) => (val < min ? val : min),
    Number.MAX_SAFE_INTEGER
  );
};

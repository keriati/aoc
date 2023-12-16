export const getMoleculesCreated = (input: string) => {
  const [rulesRaw, molecule] = input.split("\n\n");

  const rules = rulesRaw.split("\n").map((line) => line.split(" => "));

  const molecules = new Set<string>();

  for (let i = 0; i < rules.length; i++) {
    const [from, to] = rules[i];

    for (let j = 0; j < molecule.length; j++) {
      if (from.length === 1 && molecule[j] === from) {
        const newLine = molecule.slice(0, j) + to + molecule.slice(j + 1);
        molecules.add(newLine);
      }

      if (
        from.length === 2 &&
        molecule[j] === from[0] &&
        molecule[j + 1] === from[1]
      ) {
        const newLine = molecule.slice(0, j) + to + molecule.slice(j + 2);
        molecules.add(newLine);
      }
    }
  }

  return molecules.size;
};

export const getFewestStepsForMolecule = (input: string) => {
  const [, molecule] = input.split("\n\n");

  const elements = [];
  let element = molecule[0];

  for (let i = 1; i < molecule.length; i++) {
    if (molecule[i] !== molecule[i].toUpperCase()) {
      element += molecule[i];
    } else {
      elements.push(element);
      element = molecule[i];
    }
  }
  elements.push(element);

  let com = 0;
  let par = 0;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i] === "Rn" || elements[i] === "Ar") par++;
    if (elements[i] === "Y") com++;
  }

  return elements.length - par - 2 * com - 1;
};

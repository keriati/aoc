import { defaultDict } from "../util/utils";

type CookBook = Record<
  string,
  { servings: number; ingredients: [number, string][] }
>;

const createCookBook = (input): CookBook =>
  input.split("\n").reduce(
    (nf: CookBook, l: string) => {
      const [inp, out] = l.split(" => ");
      const [outAmount, outOre] = out.split(" ");
      const inputs = inp.split(", ");
      nf[outOre] = {
        servings: Number(outAmount),
        ingredients: inputs.map((i) => [
          Number(i.split(" ")[0]),
          i.split(" ")[1],
        ]),
      };
      return nf;
    },
    { ORE: { servings: 1, recipe: [] } }
  );

export const getOreForFuel = (amount, cookBook: CookBook) => {
  const supply = defaultDict(0);
  const orders: [number, string][] = [[amount, "FUEL"]];
  let oreNeeded = 0;

  while (orders.length > 0) {
    const [amount, chemical] = orders.pop();

    if (chemical === "ORE") {
      oreNeeded += amount;
      continue;
    }

    if (supply[chemical] >= amount) {
      supply[chemical] -= amount;
      continue;
    }

    const neededAmount = amount - supply[chemical];
    const neededServings = Math.ceil(
      neededAmount / cookBook[chemical].servings
    );

    for (const [requiredAmount, requiredChem] of cookBook[chemical]
      .ingredients) {
      orders.unshift([neededServings * requiredAmount, requiredChem]);
    }

    supply[chemical] =
      neededServings * cookBook[chemical].servings - neededAmount;
  }

  return oreNeeded;
};

export const getOreNeeded = (input) => {
  const cookBook = createCookBook(input);

  return getOreForFuel(1, cookBook);
};

export const getFuelFromOre = (input) => {
  const cookBook = createCookBook(input);
  const oreFor1Fuel = getOreForFuel(1, cookBook);
  const allOre = 1_000_000_000_000;
  const minOre = allOre - oreFor1Fuel;

  let fuelAmount = 1;
  let step = 1_000_000;

  const visited = [];

  while (true) {
    const oreUsed = getOreForFuel(fuelAmount, cookBook);

    if (visited.indexOf(oreUsed) > -1) {
      step /= 10;
    }
    visited.push(oreUsed);
    if (minOre <= oreUsed && oreUsed <= allOre) {
      return fuelAmount;
    }
    if (oreUsed < minOre) {
      fuelAmount += step;
    }
    if (oreUsed > allOre) {
      fuelAmount -= step;
    }
  }
};

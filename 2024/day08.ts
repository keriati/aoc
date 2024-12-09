import { createCombinations } from "../util/utils";

export const getResult = (input: string) => {
  const locations = {};
  let result = new Set<string>();
  const lines = input.split("\n").map((line) => line.split(""));

  const linesCopy = lines.map((line) => [...line]);

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const location = lines[y][x];

      if (location !== ".") {
        if (locations[location] === undefined) {
          locations[location] = [];
        }
        locations[location].push([x, y]);
      }
    }
  }

  console.log(locations);

  for (let location in locations) {
    const combs = createCombinations(locations[location], 2) as [
      number,
      number
    ][][];
    console.log(combs);

    for (let comb of combs) {
      const [x1, y1] = comb[0];
      const [x2, y2] = comb[1];

      const x3 = x1 + (x2 - x1) * 2;
      const y3 = y1 + (y2 - y1) * 2;

      const x4 = x2 + (x1 - x2) * 2;
      const y4 = y2 + (y1 - y2) * 2;

      if (y3 >= 0 && y3 < lines.length && x3 >= 0 && x3 < lines[y3].length) {
        result.add(`${x3},${y3}`);
        linesCopy[y3][x3] = "#";
      }

      if (y4 >= 0 && y4 < lines.length && x4 >= 0 && x4 < lines[y4].length) {
        result.add(`${x4},${y4}`);

        linesCopy[y4][x4] = "#";
      }
    }
  }

  console.log(linesCopy.map((line) => line.join("")).join("\n"));

  return result.size;
};

export const getResultPart2 = (input: string) => {
  const locations = {};
  let result = new Set<string>();
  const lines = input.split("\n").map((line) => line.split(""));

  const linesCopy = lines.map((line) => [...line]);

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const location = lines[y][x];

      if (location !== ".") {
        if (locations[location] === undefined) {
          locations[location] = [];
        }
        locations[location].push([x, y]);
      }
    }
  }

  console.log(locations);

  for (let location in locations) {
    const combs = createCombinations(locations[location], 2) as [
      number,
      number
    ][][];
    console.log(combs);

    for (let comb of combs) {
      const [x1, y1] = comb[0];
      const [x2, y2] = comb[1];

      let dx3 = x2 - x1;
      let dy3 = y2 - y1;

      let x3 = x1;
      let y3 = y1;

      while (true) {
        x3 += dx3;
        y3 += dy3;

        if (y3 < 0 || y3 >= lines.length || x3 < 0 || x3 >= lines[y3].length) {
          break;
        }

        result.add(`${x3},${y3}`);
        linesCopy[y3][x3] = "#";
      }

      let dx4 = x1 - x2;
      let dy4 = y1 - y2;

      let x4 = x2;
      let y4 = y2;

      while (true) {
        x4 += dx4;
        y4 += dy4;

        if (y4 < 0 || y4 >= lines.length || x4 < 0 || x4 >= lines[y4].length) {
          break;
        }

        result.add(`${x4},${y4}`);
        linesCopy[y4][x4] = "#";
      }
    }
  }

  console.log(linesCopy.map((line) => line.join("")).join("\n"));

  return result.size;
};

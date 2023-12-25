import { Deque } from "@blakeembrey/deque";
import { mk2n, umk2n } from "../util/utils";

const getKey = (x: number, y: number, z: number) => (z * 1000 + x) * 1000 + y;

const toRender: [string[][], Set<number>][] = [];

const render = () => {
  console.log("\n");
  const [map, positions] = toRender.pop();
  const rendered = map.map((line) => [...line]);

  positions.forEach((pos) => {
    const [x, y] = umk2n(pos);
    rendered[y][x] = "O";
  });

  console.log(rendered.map((line) => line.join("")).join("\n"));
};

const findPlots = (
  map: string[][],
  x: number,
  y: number,
  maxSteps: number
): number => {
  let plots = 0;

  const queue = new Deque<[number, number, number]>();
  queue.push([x, y, 0]);

  const visited = new Set<number>();
  const positions = new Set<number>();

  while (queue.size > 0) {
    const [x, y, distance] = queue.popLeft();

    if (distance === maxSteps) {
      plots++;
      positions.add(mk2n(x, y));
      continue;
    }

    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    neighbors.forEach(([nx, ny]) => {
      if (nx < 0 || ny < 0 || nx >= map[0].length || ny >= map.length) return;

      if (map[ny][nx] === "." && !visited.has(getKey(nx, ny, distance + 1))) {
        visited.add(getKey(nx, ny, distance + 1));
        queue.push([nx, ny, distance + 1]);
      }
    });
  }

  // toRender.push([map, positions]);

  return plots;
};

export const getPlotsCount = (input: string, steps = 6) => {
  const map = input.split("\n").map((line) => line.split(""));

  const startY = map.findIndex((line) => line.includes("S"));
  const startX = map[startY].findIndex((char) => char === "S");

  map[startY][startX] = ".";

  let result = findPlots(map, startX, startY, steps);
  // render();

  return result;
};

/**
 * Alignment of the repeating gardens:
 *
 * O = Odd garden ( oddGardenPlots )
 * E = Even garden ( evenGardenPlots )
 * S = Small side garden ( NEPlotsSM, SWPlotsSM, NWPlotsSM, SEPlotsSM )
 * L = Large side garden ( NEPlotsLG, SWPlotsLG, NWPlotsLG, SEPlotsLG )
 * C = Center garden (Starting point)
 * North = North garden ( northPlots )
 * East = East garden ( eastPlots )
 * South = South garden ( southPlots )
 * West = West garden ( westPlots )
 *
 *                 North
 *                 S | S
 *               L - E - L
 *             S |   |   | S
 *           L - E - O - E - L
 *         S |   |   |   |   | S
 *    West - E - O - C - O - E - East
 *         S |   |   |   |   | S
 *           L - E - O - E - L
 *             S |   |   | S
 *               L - E - L
 *                 S | S
 *                 South
 */

export const getPlotsCountBig = (input: string, steps: number) => {
  const map = input.split("\n").map((line) => line.split(""));

  const startY = map.findIndex((line) => line.includes("S"));
  const startX = map[startY].findIndex((char) => char === "S");

  map[startY][startX] = ".";

  const mapWidth = map.length;

  const gardenGridDiameter = ~~(steps / mapWidth) - 1;

  const oddGardens = (~~(gardenGridDiameter / 2) * 2 + 1) ** 2;
  const evenGardens = (~~((gardenGridDiameter + 1) / 2) * 2) ** 2;

  const oddGardenPlots = findPlots(map, startX, startY, mapWidth * 2 + 1);
  const evenGardenPlots = findPlots(map, startX, startY, mapWidth * 2);

  const northPlots = findPlots(map, startX, mapWidth - 1, mapWidth - 1);
  const eastPlots = findPlots(map, 0, startY, mapWidth - 1);
  const southPlots = findPlots(map, startX, 0, mapWidth - 1);
  const westPlots = findPlots(map, mapWidth - 1, startY, mapWidth - 1);
  // render();

  const smallSteps = ~~(mapWidth / 2) - 1;

  const NEPlotsSM = findPlots(map, 0, mapWidth - 1, smallSteps);
  const NWPlotsSM = findPlots(map, mapWidth - 1, mapWidth - 1, smallSteps);
  const SEPlotsSM = findPlots(map, 0, 0, smallSteps);
  const SWPlotsSM = findPlots(map, mapWidth - 1, 0, smallSteps);

  const largeSteps = ~~((mapWidth * 3) / 2) - 1;

  const NEPlotsLG = findPlots(map, 0, mapWidth - 1, largeSteps);
  const NWPlotsLG = findPlots(map, mapWidth - 1, mapWidth - 1, largeSteps);
  const SEPlotsLG = findPlots(map, 0, 0, largeSteps);
  const SWPlotsLG = findPlots(map, mapWidth - 1, 0, largeSteps);

  // console.log({ SEPlotsSM, SWPlotsSM, NWPlotsSM, NEPlotsSM });
  // console.log({ SEPlotsLG, SWPlotsLG, NWPlotsLG, NEPlotsLG });
  // console.log({ oddGardenPlots, evenGardenPlots });

  const mainGardenPlots =
    oddGardens * oddGardenPlots + evenGardens * evenGardenPlots;

  const smallSidePlots =
    (gardenGridDiameter + 1) * (SEPlotsSM + SWPlotsSM + NWPlotsSM + NEPlotsSM);

  const largeSidePlots =
    gardenGridDiameter * (SEPlotsLG + SWPlotsLG + NWPlotsLG + NEPlotsLG);

  return (
    mainGardenPlots +
    smallSidePlots +
    largeSidePlots +
    northPlots +
    eastPlots +
    southPlots +
    westPlots
  );
};

import { BucketQueue } from "bucket-priority-queue";
import { createCombinations } from "../util/utils";

export type Floor = boolean[];
export type FloorMap = [Floor, Floor, Floor, Floor];
export type FloorSum = [number, number, number, number];

const parseToFloorMap = (input): FloorMap => {
  const lines = input.split("\n");
  const floors: FloorMap = [[], [], [], []];
  const itemList = [];

  lines.forEach((l, i) => {
    if (i === 3) return;
    const [, , itemsPart] = l.match(
      /The (\w+) floor contains(?: a )?([\w-, ]+)/
    );
    itemList.push(...itemsPart.split(/, a |,? and a /));
  });

  itemList.sort();

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < itemList.length; i++) {
      floors[j][i] = lines[j].includes(itemList[i]);
    }
  }

  return floors;
};

export const isWinner = (floorMap: FloorMap) =>
  floorMap[3].reduce((s, i) => s && i, true);

export const cloneFloors = (floorMap: FloorMap): FloorMap =>
  floorMap.map((floor) => floor.map((item) => item)) as FloorMap;

export const isEqualFloor = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

const hashFloor = (pos: number, state: FloorMap) => {
  const pairsA: FloorSum = [0, 0, 0, 0];
  const chipsA: FloorSum = [0, 0, 0, 0];
  const generatorsA: FloorSum = [0, 0, 0, 0];

  for (let f = 0; f < state.length; f++) {
    for (let i = 0; i < state[f].length; i += 2) {
      if (state[f][i] === true) {
        if (state[f][i + 1] === true) {
          pairsA[f]++;
        } else {
          chipsA[f]++;
        }
      } else if (state[f][i + 1] === true) {
        generatorsA[f]++;
      }
    }
  }

  return [pos, ...pairsA, ...chipsA, ...generatorsA].reduce(
    (a, b) => a * 13 + b,
    1
  );
};

export const isSimilarFloors = (a: FloorMap, b: FloorMap) => {
  const pairsA: FloorSum = [0, 0, 0, 0];
  const pairsB: FloorSum = [0, 0, 0, 0];
  const chipsA: FloorSum = [0, 0, 0, 0];
  const chipsB: FloorSum = [0, 0, 0, 0];
  const generatorsA: FloorSum = [0, 0, 0, 0];
  const generatorsB: FloorSum = [0, 0, 0, 0];

  for (let f = 0; f < a.length; f++) {
    for (let i = 0; i < a[f].length; i += 2) {
      if (a[f][i] === true) {
        if (a[f][i + 1] === true) {
          pairsA[f]++;
        } else {
          chipsA[f]++;
        }
      } else if (a[f][i + 1] === true) {
        generatorsA[f]++;
      }

      if (b[f][i] === true) {
        if (b[f][i + 1] === true) {
          pairsB[f]++;
        } else {
          chipsB[f]++;
        }
      } else if (b[f][i + 1] === true) {
        generatorsB[f]++;
      }
    }
  }

  return (
    isEqualFloor(pairsA, pairsB) &&
    isEqualFloor(chipsA, chipsB) &&
    isEqualFloor(generatorsA, generatorsB)
  );
};

export const isFloorMapValid = (floors: FloorMap) => {
  for (let f = 0; f < floors.length; f++) {
    let hasChipWithOutGen = false;
    let hasGenerator = false;

    for (let i = 0; i < floors[f].length; i++) {
      if (i % 2 === 0) {
        if (floors[f][i] === true) {
          hasGenerator = true;
        }
      } else if (floors[f][i] === true && floors[f][i - 1] !== true) {
        hasChipWithOutGen = true;
      }
    }

    if (hasChipWithOutGen && hasGenerator) return false;
  }

  return true;
};

const hasItemBelowFloor = (pos: number, floors: FloorMap) => {
  for (let i = 0; i < pos; i++) {
    if (floors[i].reduce((s, i) => s || i, false)) {
      return true;
    }
  }
  return false;
};

export const getNewStates = (
  pos: number,
  floors: FloorMap
): [number, FloorMap][] => {
  const newFloorMaps: [number, FloorMap][] = [];
  const items = [];

  for (let i = 0; i < floors[pos].length; i++) {
    if (floors[pos][i] === true) {
      items.push(i);
    }
  }

  const pairs = createCombinations<number>(items, 2);

  const hasItemBelow = hasItemBelowFloor(pos, floors);

  for (const [p1, p2] of pairs) {
    if (pos < 3) {
      const newState = cloneFloors(floors);

      newState[pos][p1] = false;
      newState[pos + 1][p1] = true;

      newState[pos][p2] = false;
      newState[pos + 1][p2] = true;

      if (isFloorMapValid(newState)) {
        newFloorMaps.push([pos + 1, newState]);
      }
    }

    if (pos > 0) {
      if (hasItemBelow) {
        const newState = cloneFloors(floors);

        newState[pos][p1] = false;
        newState[pos - 1][p1] = true;

        newState[pos][p2] = false;
        newState[pos - 1][p2] = true;

        if (isFloorMapValid(newState)) {
          newFloorMaps.push([pos - 1, newState]);
        }
      }
    }
  }

  for (const p of items) {
    if (pos < 3) {
      const newState = cloneFloors(floors);

      newState[pos][p] = false;
      newState[pos + 1][p] = true;

      if (isFloorMapValid(newState)) {
        newFloorMaps.push([pos + 1, newState]);
      }
    }
    if (pos > 0) {
      if (hasItemBelow) {
        const newState = cloneFloors(floors);

        newState[pos][p] = false;
        newState[pos - 1][p] = true;

        if (isFloorMapValid(newState)) {
          newFloorMaps.push([pos - 1, newState]);
        }
      }
    }
  }

  return newFloorMaps;
};

export const getMinElevatorRides = (input) => {
  const floorMap = parseToFloorMap(input);

  // priority q -> [step,position,FloorMap]
  const q = new BucketQueue<[number, number, FloorMap]>();
  q.push([0, 0, floorMap], 0);

  const visited = new Set();
  visited.add(hashFloor(0, floorMap));

  while (q.size > 0) {
    const [steps, pos, state] = q.popLowest();

    if (isWinner(state)) {
      return steps;
    }

    const newStates = getNewStates(pos, state);

    for (const [pos, newState] of newStates) {
      const myStateHash = hashFloor(pos, newState);
      if (!visited.has(myStateHash)) {
        visited.add(myStateHash);
        q.push([steps + 1, pos, newState], steps + 1);
      }
    }
  }

  return 0;
};

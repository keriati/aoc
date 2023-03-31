/* eslint-disable @typescript-eslint/no-use-before-define */
type Boundaries = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

type CellType = "clay" | "flow" | "settled";

interface ScanMap extends Map<number, CellType>, Boundaries {}

// Create a single integer from x y coordinates
const h = (x, y) => (x + 1) * 10000 + (y + 1);

const parseScan = (scanLines: string): ScanMap => {
  const scanMap: ScanMap = Object.assign(new Map(), {
    xMin: null,
    xMax: null,
    yMin: null,
    yMax: null,
  });

  let xMin = Number.MAX_SAFE_INTEGER;
  let yMin = Number.MAX_SAFE_INTEGER;
  let xMax = 0;
  let yMax = 0;

  for (const line of scanLines) {
    const [, p, ps, pe] = line.match(/(?:x|y)=(\d+), (?:x|y)=(\d+)..(\d+)/);
    const pn = Number(p);
    const pns = Number(ps);
    const pne = Number(pe);

    if (line.startsWith("x")) {
      for (let y = pns; y <= pne; y++) {
        scanMap.set(h(pn, y), "clay");
      }
      if (pn < xMin) xMin = pn;
      if (pn > xMax) xMax = pn;
      if (pns < yMin) yMin = pns;
      if (pne > yMax) yMax = pne;
    } else {
      for (let x = pns; x <= pne; x++) {
        scanMap.set(h(x, pn), "clay");
      }
      if (pn < yMin) yMin = pn;
      if (pn > yMax) yMax = pn;
      if (pns < xMin) xMin = pns;
      if (pne > xMax) xMax = pne;
    }
  }

  scanMap.xMin = xMin - 2;
  scanMap.xMax = xMax + 1;
  scanMap.yMin = yMin;
  scanMap.yMax = yMax;

  return scanMap;
};

const printMap = (scanMap: ScanMap) => {
  const screen = [];

  for (let y = scanMap.yMin; y <= scanMap.yMax; y++) {
    const row = [];

    for (let x = scanMap.xMin; x <= scanMap.xMax; x++) {
      const pos = h(x, y);

      if (scanMap.has(pos)) {
        const posType = scanMap.get(pos);
        switch (posType) {
          case "clay":
            row.push("#");
            break;
          case "flow":
            row.push("|");
            break;
          case "settled":
            row.push("~");
            break;
          default:
        }
      } else row.push(".");
    }

    screen.push(row.join(""));
  }

  return screen.join("\n");
};

const settleLevel = (scanMap: ScanMap, x: number, y: number) => {
  for (let xl = x - 1; scanMap.get(h(xl, y)) !== "clay"; xl--) {
    scanMap.set(h(xl, y), "settled");
  }
  for (let xr = x; scanMap.get(h(xr, y)) !== "clay"; xr++) {
    scanMap.set(h(xr, y), "settled");
  }
};

const getDropOff = (scanMap: ScanMap, x: number, y: number, step: number) => {
  x += step;

  const current = scanMap.get(h(x, y));
  const down = scanMap.get(h(x, y + 1));

  if (current === "clay") {
    return null;
  }

  if (current === "flow" && down === "flow") {
    return x;
  }

  if (!current && !down) {
    return x;
  }

  return getDropOff(scanMap, x, y, step);
};

const flow = (
  scanMap: ScanMap,
  xStart: number,
  xEnd: number,
  y: number,
  step = 1
) => {
  while (xStart <= xEnd) {
    if (scanMap.get(h(xStart, y)) === "clay") return;

    if (!scanMap.has(h(xStart, y))) {
      scanMap.set(h(xStart, y), "flow");
    }

    xStart++;
  }
};

const fill = (scanMap: ScanMap, x: number, y: number) => {
  const leftDropOff = getDropOff(scanMap, x, y, -1);
  const rightDropOff = getDropOff(scanMap, x, y, 1);

  if (!leftDropOff && !rightDropOff) {
    settleLevel(scanMap, x, y);
    fill(scanMap, x, y - 1);
    return;
  }

  if (leftDropOff !== null) {
    flow(scanMap, leftDropOff + 1, x, y);
    pour(scanMap, leftDropOff, y);
  } else {
    for (let xl = x - 1; scanMap.get(h(xl, y)) !== "clay"; xl--) {
      if (!scanMap.has(h(xl, y))) {
        scanMap.set(h(xl, y), "flow");
      }
    }
  }

  if (rightDropOff !== null) {
    flow(scanMap, x, rightDropOff - 1, y);
    pour(scanMap, rightDropOff, y);
  } else {
    flow(scanMap, x + 1, Number.MAX_SAFE_INTEGER, y);
  }
};

const pour = (scanMap: ScanMap, x: number, y: number) => {
  if (y > scanMap.yMax) return;

  if (!scanMap.has(h(x, y))) {
    scanMap.set(h(x, y), "flow");
    pour(scanMap, x, y + 1);
  } else if (["clay", "settled"].includes(scanMap.get(h(x, y)))) {
    fill(scanMap, x, y - 1);
  }
};

export const getWaterTiles = (input) => {
  const scanMap = parseScan(input.split("\n"));

  pour(scanMap, 500, scanMap.yMin);

  // const map = printMap(scanMap);
  // console.log(map);

  return [...scanMap].reduce(
    (s, [, t]) => (t === "flow" || t === "settled" ? s + 1 : s),
    0
  );
};

export const getSettledWaterTiles = (input) => {
  const scanMap = parseScan(input.split("\n"));

  pour(scanMap, 500, scanMap.yMin);

  return [...scanMap].reduce((s, [, t]) => (t === "settled" ? s + 1 : s), 0);
};

import fs from "fs";
import path from "path";
import { emitKeypressEvents } from "readline";
import { IntCodeComputer, STATUS_FINISHED } from "./IntCode09";

emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const readInput = (): string =>
  fs.readFileSync(path.resolve(__dirname, "./day13.txt"), {
    encoding: "utf8",
    flag: "r",
  });

const display = (code: number[]) => {
  const itemPositions = new Map<string, number>();
  let xMin = Number.MAX_SAFE_INTEGER;
  let xMax = 0;
  let yMin = Number.MAX_SAFE_INTEGER;
  let yMax = 0;
  let score = 0;

  for (let i = 0; i < code.length - 2; i += 3) {
    const x = code[i];
    const y = code[i + 1];
    const tile = code[i + 2];

    if (x === -1 && y === 0) {
      score = tile;
      continue;
    }

    itemPositions.set(`${x},${y}`, tile);

    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }

  let screen = `
Controls: <j  l^  k>
Score: ${score}`;

  for (let y = yMin; y <= yMax; y++) {
    screen += "\n";
    for (let x = xMin; x <= xMax; x++) {
      const tile = itemPositions.get(`${x},${y}`);

      switch (tile) {
        case 0:
          screen += " ";
          break;
        case 1:
          screen += "#";
          break;
        case 2:
          screen += "x";
          break;
        case 3:
          screen += "_";
          break;
        case 4:
          screen += "o";
          break;
        default:
      }
    }
  }

  return screen;
};

const main = () => {
  const code = readInput()
    .split(",")
    .map((n) => Number(n));

  code[0] = 2;

  const myPC = new IntCodeComputer(code);

  myPC.run();

  console.clear();
  console.log(display(myPC.getFullOutput()));

  const addInput = () => {
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "c") {
        process.exit();
      } else {
        if (key.name === "j") myPC.addInput(-1);
        if (key.name === "k") myPC.addInput(0);
        if (key.name === "l") myPC.addInput(1);

        const status = myPC.run();

        console.clear();
        console.log(display(myPC.getFullOutput()));
        if (status === STATUS_FINISHED) process.exit();
      }
    });
  };

  addInput();
};

main();

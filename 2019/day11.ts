import { IntCodeComputer, STATUS_FINISHED } from "./IntCode09";
import { mk2ns } from "../util/utils";

class Robot {
  private brain: IntCodeComputer;

  private direction = 0;

  private path: Map<number, number> = new Map();

  private positions = [0, 0];

  constructor(code: number[], startColor: number) {
    this.brain = new IntCodeComputer(code);
    this.path.set(mk2ns(this.positions[0], this.positions[1]), startColor);
  }

  drawPath() {
    let display = "";

    for (let y = 1; y > -7; y--) {
      display += "\n";
      for (let x = 0; x < 41; x++) {
        if (this.path.get(mk2ns(x, y)) === 1) {
          display += "#";
        } else {
          display += " ";
        }
      }
    }

    return display;
  }

  getStepsTaken(): number {
    return this.path.size;
  }

  start() {
    let status;

    do {
      const positionKey = mk2ns(this.positions[0], this.positions[1]);

      const color = this.path.has(positionKey) ? this.path.get(positionKey) : 0;

      this.brain.addInput(color);

      status = this.brain.run();

      const newColor = this.brain.getOutput();
      const newDirection = this.brain.getOutput();

      this.path.set(positionKey, newColor);
      this.adjustDirection(newDirection);
      this.move();
    } while (status !== STATUS_FINISHED);
  }

  private adjustDirection(newDirection: number) {
    this.direction += newDirection === 0 ? -90 : 90;
    if (this.direction < 0) this.direction += 360;
    if (this.direction > 360) this.direction -= 360;
    if (this.direction === 360) this.direction = 0;
  }

  private move() {
    switch (this.direction) {
      case 0:
        this.positions[1]++;
        break;
      case 90:
        this.positions[0]++;
        break;
      case 180:
        this.positions[1]--;
        break;
      case 270:
        this.positions[0]--;
        break;
      default:
        throw new Error("Invalid direction!");
    }
  }
}

export const getPanelsPainted = (input) => {
  const code: number[] = input.split(",").map((n) => Number(n));

  const robot = new Robot(code, 0);

  robot.start();

  return robot.getStepsTaken();
};

export const getRegID = (input) => {
  const code: number[] = input.split(",").map((n) => Number(n));

  const robot = new Robot(code, 1);

  robot.start();

  return robot.drawPath();
};

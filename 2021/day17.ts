export type Area = [[number, number], [number, number]];

class Probe {
  pos: [number, number] = [0, 0];

  steps = 0;

  velocity: [number, number];

  target: Area;

  constructor(velocity: [number, number], target: Area) {
    this.velocity = velocity;
    this.target = target;
  }

  fire() {
    const steps = [];
    let hit = false;
    while (!this.missedTarget()) {
      this.step();
      steps.push([this.pos[0], this.pos[1]]);
      if (this.isInTarget()) {
        hit = true;
      }
    }

    return [hit, steps];
  }

  step() {
    const [x, y] = this.pos;
    const [vx, vy] = this.velocity;

    this.pos = [x + vx, y + vy];
    this.velocity = [this.getNewVelocityX(vx), vy - 1];

    this.steps++;
  }

  isInTarget() {
    const [[sx, sy], [ex, ey]] = this.target;
    const [x, y] = this.pos;

    if (sx <= x && x <= ex) {
      if (sy >= y && y >= ey) {
        return true;
      }
    }
    return false;
  }

  missedTarget() {
    const [, [ex, ey]] = this.target;
    const [x, y] = this.pos;

    return x > ex || y < ey;
  }

  private getNewVelocityX(vx: number) {
    if (vx === 0) return vx;
    if (vx < 0) return vx + 1;
    return vx - 1;
  }
}

export const fireProbe = (
  [x, y],
  target: [[number, number], [number, number]]
) => {
  const myProbe = new Probe([x, y], target);

  return myProbe.fire();
};

export const getHighestShot = (target: Area) => {
  const results = [];
  const [[xs, ys], [xe, ye]] = target;

  for (let x = 0; x <= xe; x++) {
    for (let y = ye; y < xe; y++) {
      results.push(fireProbe([x, y], target));
    }
  }

  return results
    .filter(([hit]) => hit === true)
    .map(([, steps]) => steps)
    .flat(1)
    .map(([, y]) => y)
    .reduce((max, y) => (y > max ? y : max), 0);
};

export const getHitCount = (target: Area) => {
  const results = [];
  const [, [xe, ye]] = target;

  for (let x = 0; x <= xe; x++) {
    for (let y = ye; y <= xe; y++) {
      results.push(fireProbe([x, y], target));
    }
  }

  return results.filter(([hit]) => hit === true).length;
};

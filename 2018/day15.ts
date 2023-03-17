type UnitType = "E" | "G";

const hashPos = (x: number, y: number) => x * 1000 + y;

class Unit {
  x: number;

  y: number;

  health = 200;

  constructor(
    public readonly type: UnitType,
    x: number,
    y: number,
    public readonly ap: number
  ) {
    this.x = x;
    this.y = y;
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  hit(ap: number) {
    this.health -= ap;
  }
}

class Combat {
  private map: number[][] = [];

  units: Unit[] = [];

  private mapWindow: string[][] = [];

  private rounds = 0;

  constructor(input: string, ap = 3) {
    this.parseInput(input, ap);
    this.sortUnits();
    this.drawMap();
  }

  private parseInput(input: string, ap: number) {
    input.split("\n").forEach((l, y) =>
      l.split("").forEach((c, x) => {
        if (!Array.isArray(this.map[y])) this.map[y] = [];
        if (c === "#") {
          this.map[y][x] = 0;
        } else {
          this.map[y][x] = 1;
          if (c === "E" || c === "G") {
            this.units.push(new Unit(c, x, y, c === "E" ? ap : 3));
          }
        }
      })
    );
  }

  round() {
    for (const unit of [...this.units]) {
      if (unit.health < 0) continue;

      this.moveUnit(unit);

      this.getHitTarget(unit)?.hit(unit.ap);

      this.units = this.units.filter((u) => u.health > -1);

      if (
        this.units.indexOf(unit) !== this.units.length - 1 &&
        this.hasWinner()
      ) {
        return;
      }
    }

    this.sortUnits();

    this.rounds++;
  }

  private moveUnit(unit: Unit) {
    if (this.getHitTarget(unit)) return;
    const nextStep = this.getNextStep(unit);
    if (nextStep) {
      unit.move(nextStep[0], nextStep[1]);
    }
  }

  private getNextStep(unit: Unit): [number, number] | null {
    const { x, y } = unit;

    const neighbourPositions = [
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
    ];

    const candidateMoves = [];
    let minDist = Number.MAX_SAFE_INTEGER;

    for (const [nx, ny] of neighbourPositions) {
      if (this.map[ny][nx] !== 1) continue;
      if (this.hasUnit(nx, ny)) continue;

      const queue = [];
      queue.push([0, nx, ny]);

      const visited = new Set<number>();
      visited.add(hashPos(x, y));

      while (queue.length > 0) {
        const [dist, x, y] = queue.shift();

        if (dist > minDist) continue;

        const targetPositions = [
          [x, y - 1],
          [x - 1, y],
          [x + 1, y],
          [x, y + 1],
        ];

        for (const [tx, ty] of targetPositions) {
          if (this.map[ty][tx] === 1) {
            const targetEnemy = this.getEnemy(tx, ty, unit.type);
            if (targetEnemy) {
              candidateMoves.push([nx, ny, dist, x, y]);
              minDist = dist;
            }

            const key = hashPos(tx, ty);
            if (!this.hasUnit(tx, ty) && !visited.has(key)) {
              queue.push([dist + 1, tx, ty]);
              visited.add(key);
            }
          }
        }
      }
    }

    if (candidateMoves.length < 1) return null;

    candidateMoves.sort(
      ([sxA, syA, distA, txA, tyA], [sxB, syB, distB, txB, tyB]) => {
        if (distA !== distB) return distA - distB;
        if (tyA !== tyB) return tyA - tyB;
        if (txA !== txB) return txA - txB;
        if (syA !== syB) return syA - syB;
        if (sxA !== sxB) return sxA - sxB;
        return 0;
      }
    );

    return [candidateMoves[0][0], candidateMoves[0][1]];
  }

  private getHitTarget(unit: Unit): Unit | null {
    const { x, y, type } = unit;
    const enemies = [];
    const neighbours = [
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
    ];
    for (const [nx, ny] of neighbours) {
      const enemy = this.getEnemy(nx, ny, type);
      if (enemy) enemies.push(enemy);
    }
    if (enemies.length === 0) {
      return null;
    }
    enemies.sort((a, b) =>
      a.health !== b.health
        ? a.health - b.health
        : a.y !== b.y
        ? a.y - b.y
        : a.x - b.x
    );
    return enemies[0];
  }

  private getEnemy(x: number, y: number, type: UnitType): Unit | null {
    const targetType: UnitType = type === "G" ? "E" : "G";

    for (const unit of this.units) {
      if (unit.x === x && unit.y === y && unit.type === targetType) {
        return unit;
      }
    }
    return null;
  }

  draw() {
    const buf = this.mapWindow.map((r) => r.map((c) => c));
    const scores = [];
    for (const unit of this.units) {
      buf[unit.y][unit.x] = unit.type;
      scores.push(`${unit.type}(${unit.x},${unit.y}): ${unit.health}`);
    }

    console.clear();
    console.log(`\n${buf.flat(2).join("")}`);
    console.log(scores.join("\n"));
    console.log(`Rounds: ${this.rounds}`);
    console.log(`Score: ${this.getScore()}`);
  }

  private drawMap() {
    for (let y = 0; y < this.map.length; y++) {
      this.mapWindow[y] = [];
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x] === 0) this.mapWindow[y][x] = "#";
        if (this.map[y][x] === 1) this.mapWindow[y][x] = ".";
      }
      this.mapWindow[y].push("\n");
    }
  }

  private hasUnit(x: number, y: number) {
    for (const unit of this.units) {
      if (unit.x === x && unit.y === y) {
        return true;
      }
    }
    return false;
  }

  hasWinner() {
    let elves = 0;
    let goblins = 0;

    for (const unit of this.units) {
      if (unit.type === "G") {
        goblins++;
      } else {
        elves++;
      }
      if (elves > 0 && goblins > 0) return false;
    }

    return true;
  }

  getScore() {
    let score = 0;

    for (const character of this.units) {
      score += character.health;
    }

    return this.rounds * score;
  }

  private sortUnits() {
    this.units.sort((a, b) => (a.y !== b.y ? a.y - b.y : a.x - b.x));
  }
}

export const getGameScore = (input) => {
  const myGame = new Combat(input);

  while (!myGame.hasWinner()) {
    myGame.round();
  }

  return myGame.getScore();
};

export const getElfWinScore = (input) => {
  let attackPower = 3;
  let myGame = new Combat(input, attackPower);

  const elvesCount = myGame.units.reduce(
    (s, u) => (u.type === "E" ? s + 1 : s),
    0
  );
  const step = 1;

  while (step >= 1) {
    myGame = new Combat(input, attackPower);

    while (!myGame.hasWinner()) {
      myGame.round();
    }

    const elvesCountAfter = myGame.units.reduce(
      (s, u) => (u.type === "E" ? s + 1 : s),
      0
    );

    if (elvesCountAfter < elvesCount) {
      attackPower += step;
    }
    if (elvesCountAfter === elvesCount) {
      return myGame.getScore();
    }
  }

  return "fail";
};

export const getResultAnim = (input) => {
  const myGame = new Combat(input);

  myGame.draw();

  const roundInterval = setInterval(() => {
    myGame.round();
    myGame.draw();
    if (myGame.hasWinner()) clearInterval(roundInterval);
  }, 250);

  myGame.draw();
};

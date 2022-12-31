type Point = [number, number, number];

class HeightMap {
  map: number[][] = [];

  constructor(input: string) {
    input.split("\n").forEach((row, y) => {
      this.map[y] = [];
      row.split("").forEach((heightString, x) => {
        const height = Number.parseInt(heightString, 10);

        this.map[y][x] = height;
      });
    });
  }

  getLowPoints(): Point[] {
    const lowPoints = [];

    this.map.forEach((row, y) => {
      row.forEach((height, x) => {
        const myHeight = this.map[y][x];
        const neighbours = this.getNeighbours([x, y, myHeight]);
        const lowerPoint = neighbours.find(([, , z]) => z <= myHeight);

        if (!lowerPoint) {
          lowPoints.push([x, y, height]);
        }
      });
    });

    return lowPoints;
  }

  getAllBasinSizes() {
    const lowPoints = this.getLowPoints();
    const sizes = [];

    lowPoints.forEach((lowPoint) => {
      sizes.push(this.getBasinSize(lowPoint));
    });

    return sizes;
  }

  private getBasinSize(point: Point, visited = new Set()) {
    if (visited.has(point.toString())) {
      return 0;
    }
    visited.add(point.toString());

    if (point[2] >= 9) {
      return 0;
    }

    const neighbours = this.getNeighbours(point);

    let basinSize = 1;

    neighbours.forEach((neighbour) => {
      basinSize += this.getBasinSize(neighbour, visited);
    });

    return basinSize;
  }

  private getNeighbours([x, y]: Point) {
    const neighbours = [];

    if (typeof this.map[y][x - 1] === "number") {
      neighbours.push([x - 1, y, this.map[y][x - 1]]);
    }

    if (typeof this.map[y][x + 1] === "number") {
      neighbours.push([x + 1, y, this.map[y][x + 1]]);
    }

    if (this.map[y - 1]) {
      neighbours.push([x, y - 1, this.map[y - 1][x]]);
    }

    if (this.map[y + 1]) {
      neighbours.push([x, y + 1, this.map[y + 1][x]]);
    }

    return neighbours;
  }
}

export const getResult = (input) => {
  const myHeightMap = new HeightMap(input);

  const myLowPoints = myHeightMap.getLowPoints();

  return myLowPoints.reduce((sum, [, , z]) => sum + 1 + z, 0);
};

export const getResultPart2 = (input) => {
  const myHeightMap = new HeightMap(input);

  const allBasinSizes = myHeightMap.getAllBasinSizes();

  allBasinSizes.sort((a, b) => b - a);

  return allBasinSizes[0] * allBasinSizes[1] * allBasinSizes[2];
};

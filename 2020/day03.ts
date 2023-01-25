const getTreesOnSlope = (grid, dx, dy) => {
  let [x, y] = [0, 0];
  let trees = 0;
  const mapWidth = grid[0].length;

  while (y < grid.length - 1) {
    y += dy;
    x += dx;
    x = x > mapWidth - 1 ? x % mapWidth : x;

    trees += grid[y][x] === "#" ? 1 : 0;
  }

  return trees;
};

export const getNumberOfTrees = (input) => {
  const grid = input.split("\n").map((line) => line.split(""));

  return getTreesOnSlope(grid, 3, 1);
};

export const getNumberOfTreesProd = (input) => {
  const grid = input.split("\n").map((line) => line.split(""));

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  return slopes
    .map(([dx, dy]) => getTreesOnSlope(grid, dx, dy))
    .reduce((p, n) => n * p, 1);
};

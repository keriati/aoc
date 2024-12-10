const getDistance = (
  start: [number, number],
  end: [number, number],
  map: number[][]
) => {
  const queue = [start];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === end[0] && y === end[1]) {
      return 1;
    }

    const neis = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    for (const [nx, ny] of neis) {
      if (nx < 0 || nx >= map[0].length || ny < 0 || ny >= map.length) {
        continue;
      }

      if (map[ny][nx] === map[y][x] + 1) {
        queue.push([nx, ny]);
      }
    }
  }

  return 0;
};

export const getTHScore = (input: string) => {
  const map = input.split("\n").map((line) => line.split("").map(Number));
  const starts: [number, number][] = [];
  const ends: [number, number][] = [];

  let scores = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) {
        starts.push([x, y]);
      }
      if (map[y][x] === 9) {
        ends.push([x, y]);
      }
    }
  }

  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    let score = 0;

    for (let j = 0; j < ends.length; j++) {
      score += getDistance(start, ends[j], map);
    }

    scores += score;
  }

  return scores;
};

const getDistanceMulti = (
  start: [number, number],
  end: [number, number],
  map: number[][]
) => {
  const queue = [start];
  let routes = 0;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === end[0] && y === end[1]) {
      routes++;
    }

    const neis = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    for (const [nx, ny] of neis) {
      if (nx < 0 || nx >= map[0].length || ny < 0 || ny >= map.length) {
        continue;
      }

      if (map[ny][nx] === map[y][x] + 1) {
        queue.push([nx, ny]);
      }
    }
  }

  return routes;
};

export const getTHRating = (input: string) => {
  const map = input.split("\n").map((line) => line.split("").map(Number));
  const starts: [number, number][] = [];
  const ends: [number, number][] = [];

  let scores = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) {
        starts.push([x, y]);
      }
      if (map[y][x] === 9) {
        ends.push([x, y]);
      }
    }
  }

  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    let score = 0;

    for (let j = 0; j < ends.length; j++) {
      score += getDistanceMulti(start, ends[j], map);
    }

    scores += score;
  }

  return scores;
};

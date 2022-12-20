/* eslint-disable no-nested-ternary */
export const canMove = (from: string, to: string): boolean => {
  const myFrom = from === "S" ? "a" : from === "E" ? "z" : from;
  const myTo = to === "S" ? "a" : to === "E" ? "z" : to;
  return myFrom.charCodeAt(0) + 1 >= myTo.charCodeAt(0);
};

const addPath = (
  from: string,
  to: string,
  position: string,
  paths: Record<string, Set<string>>,
  targetPosition: string
) => {
  if (canMove(from, to)) {
    if (!(position in paths)) {
      paths[position] = new Set();
    }

    paths[position].add(targetPosition);
  }
};

const getPaths = (map: string[][]) => {
  const paths: Record<string, Set<string>> = {};

  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      const level = map[i][j];
      const position = `${i},${j},${level}`;

      if (map[i - 1]) {
        const targetLevel = map[i - 1][j];
        const targetPosition = `${i - 1},${j},${targetLevel}`;
        addPath(level, targetLevel, position, paths, targetPosition);
      }

      if (map[i + 1]) {
        const targetLevel = map[i + 1][j];
        const targetPosition = `${i + 1},${j},${targetLevel}`;
        addPath(level, targetLevel, position, paths, targetPosition);
      }

      if (map[i][j - 1]) {
        const targetLevel = map[i][j - 1];
        const targetPosition = `${i},${j - 1},${targetLevel}`;
        addPath(level, targetLevel, position, paths, targetPosition);
      }

      if (map[i][j + 1]) {
        const targetLevel = map[i][j + 1];
        const targetPosition = `${i},${j + 1},${targetLevel}`;
        addPath(level, targetLevel, position, paths, targetPosition);
      }
    }
  }

  return paths;
};

function getMinSteps(
  paths: Record<string, Set<string>>,
  startPosition: string,
  endPosition: string
) {
  const q: [string, number][] = [[startPosition, 0]];
  const visited = new Set(startPosition);

  while (q.length > 0) {
    const [position, distance] = q.shift();

    if (position === endPosition) return distance;

    if (paths[position]) {
      Array.from(paths[position]).forEach((pos) => {
        if (!visited.has(pos)) {
          visited.add(pos);
          q.push([pos, distance + 1]);
        }
      });
    }
  }

  return -1;
}

export const getFewestSteps = (mapString: string) => {
  const map = mapString.split("\n").map((line) => line.split(""));

  const paths = getPaths(map);

  const startPosition = Object.keys(paths).find((item) => item.endsWith("S"));
  const endPosition = Object.keys(paths).find((item) => item.endsWith("E"));

  return getMinSteps(paths, startPosition, endPosition);
};

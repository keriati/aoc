const normalize = (position: number) => (position + 100) % 100;

const getNewPosition = (
  direction: string,
  positions: number[],
  distance: number
) => (direction === "L" ? positions[0] - distance : positions[0] + distance);

const parseToDirectionDistance = (line: string): [string, number] => [
  line.charAt(0),
  Number(line.slice(1)),
];

const toEndPositions = (
  positions: number[],
  [direction, distance]: [string, number]
) => [normalize(getNewPosition(direction, positions, distance)), ...positions];

const INITIAL_POSITION = 50;
const NEW_LINE = "\n";

const countZeros = (result: number, position: number) =>
  position === 0 ? result + 1 : result;

export const getResult = (input: string) =>
  input
    .split(NEW_LINE)
    .map(parseToDirectionDistance)
    .reduce(toEndPositions, [INITIAL_POSITION])
    .reduce(countZeros, 0);

const countZeroes = (
  [position, zeroCount]: [number, number],
  [direction, distance]: [string, number]
): [number, number] => {
  let currentPosition = position;
  let newZeros = zeroCount;

  for (let i = 0; i < distance; i++) {
    currentPosition += direction === "R" ? 1 : -1;
    currentPosition = normalize(currentPosition);
    if (currentPosition === 0) newZeros++;
  }

  return [currentPosition, newZeros];
};

export const getResultPart2 = (input: string) =>
  input
    .split(NEW_LINE)
    .map(parseToDirectionDistance)
    .reduce(countZeroes, [INITIAL_POSITION, 0])[1];

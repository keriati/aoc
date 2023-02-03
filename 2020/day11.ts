const countNeighbours = (
  positions: [number, number],
  seats: string[][]
): number => {
  const [x, y] = positions;
  let neighbours = 0;

  if (seats[y]?.[x + 1] === "#") neighbours++;
  if (seats[y - 1]?.[x + 1] === "#") neighbours++;
  if (seats[y - 1]?.[x] === "#") neighbours++;
  if (seats[y - 1]?.[x - 1] === "#") neighbours++;
  if (seats[y]?.[x - 1] === "#") neighbours++;
  if (seats[y + 1]?.[x - 1] === "#") neighbours++;
  if (seats[y + 1]?.[x] === "#") neighbours++;
  if (seats[y + 1]?.[x + 1] === "#") neighbours++;

  return neighbours;
};

const getOccupiedSeatsRec = (state, prevState = null) => {
  const didChange =
    prevState === null ||
    typeof state.find((row, y) =>
      row.find((seat, x) => state[y][x] !== prevState[y][x])
    ) !== "undefined";

  if (!didChange) {
    return state
      .flatMap((a) => a)
      .reduce((sum, char) => sum + (char === "#" ? 1 : 0), 0);
  }

  const nextState = state.map((row, y) =>
    row.map((seat, x) => {
      let newSeat = seat;

      if (seat === "L") {
        if (countNeighbours([x, y], state) === 0) {
          newSeat = "#";
        }
      }

      if (seat === "#") {
        if (countNeighbours([x, y], state) >= 4) {
          newSeat = "L";
        }
      }

      return newSeat;
    })
  );

  return getOccupiedSeatsRec(nextState, state);
};

export const getOccupiedSeats = (input) => {
  const seats = input.split("\n").map((l) => l.split(""));

  return getOccupiedSeatsRec(seats);
};

const directionLookup = [
  (d, s, x, y) => s[y]?.[x + d],
  (d, s, x, y) => s[y - d]?.[x + d],
  (d, s, x, y) => s[y - d]?.[x],
  (d, s, x, y) => s[y - d]?.[x - d],
  (d, s, x, y) => s[y]?.[x - d],
  (d, s, x, y) => s[y + d]?.[x - d],
  (d, s, x, y) => s[y + d]?.[x],
  (d, s, x, y) => s[y + d]?.[x + d],
];

const countNeighboursLong = (
  positions: [number, number],
  seats: string[][]
): number => {
  const [x, y] = positions;
  let neighbours = 0;

  directionLookup.forEach((f) => {
    for (let i = 1; i < 100; i++) {
      const seat = f(i, seats, x, y);
      if (typeof seat === "undefined") break;
      if (seat === "#") {
        neighbours++;
        break;
      }
      if (seat === "L") {
        break;
      }
    }
  });

  return neighbours;
};

const getOccupiedSeatsImprovedRec = (state, prevState = null) => {
  const didChange =
    prevState === null ||
    typeof state.find((row, y) =>
      row.find((seat, x) => state[y][x] !== prevState[y][x])
    ) !== "undefined";

  if (!didChange) {
    return state
      .flatMap((a) => a)
      .reduce((sum, char) => sum + (char === "#" ? 1 : 0), 0);
  }

  const nextState = state.map((row, y) => {
    const newRow = row.map((seat, x) => {
      let newSeat = seat;

      if (seat === "L") {
        if (countNeighboursLong([x, y], state) === 0) {
          newSeat = "#";
        }
      }

      if (seat === "#") {
        if (countNeighboursLong([x, y], state) >= 5) {
          newSeat = "L";
        }
      }

      return newSeat;
    });

    return newRow;
  });

  return getOccupiedSeatsImprovedRec(nextState, state);
};

export const getOccupiedSeatsImproved = (input) => {
  const seats = input.split("\n").map((l) => l.split(""));

  return getOccupiedSeatsImprovedRec(seats);
};

// eslint-disable-next-line max-classes-per-file
class Position {
  constructor(public readonly x: number, public readonly y: number) {}
}

class BingoBoard {
  public fields: Map<string, Position> = new Map();

  public hits: Set<string> = new Set();

  public rowHits: Map<number, number> = new Map();

  public columnHits: Map<number, number> = new Map();

  constructor(boardInput: string) {
    const boardLines = boardInput.split("\n");

    boardLines.forEach((line, i) => {
      const boardLineItems = line.trim().split(/\s+/);

      boardLineItems.forEach((item, j) => {
        this.fields.set(item, new Position(i, j));
      });
    });
  }

  mark(item) {
    const position = this.fields.get(item);

    if (!(position instanceof Position)) {
      return;
    }

    this.hits.add(item);

    const rowHits = this.rowHits.has(position.x)
      ? this.rowHits.get(position.x)
      : 0;

    const columnHits = this.columnHits.has(position.y)
      ? this.columnHits.get(position.y)
      : 0;

    this.rowHits.set(position.x, rowHits + 1);
    this.columnHits.set(position.y, columnHits + 1);
  }

  getWinningRow() {
    const numbers = Array.from(this.rowHits).find(([, val]) => val === 5);
    return numbers || null;
  }

  getWinningCol() {
    const numbers = Array.from(this.columnHits).find(([, val]) => val === 5);
    return numbers || null;
  }

  getScore(num) {
    const baseScore = Array.from(this.fields).reduce(
      (score, [value, position]) => {
        if (!this.hits.has(value)) {
          score += Number.parseInt(value, 10);
        }
        return score;
      },
      0
    );

    return baseScore * num;
  }
}

export const getResult = (input) => {
  const [numbersInput, ...boardsInput] = input.split("\n\n");

  const boards: BingoBoard[] = boardsInput.map(
    (board) => new BingoBoard(board)
  );

  const numbers = numbersInput.split(",");

  let result = "nowin";
  let hasWinner = false;
  let score = 0;

  for (let i = 0; i < numbers.length; i += 1) {
    if (hasWinner) {
      break;
    }
    for (let j = 0; j < boards.length; j += 1) {
      boards[j].mark(numbers[i]);
      const winRow = boards[j].getWinningRow();
      const winCol = boards[j].getWinningCol();

      if (winRow !== null) {
        result = `Board ${j} row wins, with row ${winRow}`;
        hasWinner = true;
        score = boards[j].getScore(numbers[i]);
        break;
      }

      if (winCol !== null) {
        result = `Board ${j} col wins, with row ${winCol}`;
        hasWinner = true;
        score = boards[j].getScore(numbers[i]);
        break;
      }
    }
  }

  return score;
};

export const getResultPart2 = (input) => {
  const [numbersInput, ...boardsInput] = input.split("\n\n");

  const boards: BingoBoard[] = boardsInput.map(
    (board) => new BingoBoard(board)
  );

  const numbers = numbersInput.split(",");

  const wins = [];
  const boardsDone = new Set();

  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = 0; j < boards.length; j += 1) {
      if (boardsDone.has(j)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      boards[j].mark(numbers[i]);
      const winRow = boards[j].getWinningRow();
      const winCol = boards[j].getWinningCol();

      if (winRow !== null) {
        boardsDone.add(j);
        wins.push(boards[j].getScore(numbers[i]));
      }

      if (winCol !== null) {
        boardsDone.add(j);
        wins.push(boards[j].getScore(numbers[i]));
      }
    }
  }

  return wins.pop();
};

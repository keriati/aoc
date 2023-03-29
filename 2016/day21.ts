import { Deque } from "@blakeembrey/deque";

export const swapPosition = (op: string, scrambled: Deque<string>) => {
  const [, xs, ys] = op.match(/swap position (\d) with position (\d)/);
  const x = Number(xs);
  const y = Number(ys);

  const xl = scrambled.peek(x);
  const yl = scrambled.peek(y);

  scrambled.delete(x);
  scrambled.insert(x, yl);
  scrambled.delete(y);
  scrambled.insert(y, xl);

  return scrambled;
};

export const swapLetter = (op: string, scrambled: Deque<string>) => {
  const [, xl, yl] = op.match(/swap letter ([a-z]) with letter ([a-z])/);

  const x = scrambled.indexOf(xl);
  const y = scrambled.indexOf(yl);

  scrambled.delete(x);
  scrambled.insert(x, yl);
  scrambled.delete(y);
  scrambled.insert(y, xl);
  return scrambled;
};

export const rotate = (op: string, scrambled: Deque<string>) => {
  const [, dir, xs] = op.match(/rotate (left|right) (\d) step/);
  const x = Number(xs);

  if (dir === "right") scrambled.rotate(x);
  else scrambled.rotate(-1 * x);

  return scrambled;
};

export const rotateRev = (op: string, scrambled: Deque<string>) => {
  const [, dir, xs] = op.match(/rotate (left|right) (\d) step/);
  const x = Number(xs);

  if (dir === "left") scrambled.rotate(x);
  else scrambled.rotate(-1 * x);

  return scrambled;
};

export const rotateLetter = (op: string, scrambled: Deque<string>) => {
  const [, x] = op.match(/rotate based on position of letter ([a-z])/);

  const xi = scrambled.indexOf(x);

  scrambled.rotate(1 + xi);

  if (xi >= 4) scrambled.rotate(1);

  return scrambled;
};

export const rotateLetterRev = (op: string, scrambled: Deque<string>) => {
  const state = [...scrambled].join("");

  while (true) {
    scrambled.rotate(-1);

    const rotated = rotateLetter(op, new Deque([...scrambled]));
    const newState = [...rotated].join("");

    if (newState === state) break;
  }

  return scrambled;
};

export const reverse = (op: string, scrambled: Deque<string>) => {
  const [, xs, ys] = op.match(/reverse positions (\d) through (\d)/);
  const x = Number(xs);
  const y = Number(ys);

  const scr = [...scrambled];

  const start = scr.slice(0, x);
  const rev = scr.slice(x, y + 1).reverse();
  const end = scr.slice(y + 1);

  return new Deque([...start, ...rev, ...end]);
};

export const move = (op: string, scrambled: Deque<string>) => {
  const [, xs, ys] = op.match(/move position (\d) to position (\d)/);
  const x = Number(xs);
  const y = Number(ys);

  const xl = scrambled.peek(x);
  scrambled.delete(x);
  scrambled.insert(y, xl);

  return scrambled;
};

export const moveRev = (op: string, scrambled: Deque<string>) => {
  const [, xs, ys] = op.match(/move position (\d) to position (\d)/);
  const y = Number(xs);
  const x = Number(ys);

  const xl = scrambled.peek(x);
  scrambled.delete(x);
  scrambled.insert(y, xl);

  return scrambled;
};

function runOp(op: string, scrambled: Deque<string>) {
  const opStart = op.split(" ").slice(0, 2).join(" ");

  switch (opStart) {
    case "swap position":
      scrambled = swapPosition(op, scrambled);
      break;

    case "swap letter":
      scrambled = swapLetter(op, scrambled);
      break;

    case "rotate left":
    case "rotate right":
      scrambled = rotate(op, scrambled);
      break;

    case "rotate based":
      scrambled = rotateLetter(op, scrambled);
      break;

    case "reverse positions":
      scrambled = reverse(op, scrambled);
      break;

    case "move position":
      scrambled = move(op, scrambled);
      break;

    default:
      throw new Error("Operation not found!");
  }

  return scrambled;
}

function runOpRev(op: string, scrambled: Deque<string>) {
  const opStart = op.split(" ").slice(0, 2).join(" ");

  switch (opStart) {
    case "swap position":
      scrambled = swapPosition(op, scrambled);
      break;

    case "swap letter":
      scrambled = swapLetter(op, scrambled);
      break;

    case "rotate left":
    case "rotate right":
      scrambled = rotateRev(op, scrambled);
      break;

    case "rotate based":
      scrambled = rotateLetterRev(op, scrambled);
      break;

    case "reverse positions":
      scrambled = reverse(op, scrambled);
      break;

    case "move position":
      scrambled = moveRev(op, scrambled);
      break;

    default:
      throw new Error("Operation not found!");
  }

  return scrambled;
}

export const getScrambledPassword = (input, password) => {
  const ops = input.split("\n");

  let scrambled = new Deque<string>(password.split(""));

  for (const op of ops) {
    scrambled = runOp(op, scrambled);
  }

  return [...scrambled].join("");
};

export const getUnscrambledPassword = (input, password) => {
  const ops = input.split("\n").reverse();

  let scrambled = new Deque<string>(password.split(""));

  for (const op of ops) {
    scrambled = runOpRev(op, scrambled);
  }

  return [...scrambled].join("");
};

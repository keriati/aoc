import { Deque } from "@blakeembrey/deque";

const doProgramDance = (moves: string[], programs: Deque<string>) => {
  for (const move of moves) {
    const danceMove = move[0];
    if (danceMove === "s") {
      const amount = Number(move.slice(1));
      programs.rotate(amount);
    } else if (danceMove === "x") {
      const positions = move.slice(1);
      const [posAs, posBs] = positions.split("/");
      const posA = Number(posAs);
      const posB = Number(posBs);
      const A = programs.peek(posA);
      const B = programs.peek(posB);
      programs.delete(posA);
      programs.insert(posA, B);
      programs.delete(posB);
      programs.insert(posB, A);
    } else if (danceMove === "p") {
      const pA = move[1];
      const pB = move[3];
      const posA = programs.indexOf(pA);
      const posB = programs.indexOf(pB);
      const A = programs.peek(posA);
      const B = programs.peek(posB);
      programs.delete(posA);
      programs.insert(posA, B);
      programs.delete(posB);
      programs.insert(posB, A);
    }
  }
};

export const getDanceState = (input, programsString) => {
  const moves: string[] = input.split(",");
  const programs = new Deque<string>(programsString.split(""));

  doProgramDance(moves, programs);

  return Array.from(programs.entries()).join("");
};

export const getGigaDanceState = (input, programsString) => {
  const moves: string[] = input.split(",");
  const programs = new Deque<string>(programsString.split(""));
  const states = new Set<string>([programsString]);
  let rounds = 1;

  for (; rounds < 1_000_000_000; rounds++) {
    doProgramDance(moves, programs);
    const state = [...programs.entries()].join("");
    if (states.has(state)) {
      break;
    }
    states.add(state);
  }

  return [...states][1_000_000_000 % rounds];
};

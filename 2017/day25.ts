type State = {
  0: {
    write: boolean;
    move: number;
    next: string;
  };
  1: {
    write: boolean;
    move: number;
    next: string;
  };
};

type Turing = {
  cursor: number;
  tape: Set<number>;
};

const step = (state: State, turing: Turing): string => {
  const { write, move, next } = state[turing.tape.has(turing.cursor) ? 1 : 0];
  turing.tape[write ? "add" : "delete"](turing.cursor);
  turing.cursor += move;
  return next;
};

const parseStates = (statesRaw: string[]): Map<string, State> => {
  const states = new Map<string, State>();

  statesRaw.forEach((stateRaw) => {
    const [nameRaw, ...rest] = stateRaw.split("\n");
    const name = nameRaw.split(" ")[2].split(":")[0];
    const state: State = {
      0: {
        write: Boolean(Number(rest[1].split("value ")[1].split(".")[0])),
        move: rest[2].includes("right") ? 1 : -1,
        next: rest[3].split("state ")[1].split(".")[0],
      },
      1: {
        write: Boolean(Number(rest[5].split("value ")[1].split(".")[0])),
        move: rest[6].includes("right") ? 1 : -1,
        next: rest[7].split("state ")[1].split(".")[0],
      },
    };
    states.set(name, state);
  });

  return states;
};

export const getDiagnosticChecksum = (input: string) => {
  const [stepsRaw, ...statesRaw] = input.split("\n\n");
  const steps = Number(stepsRaw.split("after ")[1].split(" ")[0]);
  const states = parseStates(statesRaw);

  const turing: Turing = {
    cursor: 0,
    tape: new Set<number>(),
  };

  let nextState = "A";

  for (let i = 0; i < steps; i++) {
    nextState = step(states.get(nextState), turing);
  }

  return turing.tape.size;
};

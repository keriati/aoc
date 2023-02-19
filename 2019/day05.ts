type ParameterMode = "0" | "1";

const OPCODE_ADD = "1";
const OPCODE_MULTIPLY = "2";
const OPCODE_INPUT = "3";
const OPCODE_OUTPUT = "4";
const OPCODE_JUMPTRUE = "5";
const OPCODE_JUMPFALSE = "6";
const OPCODE_LESS = "7";
const OPCODE_EQUALS = "8";
const OPCODE_FINISH = "99";

const PMODE_POS: ParameterMode = "0";
const PMODE_INM: ParameterMode = "1";

const isOpcode = (opcode: number, opcodeType) =>
  `${opcode}`.endsWith(opcodeType);

const getParameterMode = (opcode: number, argNum: number) =>
  `${opcode}`.split("").reverse()[argNum];

const getParameter = (
  opcode: number,
  pointer: number,
  index: number,
  program: number[]
) => {
  const pMode = getParameterMode(opcode, index + 1);
  return pMode === PMODE_INM
    ? program[pointer + index]
    : program[program[pointer + index]];
};

const handleAdd = (program: number[], pointer: number): [number[], number] => {
  const newProgram = [...program];
  const opcode = newProgram[pointer];

  const p1 = getParameter(opcode, pointer, 1, program);
  const p2 = getParameter(opcode, pointer, 2, program);

  const outPosition = newProgram[pointer + 3];

  newProgram[outPosition] = p1 + p2;
  return [newProgram, pointer + 4];
};

const handleMultiply = (
  program: number[],
  pointer: number
): [number[], number] => {
  const newProgram = [...program];
  const opcode = newProgram[pointer];

  const p1 = getParameter(opcode, pointer, 1, program);
  const p2 = getParameter(opcode, pointer, 2, program);

  const outPosition = newProgram[pointer + 3];

  newProgram[outPosition] = p1 * p2;

  return [newProgram, pointer + 4];
};

export const run = (intCodes: number[], input: number[]): number[] => {
  let program = [...intCodes];
  const output = [];

  let pointer = 0;

  while (true) {
    const opcode = program[pointer];

    if (isOpcode(opcode, OPCODE_FINISH)) break;

    if (isOpcode(opcode, OPCODE_INPUT)) {
      const outPosition = program[pointer + 1];

      program[outPosition] = input.shift();
      pointer += 2;
      continue;
    }

    if (isOpcode(opcode, OPCODE_OUTPUT)) {
      const p1 = getParameter(opcode, pointer, 1, program);

      output.push(p1);
      pointer += 2;
      continue;
    }

    if (isOpcode(opcode, OPCODE_ADD)) {
      [program, pointer] = handleAdd(program, pointer);
      continue;
    }

    if (isOpcode(opcode, OPCODE_MULTIPLY)) {
      [program, pointer] = handleMultiply(program, pointer);
      continue;
    }

    if (isOpcode(opcode, OPCODE_JUMPTRUE)) {
      const p1 = getParameter(opcode, pointer, 1, program);
      const p2 = getParameter(opcode, pointer, 2, program);

      pointer = p1 !== 0 ? p2 : pointer + 3;
      continue;
    }

    if (isOpcode(opcode, OPCODE_JUMPFALSE)) {
      const p1 = getParameter(opcode, pointer, 1, program);
      const p2 = getParameter(opcode, pointer, 2, program);

      pointer = p1 === 0 ? p2 : pointer + 3;
      continue;
    }

    if (isOpcode(opcode, OPCODE_LESS)) {
      const p1 = getParameter(opcode, pointer, 1, program);
      const p2 = getParameter(opcode, pointer, 2, program);
      const outPosition = program[pointer + 3];

      program[outPosition] = p1 < p2 ? 1 : 0;
      pointer += 4;
      continue;
    }

    if (isOpcode(opcode, OPCODE_EQUALS)) {
      const p1 = getParameter(opcode, pointer, 1, program);
      const p2 = getParameter(opcode, pointer, 2, program);
      const outPosition = program[pointer + 3];

      program[outPosition] = p1 === p2 ? 1 : 0;
      pointer += 4;
      continue;
    }

    throw new Error(`Unknown opcode: ${program[pointer]}, ${pointer}`);
  }

  return output;
};

export const getResult = (input: string, param: number[]) => {
  const intCodes = input.split(",").map((c) => Number(c));

  return run(intCodes, param);
};

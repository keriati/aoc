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

export const STATUS_FINISHED = 1;
export const STATUS_SUSPENDED = 2;

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

export class IntCodeComputer {
  private code: number[];

  private pointer = 0;

  private input: number[] = [];

  private output: number[] = [];

  constructor(code: number[]) {
    this.code = code;
  }

  getOutput(): number {
    return this.output.shift();
  }

  addInput(value: number) {
    this.input.push(value);
  }

  run() {
    while (true) {
      const opcode = this.code[this.pointer];

      if (isOpcode(opcode, OPCODE_FINISH)) break;

      if (isOpcode(opcode, OPCODE_INPUT)) {
        if (this.input.length < 1) {
          return STATUS_SUSPENDED;
        }
        const outPosition = this.code[this.pointer + 1];

        this.code[outPosition] = this.input.shift();
        this.pointer += 2;
        continue;
      }

      if (isOpcode(opcode, OPCODE_OUTPUT)) {
        const p1 = getParameter(opcode, this.pointer, 1, this.code);

        this.output.push(p1);
        this.pointer += 2;
        continue;
      }

      if (isOpcode(opcode, OPCODE_ADD)) {
        [this.code, this.pointer] = handleAdd(this.code, this.pointer);
        continue;
      }

      if (isOpcode(opcode, OPCODE_MULTIPLY)) {
        [this.code, this.pointer] = handleMultiply(this.code, this.pointer);
        continue;
      }

      if (isOpcode(opcode, OPCODE_JUMPTRUE)) {
        const p1 = getParameter(opcode, this.pointer, 1, this.code);
        const p2 = getParameter(opcode, this.pointer, 2, this.code);

        this.pointer = p1 !== 0 ? p2 : this.pointer + 3;
        continue;
      }

      if (isOpcode(opcode, OPCODE_JUMPFALSE)) {
        const p1 = getParameter(opcode, this.pointer, 1, this.code);
        const p2 = getParameter(opcode, this.pointer, 2, this.code);

        this.pointer = p1 === 0 ? p2 : this.pointer + 3;
        continue;
      }

      if (isOpcode(opcode, OPCODE_LESS)) {
        const p1 = getParameter(opcode, this.pointer, 1, this.code);
        const p2 = getParameter(opcode, this.pointer, 2, this.code);
        const outPosition = this.code[this.pointer + 3];

        this.code[outPosition] = p1 < p2 ? 1 : 0;
        this.pointer += 4;
        continue;
      }

      if (isOpcode(opcode, OPCODE_EQUALS)) {
        const p1 = getParameter(opcode, this.pointer, 1, this.code);
        const p2 = getParameter(opcode, this.pointer, 2, this.code);
        const outPosition = this.code[this.pointer + 3];

        this.code[outPosition] = p1 === p2 ? 1 : 0;
        this.pointer += 4;
        continue;
      }

      throw new Error(
        `Unknown opcode: ${this.code[this.pointer]}, ${this.pointer}`
      );
    }

    return STATUS_FINISHED;
  }
}

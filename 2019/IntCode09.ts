type ParameterMode = "0" | "1" | "2";

const OPCODE_ADD = "1";
const OPCODE_MULTIPLY = "2";
const OPCODE_INPUT = "3";
const OPCODE_OUTPUT = "4";
const OPCODE_JUMPTRUE = "5";
const OPCODE_JUMPFALSE = "6";
const OPCODE_LESS = "7";
const OPCODE_EQUALS = "8";
const OPCODE_RELBASE = "9";
const OPCODE_FINISH = "99";

export const STATUS_FINISHED = 1;
export const STATUS_SUSPENDED = 2;

const PMODE_POS: ParameterMode = "0";
const PMODE_INM: ParameterMode = "1";
const PMODE_REL: ParameterMode = "2";

export class IntCodeComputer {
  private code: number[];

  private pointer = 0;

  private input: number[] = [];

  private output: number[] = [];

  private relativeBase = 0;

  constructor(code: number[]) {
    this.code = code;
  }

  getOutput(): number {
    return this.output.shift();
  }

  getFullOutput(): number[] {
    return [...this.output];
  }

  addInput(value: number) {
    this.input.push(value);
  }

  isOpcode(opcode: number, opcodeType) {
    return `${opcode}`.endsWith(opcodeType);
  }

  getParameterMode(opcode: number, argNum: number) {
    return `${opcode}`.split("").reverse()[argNum] || PMODE_POS;
  }

  getOutputParam(opcode: number, pointer: number, index: number) {
    const pMode = this.getParameterMode(opcode, index + 1);

    return pMode === PMODE_REL
      ? this.relativeBase + this.code[this.pointer + index]
      : this.code[this.pointer + index];
  }

  getParameter(
    opcode: number,
    pointer: number,
    index: number,
    program: number[]
  ) {
    const pMode = this.getParameterMode(opcode, index + 1);

    if (pMode === PMODE_INM) {
      return program[pointer + index];
    }

    if (pMode === PMODE_POS) {
      const pValue = program[program[pointer + index]];

      if (typeof pValue === "undefined") return 0;

      return pValue;
    }

    if (pMode === PMODE_REL) {
      const pValue = program[this.relativeBase + program[pointer + index]];

      if (typeof pValue === "undefined") return 0;

      return pValue;
    }

    throw new Error("Unknown Parameter Mode!");
  }

  handleAdd(program: number[], pointer: number): [number[], number] {
    const newProgram = [...program];
    const opcode = newProgram[pointer];

    const p1 = this.getParameter(opcode, pointer, 1, program);
    const p2 = this.getParameter(opcode, pointer, 2, program);

    const outPosition = this.getOutputParam(opcode, pointer, 3);

    newProgram[outPosition] = p1 + p2;
    return [newProgram, pointer + 4];
  }

  handleMultiply(program: number[], pointer: number): [number[], number] {
    const newProgram = [...program];
    const opcode = newProgram[pointer];

    const p1 = this.getParameter(opcode, pointer, 1, program);
    const p2 = this.getParameter(opcode, pointer, 2, program);

    const outPosition = this.getOutputParam(opcode, pointer, 3);

    newProgram[outPosition] = p1 * p2;

    return [newProgram, pointer + 4];
  }

  run() {
    while (true) {
      const opcode = this.code[this.pointer];

      if (this.isOpcode(opcode, OPCODE_FINISH)) break;

      if (this.isOpcode(opcode, OPCODE_INPUT)) {
        if (this.input.length < 1) {
          return STATUS_SUSPENDED;
        }

        const outPosition = this.getOutputParam(opcode, this.pointer, 1);

        this.code[outPosition] = this.input.shift();
        this.pointer += 2;
        continue;
      }

      if (this.isOpcode(opcode, OPCODE_OUTPUT)) {
        const p1 = this.getParameter(opcode, this.pointer, 1, this.code);

        this.output.push(p1);
        this.pointer += 2;
        continue;
      }

      if (this.isOpcode(opcode, OPCODE_ADD)) {
        [this.code, this.pointer] = this.handleAdd(this.code, this.pointer);
        continue;
      }

      if (this.isOpcode(opcode, OPCODE_MULTIPLY)) {
        [this.code, this.pointer] = this.handleMultiply(
          this.code,
          this.pointer
        );
        continue;
      }

      if (this.isOpcode(opcode, OPCODE_JUMPTRUE)) {
        const p1 = this.getParameter(opcode, this.pointer, 1, this.code);
        const p2 = this.getParameter(opcode, this.pointer, 2, this.code);

        this.pointer = p1 !== 0 ? p2 : this.pointer + 3;
        continue;
      }

      if (this.isOpcode(opcode, OPCODE_JUMPFALSE)) {
        const p1 = this.getParameter(opcode, this.pointer, 1, this.code);
        const p2 = this.getParameter(opcode, this.pointer, 2, this.code);

        this.pointer = p1 === 0 ? p2 : this.pointer + 3;
        continue;
      }

      if (this.isOpcode(opcode, OPCODE_LESS)) {
        const p1 = this.getParameter(opcode, this.pointer, 1, this.code);
        const p2 = this.getParameter(opcode, this.pointer, 2, this.code);
        const outPosition = this.getOutputParam(opcode, this.pointer, 3);

        this.code[outPosition] = p1 < p2 ? 1 : 0;
        this.pointer += 4;
        continue;
      }

      if (this.isOpcode(opcode, OPCODE_EQUALS)) {
        const p1 = this.getParameter(opcode, this.pointer, 1, this.code);
        const p2 = this.getParameter(opcode, this.pointer, 2, this.code);
        const outPosition = this.getOutputParam(opcode, this.pointer, 3);

        this.code[outPosition] = p1 === p2 ? 1 : 0;
        this.pointer += 4;
        continue;
      }

      if (this.isOpcode(opcode, OPCODE_RELBASE)) {
        const p1 = this.getParameter(opcode, this.pointer, 1, this.code);

        this.relativeBase += p1;
        this.pointer += 2;
        continue;
      }

      throw new Error(
        `Unknown opcode: ${opcode}! ${this.code[this.pointer]}, ${this.pointer}`
      );
    }

    return STATUS_FINISHED;
  }
}

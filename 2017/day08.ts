const getMax = (max, n) => (n > max ? n : max);

export const getRegisterMax = (input) => {
  const registers = new Map<string, number>();
  let maxVal = 0;

  input.split("\n").forEach((ins) => {
    const [, reg, op, val, condReg, condOp, condVal] = ins.match(
      /^(\w+) (dec|inc) (-?\d+) if (\w+) (.{1,3}) (-?\d+)$/
    );

    if (!registers.has(reg)) registers.set(reg, 0);
    if (!registers.has(condReg)) registers.set(condReg, 0);

    const condition = `${registers.get(condReg)} ${condOp} ${condVal}`;

    if (eval(condition)) {
      if (op === "inc") {
        registers.set(reg, registers.get(reg) + Number(val));
      }
      if (op === "dec") {
        registers.set(reg, registers.get(reg) - Number(val));
      }
    }

    const currentMax = Array.from(registers.values()).reduce(getMax);
    maxVal = currentMax > maxVal ? currentMax : maxVal;
  });

  return [Array.from(registers.values()).reduce(getMax), maxVal];
};

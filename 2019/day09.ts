import { IntCodeComputer } from "./IntCode09";

export const runIntCode = (input: string, param: number = null) => {
  const code = input.split(",").map((n) => Number(n));

  const intCodeComputer = new IntCodeComputer(code);

  if (param) intCodeComputer.addInput(param);

  intCodeComputer.run();

  return intCodeComputer.getFullOutput();
};

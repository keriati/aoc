export const getSumOfValues = (input) => {
  const lines = input.split("\n");
  const memory = new Map<number, number>();
  let mask = "";

  for (const line of lines) {
    if (line.startsWith("mask")) {
      [, mask] = line.split(" = ");
      continue;
    }

    const [, addrString, valString] = line.match(/mem\[(\d+)] = (\d+)/);
    const addr = Number(addrString);
    const val = Number(valString);

    const uint36val = val.toString(2).padStart(36, "0");

    const result = uint36val.split("").reduce((result, char, i) => {
      const newChar = mask[i] === "X" ? char : mask[i];
      return result + newChar;
    }, "");

    memory.set(addr, parseInt(result, 2));
  }

  return Array.from(memory.values()).reduce((sum, val) => sum + val, 0);
};

const updateMemory = (
  memory: Record<number, number>,
  maskedAddress: string,
  val: number
) => {
  if (maskedAddress.indexOf("X") === -1) {
    const address = parseInt(maskedAddress, 2);
    memory[address] = val;
    return;
  }

  const index = maskedAddress.indexOf("X");
  const ma1 = `${maskedAddress.substring(0, index)}0${maskedAddress.substring(
    index + 1
  )}`;
  const ma2 = `${maskedAddress.substring(0, index)}1${maskedAddress.substring(
    index + 1
  )}`;

  updateMemory(memory, ma1, val);
  updateMemory(memory, ma2, val);
};

export const getSumOfValuesV2 = (input) => {
  const lines = input.split("\n");
  const memory: Record<number, number> = {};
  let mask = "";

  for (const line of lines) {
    if (line.startsWith("mask")) {
      [, mask] = line.split(" = ");
      continue;
    }

    const [, str1, str2] = line.match(/mem\[(\d+)] = (\d+)/);
    const address = Number(str1);
    const value = Number(str2);

    const uint36address = address.toString(2).padStart(36, "0");

    const maskedAddress = uint36address.split("").reduce((result, char, i) => {
      if (mask[i] === "0") return `${result + char}`;
      if (mask[i] === "1") return `${result}1`;
      return `${result}X`;
    }, "");

    updateMemory(memory, maskedAddress, value);
  }

  return Object.values(memory).reduce((sum, val) => sum + val, 0);
};

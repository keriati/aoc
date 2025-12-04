const getJoltage = (batteries: number[], numberOfBatteries: number) => {
  let joltage = "";
  let position = 0;

  for (let i = numberOfBatteries; i > 0; i--) {
    const remainingBatteries = batteries.slice(
      position,
      batteries.length - i + 1
    );
    const selected = Math.max(...remainingBatteries);

    position += remainingBatteries.indexOf(selected) + 1;

    joltage += "" + selected;
  }

  return +joltage;
};

export const getResult = (input: string, numberOfBatteries = 2) => {
  const banks = input.split("\n").map((line) => line.split("").map(Number));

  let result = 0;

  for (let bank of banks) {
    result += getJoltage(bank, numberOfBatteries);
  }

  return result;
};

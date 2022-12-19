class Monkey {
  id: number;

  items: number[] = [];

  operation: (old) => number;

  divisor: number;

  luckyMonkey: number;

  unluckyMonkey: number;

  inspections = 0;

  constructor(description) {
    const descriptionLines = description.split("\n");

    this.id = Monkey.readId(descriptionLines);
    this.items = Monkey.readItems(descriptionLines);
    this.operation = Monkey.readOperation(descriptionLines);
    this.divisor = Monkey.readDivisor(descriptionLines);
    this.luckyMonkey = Monkey.readLuckyMonkey(descriptionLines);
    this.unluckyMonkey = Monkey.readUnluckyMonkey(descriptionLines);
  }

  private static readId(descriptionLines: string[]) {
    return Number.parseInt(descriptionLines[0].match(/\d/)[0], 10);
  }

  private static readItems(descriptionLines: string[]) {
    return descriptionLines[1]
      .split(":")[1]
      .split(", ")
      .map((item) => Number.parseInt(item, 10));
  }

  private static readOperation(descriptionLines: string[]) {
    const operationString = descriptionLines[2].split("=")[1];
    return (old) => {
      operationString.replaceAll("old", old);
      // eslint-disable-next-line no-eval
      return eval(operationString);
    };
  }

  private static readDivisor(descriptionLines: string[]) {
    return Number.parseInt(descriptionLines[3].split("by ")[1], 10);
  }

  private static readLuckyMonkey(descriptionLines: string[]) {
    return Number.parseInt(descriptionLines[4].split("monkey ")[1], 10);
  }

  private static readUnluckyMonkey(descriptionLines: string[]) {
    return Number.parseInt(descriptionLines[5].split("monkey ")[1], 10);
  }

  throw(monkeys) {
    this.items.forEach((item) => {
      this.inspections += 1;
      const worryLevel = this.operation(item);
      const worryLevelChilled = Math.floor(worryLevel / 3);

      if (worryLevelChilled % this.divisor === 0) {
        monkeys[this.luckyMonkey].items.push(worryLevelChilled);
      } else {
        monkeys[this.unluckyMonkey].items.push(worryLevelChilled);
      }
    });
    this.items = [];
  }
}

export const getMonkeyBusiness = (input) => {
  const monkeyDescriptions = input.split("\n\n");

  const monkeys: Monkey[] = monkeyDescriptions.map(
    (description) => new Monkey(description)
  );

  for (let i = 0; i < 20; i += 1) {
    monkeys.forEach((monkey) => monkey.throw(monkeys));
  }

  const mostInspectingMonkeys = [...monkeys].sort(
    (a, b) => b.inspections - a.inspections
  );

  return (
    mostInspectingMonkeys[0].inspections * mostInspectingMonkeys[1].inspections
  );
};

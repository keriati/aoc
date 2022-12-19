// eslint-disable-next-line max-classes-per-file
class Item {
  worry: number;

  constructor(worry) {
    this.worry = worry;
  }

  isLucky(divisor: number, operation: string, molulol: number = null): boolean {
    const myOperation = operation.replaceAll("old", `${this.worry}`);

    if (molulol === null) {
      // eslint-disable-next-line no-eval
      this.worry = eval(myOperation) / 3;
      this.worry = Math.floor(this.worry);
    } else {
      // eslint-disable-next-line no-eval
      this.worry = eval(myOperation) % molulol;
    }

    return this.worry % divisor === 0;
  }
}

class Monkey {
  id: number;

  items: Item[] = [];

  operation: string;

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
      .map((item) => new Item(Number.parseInt(item, 10)));
  }

  private static readOperation(descriptionLines: string[]) {
    return descriptionLines[2].split("=")[1];
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

  throw(monkeys, molulol: number = null) {
    this.items.forEach((item) => {
      this.inspections += 1;

      if (item.isLucky(this.divisor, this.operation, molulol)) {
        monkeys[this.luckyMonkey].items.push(item);
      } else {
        monkeys[this.unluckyMonkey].items.push(item);
      }
    });
    this.items = [];
  }
}

export const getMonkeyBusiness = (input, rounds, managingWorry = false) => {
  const monkeyDescriptions = input.split("\n\n");

  const monkeys: Monkey[] = monkeyDescriptions.map(
    (description) => new Monkey(description)
  );

  if (managingWorry) {
    // Part 2
    const molulol = monkeys.reduce(
      (state, monkey) => state * monkey.divisor,
      1
    );

    for (let i = 0; i < rounds; i += 1) {
      monkeys.forEach((monkey) => monkey.throw(monkeys, molulol));
    }
  } else {
    // Part 1
    for (let i = 0; i < rounds; i += 1) {
      monkeys.forEach((monkey) => monkey.throw(monkeys));
    }
  }

  const mostInspectingMonkeys = [...monkeys].sort(
    (a, b) => b.inspections - a.inspections
  );

  return (
    mostInspectingMonkeys[0].inspections * mostInspectingMonkeys[1].inspections
  );
};

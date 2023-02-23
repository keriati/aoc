class Bot {
  chips: number[] = [];

  constructor(
    public readonly name: string,
    public readonly low: string,
    public readonly high: string,
    public readonly bots: Map<string, Bot>,
    public readonly outputs: Map<string, number>
  ) {}

  give() {
    this.chips.sort((a, b) => a - b);
    const [lower, higher] = this.chips;

    if (this.low.startsWith("output")) {
      this.outputs.set(this.low, lower);
    } else {
      this.bots.get(this.low).addChip(lower);
    }

    if (this.high.startsWith("output")) {
      this.outputs.set(this.high, higher);
    } else {
      this.bots.get(this.high).addChip(higher);
    }
  }

  addChip(chip) {
    this.chips.push(chip);

    if (this.chips.length > 1) this.give();
  }
}

export const getBotResults = (input, chip1, chip2) => {
  const bots = new Map<string, Bot>();
  const outputs = new Map<string, number>();
  const lines = input.split("\n");

  lines.forEach((line) => {
    if (line.indexOf("gives low") > -1) {
      const [, name, low, high] = line.match(
        /([\w ]+) gives low to ([\w ]+) and high to ([\w ]+)/
      );

      bots.set(name, new Bot(name, low, high, bots, outputs));
    }
  });

  lines.forEach((line) => {
    if (line.indexOf("goes to") > -1) {
      const [, chipString, bot] = line.match(/value (\d+) goes to ([\w ]+)/);
      bots.get(bot).addChip(Number(chipString));
    }
  });

  const [botName] = Array.from(bots.values())
    .map((bot): [string, number[]] => [bot.name, bot.chips])
    .find(([, chips]) => chips.includes(chip1) && chips.includes(chip2));

  return [
    botName,
    outputs.get("output 0") * outputs.get("output 1") * outputs.get("output 2"),
  ];
};

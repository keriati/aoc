/* eslint-disable no-restricted-syntax,no-continue */
// eslint-disable-next-line max-classes-per-file
class PIRules {
  rules = new Map<string, string>();

  constructor(rulesList: string) {
    rulesList.split("\n").forEach((rule) => {
      const [ruleKey, ruleValue] = rule.split(" -> ");
      this.rules.set(ruleKey, ruleValue);
    });
  }

  get(k) {
    return this.rules.get(k);
  }
}

class Polymer {
  parts = new Map<string, number>();

  constructor(
    public readonly template: string,
    public readonly rules: PIRules
  ) {
    for (let i = 0; i < template.length - 1; i += 1) {
      const myPart = template.substring(i, i + 2);
      if (!this.parts.has(myPart)) this.parts.set(myPart, 0);
      this.parts.set(myPart, this.parts.get(myPart) + 1);
    }
  }

  doPairInsertion() {
    const newParts = new Map<string, number>();

    for (const [part, amount] of this.parts) {
      const newChar = this.rules.get(part);
      const part1 = `${part[0]}${newChar}`;
      const part2 = `${newChar}${part[1]}`;

      newParts.set(
        part1,
        newParts.has(part1) ? newParts.get(part1) + amount : amount
      );
      newParts.set(
        part2,
        newParts.has(part2) ? newParts.get(part2) + amount : amount
      );
    }
    this.parts = newParts;
  }

  getPolymerCount() {
    const allParts = new Map<string, number>();

    this.parts.forEach((amount, part) => {
      const p1 = part[0];
      const p2 = part[1];
      if (!allParts.has(p1)) allParts.set(p1, 0);
      if (!allParts.has(p2)) allParts.set(p2, 0);
      allParts.set(p1, allParts.get(p1) + amount);
      allParts.set(p2, allParts.get(p2) + amount);
    });

    const lastChar = this.template[this.template.length - 1];
    allParts.set(lastChar, allParts.get(lastChar) + 1);

    return Array.from(allParts.values()).map((i) => i / 2);
  }
}

export const getResult = (input, rounds) => {
  const [polymerTemplate, rulesList] = input.split("\n\n");

  const rules = new PIRules(rulesList);

  const myPolymer = new Polymer(polymerTemplate, rules);

  for (let i = 0; i < rounds; i += 1) {
    myPolymer.doPairInsertion();
  }

  const polymerCount = myPolymer.getPolymerCount();

  polymerCount.sort((a, b) => a - b);

  const mostCommon = polymerCount[0];
  const leastCommon = polymerCount[polymerCount.length - 1];

  return leastCommon - mostCommon;
};

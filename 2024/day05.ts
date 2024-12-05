import { DefaultDict, defaultDict } from "../util/utils";

type Rules = DefaultDict;

const parseRules = (rulesRaw: string[]): Rules =>
  rulesRaw
    .map((line) => line.split("|").map(Number))
    .reduce((rules, [key, value]) => {
      rules[key].add(value);
      return rules;
    }, defaultDict(Set));

const parseUpdates = (updatesRaw: string[]) =>
  updatesRaw.map((line) => line.split(",").map(Number));

const isOrdered = (update: number[], rules: Rules) => {
  for (let j = 0; j < update.length; j++) {
    const current = update[j];

    for (let k = j; k < update.length; k++) {
      const next = update[k];
      if (rules[next]?.has(current)) {
        return false;
      }
    }
  }

  return true;
};

export const getCorrectUpdatesSum = (input: string) => {
  const [rulesRaw, updatesRaw] = input.split("\n\n").map((x) => x.split("\n"));
  const rules = parseRules(rulesRaw);
  const updates = parseUpdates(updatesRaw);

  let result = 0;

  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];

    if (isOrdered(update, rules)) {
      result += update[Math.floor(update.length / 2)];
    }
  }

  return result;
};

const compareWithRules = (rules: Rules) => (a: number, b: number) =>
  rules[a]?.has(b) ? -1 : 0;

export const getOrderedUpdatesSum = (input: string) => {
  const [rulesRaw, updatesRaw] = input.split("\n\n").map((x) => x.split("\n"));
  const rules = parseRules(rulesRaw);
  const updates = parseUpdates(updatesRaw);

  let result = 0;

  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];

    if (!isOrdered(update, rules)) {
      const sorted = update.sort(compareWithRules(rules));

      result += sorted[Math.floor(update.length / 2)];
    }
  }

  return result;
};

import { createPairs } from "../util/utils";

export class Pair {
  constructor(
    public parent: Pair = null,
    public left: Pair | Value = null,
    public right: Pair | Value = null
  ) {}

  toString() {
    return `[${this.left},${this.right}]`;
  }
}

export class Value {
  constructor(public value: number, public parent: Pair = null) {}

  toString() {
    return this.value.toString();
  }
}

export const parse = (input: any): Pair | Value => {
  if (typeof input === "number") return new Value(input);

  const parent = new Pair(null, null, null);

  const left = parse(input[0]);
  const right = parse(input[1]);

  left.parent = parent;
  right.parent = parent;

  parent.left = left;
  parent.right = right;

  return parent;
};

export const explode = (root: Pair) => {
  let queue: [Pair, number][] = [[root, 0]];

  while (queue.length) {
    const [current, depth] = queue.pop();

    if (depth >= 4) {
      // find left neighbor
      let search: Pair | Value = current;

      while (search.parent) {
        if (search.parent.left !== search) {
          search = search.parent.left;
          break;
        }
        search = search.parent;
      }

      if (search.parent) {
        while (!(search instanceof Value)) {
          search = search.right;
        }
        (search as Value).value += (current.left as Value).value;
      }

      // find right neighbor
      search = current;

      while (search.parent) {
        if (search.parent.right !== search) {
          search = search.parent.right;
          break;
        }
        search = search.parent;
      }

      if (search.parent) {
        while (!(search instanceof Value)) {
          search = search.left;
        }
        (search as Value).value += (current.right as Value).value;
      }

      const newValue = new Value(0);
      newValue.parent = current.parent;

      if (current.parent.left === current) {
        current.parent.left = newValue;
      } else {
        current.parent.right = newValue;
      }

      queue = [[root, 0]];
      continue;
    }

    if (current.right instanceof Pair) {
      queue.push([current.right, depth + 1]);
    }

    if (current.left instanceof Pair) {
      queue.push([current.left, depth + 1]);
    }
  }

  return root;
};

export const split = (root: Pair) => {
  let queue: Array<Pair | Value> = [root];

  while (queue.length) {
    const current = queue.pop();

    if (current instanceof Value && current.value > 9) {
      const newPair = new Pair(current.parent);

      newPair.left = new Value(Math.floor(current.value / 2), newPair);
      newPair.right = new Value(Math.ceil(current.value / 2), newPair);

      newPair.parent = current.parent;

      if (current.parent.left === current) {
        current.parent.left = newPair;
      } else {
        current.parent.right = newPair;
      }

      root = explode(root);
      queue = [root];
      continue;
    }

    if (current instanceof Pair) {
      queue.push(current.right);
      queue.push(current.left);
    }
  }

  return root;
};

export const add = (root1: Pair, root2: Pair) => {
  const newRoot = new Pair(null, root1, root2);
  root1.parent = newRoot;
  root2.parent = newRoot;

  return newRoot;
};

export const score = (pair: Pair | Value) => {
  if (pair instanceof Value) {
    return pair.value;
  }

  return 3 * score(pair.left) + 2 * score(pair.right);
};

export const getResult = (input: string, doScore = true) => {
  const rawNumbers = input.split("\n").map((l) => JSON.parse(l));

  const numbers: Pair[] = rawNumbers.map(parse) as Pair[];

  const firstNumber = numbers.shift();

  const result = numbers.reduce(
    (acc, n) => split(explode(add(acc, n))),
    firstNumber
  );

  if (!doScore) return result;

  return score(result);
};

export const getResultPart2 = (input: string, doScore = true) => {
  const rawNumbers = input.split("\n").map((l) => JSON.parse(l));
  const pairsRaw = createPairs(rawNumbers);

  const pairs = [];

  for (const [n1, n2] of pairsRaw) {
    pairs.push([parse(n1), parse(n2)]);
    pairs.push([parse(n2), parse(n1)]);
  }

  let maxValue = 0;

  for (const [n1, n2] of pairs) {
    const val1 = score(split(explode(add(n1, n2))));

    if (val1 > maxValue) {
      maxValue = val1;
    }
  }

  return maxValue;
};

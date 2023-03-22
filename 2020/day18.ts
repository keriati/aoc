export const getHomeworkResult = (input) => {
  const lines = input.split("\n").map((l) =>
    l
      .split("")
      .filter((a) => a !== " ")
      .map((c) => (c.match(/\d+/) ? Number(c) : c))
  );
  let result = 0;

  for (const line of lines) {
    const resultStack = [0];
    const operators = [["+"]];

    for (const char of line) {
      if (typeof char === "number") {
        const myOp = operators[resultStack.length - 1].pop();
        if (!myOp || myOp === "+") resultStack[resultStack.length - 1] += char;
        if (myOp === "*") resultStack[resultStack.length - 1] *= char;
      }

      if (["+", "*"].includes(char)) {
        operators[resultStack.length - 1].push(char);
      }

      if (char === "(") {
        resultStack.push(0);
        operators[resultStack.length - 1] = [];
        operators[resultStack.length - 1].push("+");
      }

      if (char === ")") {
        const amount = resultStack.pop();
        const myOp = operators[resultStack.length - 1].pop();
        if (!myOp || myOp === "+")
          resultStack[resultStack.length - 1] += amount;
        if (myOp === "*") resultStack[resultStack.length - 1] *= amount;
      }
    }

    result += resultStack[0];
  }

  return result;
};

const evaluatePart = (
  line: (string | number)[],
  index = 0
): { index: number; result: number } => {
  const results = [0];
  let partialIndex = index;

  for (let i = index; i < line.length; i++) {
    const char = line[i];

    if (char === ")") {
      partialIndex = i;
      break;
    }

    if (char === "(") {
      const { index: partialIndex, result: partialResult } = evaluatePart(
        line,
        i + 1
      );
      results[results.length - 1] += partialResult;
      i = partialIndex;
      continue;
    }

    if (typeof char === "string" && char === "*") {
      results.push(0);
      continue;
    }

    if (typeof char === "number") {
      results[results.length - 1] += char;
    }
  }

  return { index: partialIndex, result: results.reduce((s, n) => s * n, 1) };
};

export const getHomeworkResultPart2 = (input) => {
  const lines = input.split("\n").map((l) =>
    l
      .split("")
      .filter((a) => a !== " ")
      .map((c) => (c.match(/\d+/) ? Number(c) : c))
  );
  let result = 0;

  for (const line of lines) {
    result += evaluatePart(line).result;
  }

  return result;
};

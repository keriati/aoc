export const getResult = (input: string) =>
  input
    .split("\n\n")
    [input.split("\n\n").length - 1].split("\n")
    .map((line) =>
      line
        .match(/^(\d+)x(\d+): (\d+) (\d+) (\d+) (\d+) (\d+) (\d+)$/)
        .map(Number)
    )
    .map(([, w, h, ...amounts]) => [w * h, amounts] as [number, number[]])
    .reduce(
      (result, [area, shapeAmounts]) =>
        shapeAmounts.reduce((t, amount, i) => t + 9 * amount, 0) <= area
          ? result + 1
          : result,
      0
    );

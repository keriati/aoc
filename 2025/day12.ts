export const getResult = (input: string) => {
  const lines = input.split("\n\n");
  const shapes = lines.slice(0, -1).map((r) => 9);

  return lines[lines.length - 1]
    .split("\n")
    .map((line) =>
      line
        .match(/^(\d+)x(\d+): (\d+) (\d+) (\d+) (\d+) (\d+) (\d+)$/)
        .map(Number)
    )
    .map(([, w, h, ...amounts]) => [w * h, amounts] as [number, number[]])
    .reduce(
      (result, [area, shapeAmounts]) =>
        shapeAmounts.reduce((t, amount, i) => t + shapes[i] * amount, 0) <= area
          ? result + 1
          : result,
      0
    );
};

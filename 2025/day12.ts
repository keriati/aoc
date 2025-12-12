export const getResult = (input: string) =>
  input
    .split("\n")
    .slice(30)
    .map((line) =>
      line
        .match(/^(\d+)x(\d+): (\d+) (\d+) (\d+) (\d+) (\d+) (\d+)$/)
        .map(Number)
    )
    .map(([, m, e, rr, y, X, M, A, S]) => [m * e, rr + y + X + M + A + S])
    .reduce((r, [a, s]) => (s * 9 <= a ? r + 1 : r), 0);

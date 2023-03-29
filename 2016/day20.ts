const parseRanges = (input) => {
  const ranges = input
    .split("\n")
    .map((l) => l.split("-"))
    .map(([s, e]) => [Number(s), Number(e)])
    .map(([a, b]) => (a < b ? [a, b] : [b, a]));

  ranges.sort(([as, ae], [bs, be]) => (as !== bs ? as - bs : ae - be));

  return ranges;
};

export const getLowestIP = (input) => {
  const ranges = parseRanges(input);

  let result = 0;

  for (const [rs, re] of ranges) {
    if (rs <= result) {
      if (re >= result) {
        result = re + 1;
      }
    } else {
      break;
    }
  }

  return result;
};

export const getIPCount = (input, portCount: number) => {
  const ranges = parseRanges(input);

  const adjustedRanges = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    let [rangeStart, rangeEnd] = ranges[i];
    const [prevRangeStart, prevRangeEnd] =
      adjustedRanges[adjustedRanges.length - 1];

    if (rangeStart < prevRangeStart) rangeStart = prevRangeStart + 1;

    if (prevRangeStart <= rangeStart && prevRangeEnd >= rangeEnd) continue;

    if (prevRangeEnd >= rangeStart && prevRangeEnd < rangeEnd) {
      adjustedRanges.push([prevRangeEnd + 1, rangeEnd]);
      continue;
    }

    if (prevRangeEnd < rangeStart) {
      adjustedRanges.push([rangeStart, rangeEnd]);
      continue;
    }

    throw new Error("range error!");
  }

  let result = portCount;

  for (const [start, end] of adjustedRanges) {
    result -= end - start + 1;
  }

  return result + 1;
};

export const getResult = (input: string) => {
  const [rangesRaw, ingredientsRaw] = input.split("\n\n");
  const ranges = rangesRaw.split("\n").map((line) => {
    const [min, max] = line.split("-").map(Number);
    return [min, max];
  });
  const ingredients = ingredientsRaw.split("\n").map(Number);
  let result = 0;

  for (const ingredient of ingredients) {
    let isFresh = false;
    for (const [min, max] of ranges) {
      if (ingredient >= min && ingredient <= max) {
        isFresh = true;
        break;
      }
    }
    if (isFresh) {
      result++;
    }
  }

  return result;
};

export const getResultPart2 = (input: string) => {
  const [rangesRaw] = input.split("\n\n");
  let ranges = rangesRaw.split("\n").map((line) => {
    const [min, max] = line.split("-").map(Number);
    return [min, max];
  });

  let newRanges = [...ranges];

  while (true) {
    let adjusted = false;

    for (const range of ranges) {
      for (const newRange of newRanges) {
        // total overlap
        if (
          range[0] < newRange[0] &&
          range[1] >= newRange[0] &&
          range[1] >= newRange[1]
        ) {
          newRange[0] = range[0];
          newRange[1] = range[1];
          adjusted = true;
        }
        // front overlap
        else if (
          range[0] <= newRange[0] &&
          range[1] >= newRange[0] &&
          range[1] < newRange[1]
        ) {
          newRange[0] = range[0];
          adjusted = true;
        }
        // end overlap
        else if (
          range[0] > newRange[0] &&
          range[0] <= newRange[1] &&
          range[1] >= newRange[1]
        ) {
          newRange[1] = range[1];
          adjusted = true;
        }
      }
    }

    const noOverlapRanges = [];
    for (const newRange of newRanges) {
      let overlap = false;

      for (const otherRange of newRanges) {
        if (newRange[0] === otherRange[0] && newRange[1] === otherRange[1]) {
          continue;
        }
        if (newRange[0] >= otherRange[0] && newRange[1] <= otherRange[1]) {
          overlap = true;
        }
      }
      if (!overlap) {
        noOverlapRanges.push(newRange);
      }
    }

    newRanges = noOverlapRanges;

    const newRangeSet = new Set<string>();

    for (const newRange of newRanges) {
      newRangeSet.add(newRange.join("-"));
    }
    newRanges = Array.from(newRangeSet).map((str) =>
      str.split("-").map(Number)
    );

    ranges = [...newRanges];
    newRanges = [...ranges];

    if (!adjusted) {
      break;
    }
  }

  return newRanges.reduce((acc, [min, max]) => acc + (max - min + 1), 0);
};

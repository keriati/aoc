export const getIncreases = (input) => {
  const measurements = input.split("\n");
  let increases = 0;

  for (let i = 1; i < measurements.length; i += 1) {
    const current = Number.parseInt(measurements[i], 10);
    const prev = Number.parseInt(measurements[i - 1], 10);

    if (current > prev) {
      increases += 1;
    }
  }

  return increases;
};

export const getIncreasesWithWindow = (input) => {
  const measurementsString = input.split("\n");

  const measurements = measurementsString.map((i) => Number.parseInt(i, 10));

  let increases = 0;

  for (let i = 1; i < measurements.length; i += 1) {
    if (typeof measurements[i + 2] !== "number") {
      break;
    }

    const current = measurements[i] + measurements[i + 1] + measurements[i + 2];
    const prev = measurements[i - 1] + measurements[i] + measurements[i + 1];

    if (current > prev) {
      increases += 1;
    }
  }

  return increases;
};

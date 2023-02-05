export const getResult = (input) => {
  const [timestampString, busString] = input.split("\n");
  const timestamp = parseInt(timestampString, 10);
  const busses = busString
    .split(",")
    .filter((n) => n !== "x")
    .map((n) => parseInt(n, 10));

  for (let departTime = timestamp + 1; true; departTime++) {
    const bus = busses.find((bus) => departTime % bus === 0);
    if (typeof bus !== "undefined") {
      return (departTime - timestamp) * bus;
    }
  }
};

export const getResult2 = (input) => {
  const buses: number[] = input
    .split("\n")[1]
    .split(",")
    .map((n) => (n === "x" ? 1 : parseInt(n, 10)));

  let time = 0;
  let stepSize = buses[0];

  buses.forEach((bus, i) => {
    if (i === 0) return;

    while ((time + i) % bus !== 0) {
      time += stepSize;
    }

    stepSize *= bus;
  });

  return time;
};

export const getResult = (input: string) => {
  const times = input
    .split("\n")[0]
    .split(":")[1]
    .trim()
    .split(/ +/)
    .map(Number);
  const distances = input
    .split("\n")[1]
    .split(":")[1]
    .trim()
    .split(/ +/)
    .map(Number);

  let result = 1;

  for (let i = 0; i < times.length; i++) {
    const raceTime = times[i];
    let wins = 0;
    for (let speed = 0; speed < raceTime; speed++) {
      const distance = (raceTime - speed) * speed;
      if (distance > distances[i]) {
        wins++;
      }
    }
    result *= wins;
  }

  return result;
};

export const getResultPart2 = (input: string) => {
  const time = Number(
    input.split("\n")[0].split(":")[1].trim().replaceAll(" ", "")
  );
  const distance = Number(
    input.split("\n")[1].split(":")[1].trim().replaceAll(" ", "")
  );

  for (let speed = 0; speed < time; speed++) {
    const newDistance = (time - speed) * speed;
    if (newDistance > distance) {
      return time - speed * 2 + 1;
    }
  }
};

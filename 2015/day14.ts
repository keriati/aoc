type Deer = {
  speed: number;
  active: number;
  rest: number;
  score: number;
  distance: number;
};

const parseReinDeer = (input): Deer[] =>
  input.split("\n").map((l) => {
    const [, speed, active, rest] = l.match(
      /can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./
    );
    return {
      speed: Number(speed),
      active: Number(active),
      rest: Number(rest),
      score: 0,
      distance: 0,
    };
  });

const getDeerDistance = (time, deer) => {
  const fullCycles = Math.floor(time / (deer.active + deer.rest));
  const fullCycleTime = fullCycles * (deer.active + deer.rest);
  const extraTime = time - fullCycleTime;
  const extraFlyTime =
    extraTime > 0 ? (extraTime > deer.active ? deer.active : extraTime) : 0;

  return fullCycles * deer.speed * deer.active + extraFlyTime * deer.speed;
};

export const getWinningDeerDistance = (input, duration) =>
  parseReinDeer(input)
    .map((deer) => getDeerDistance(duration, deer))
    .reduce((max, distance) => (distance > max ? distance : max), 0);

export const getWinningDeerScore = (input, duration) => {
  const reindeer = parseReinDeer(input);

  for (let t = 1; t <= duration; t++) {
    let bestDistance = 0;

    for (const deer of reindeer) {
      deer.distance = getDeerDistance(t, deer);

      if (deer.distance > bestDistance) {
        bestDistance = deer.distance;
      }
    }

    for (const deer of reindeer) {
      if (deer.distance === bestDistance) deer.score++;
    }
  }

  return reindeer.reduce((max, d) => (d.score > max ? d.score : max), 0);
};

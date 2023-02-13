type GuardSleepTimes = Map<string, Map<number, number>>;

const getTimeLogs = (input) => {
  const timeLogs = input.split("\n").map((l) => {
    const [dateString, description] = l.split("] ");
    const date = new Date(dateString.substring(1));

    return [date, description];
  });

  timeLogs.sort(([a], [b]) => a - b);

  return timeLogs;
};

const getSleepTimes = (timeLogs): GuardSleepTimes => {
  const sleepTimes: GuardSleepTimes = new Map();

  let id = null;
  let start = null;

  for (const [dateTime, description] of timeLogs) {
    if (description.startsWith("Guard")) {
      [id] = description.split("Guard #")[1].split(" ");
    }

    if (description === "falls asleep") {
      start = dateTime;
    }

    if (description === "wakes up") {
      if (!sleepTimes.has(id)) sleepTimes.set(id, new Map());

      const minuteMap = sleepTimes.get(id);

      for (let i = start.getMinutes(); i < dateTime.getMinutes(); i++) {
        if (!minuteMap.has(i)) minuteMap.set(i, 0);
        minuteMap.set(i, minuteMap.get(i) + 1);
      }
    }
  }

  return sleepTimes;
};

const getMostSleepingGuard = (sleepTimes: GuardSleepTimes) => {
  let mostSleepingGuard = null;
  let maxMinutes = 0;

  for (const [id, times] of sleepTimes) {
    const minutesSleeping = Array.from(times.values()).reduce(
      (s, v) => s + v,
      0
    );
    if (minutesSleeping > maxMinutes) {
      maxMinutes = minutesSleeping;
      mostSleepingGuard = id;
    }
  }
  return mostSleepingGuard;
};

const getMostSleptMinute = (
  mostSleepingGuardSleepTimes: Map<number, number>
) => {
  let mostSleptMinute = null;
  let minCount = 0;

  for (const [min, count] of mostSleepingGuardSleepTimes) {
    if (count > minCount) {
      minCount = count;
      mostSleptMinute = min;
    }
  }
  return mostSleptMinute;
};

export const getReposeResults = (input) => {
  const timeLogs = getTimeLogs(input);

  const sleepTimes = getSleepTimes(timeLogs);

  const mostSleepingGuard = getMostSleepingGuard(sleepTimes);

  const mostSleepingGuardSleepTimes = sleepTimes.get(mostSleepingGuard);

  const mostSleptMinute = getMostSleptMinute(mostSleepingGuardSleepTimes);

  return mostSleepingGuard * mostSleptMinute;
};

export const getReposeMinute = (input) => {
  const timeLogs = getTimeLogs(input);

  const sleepTimes = getSleepTimes(timeLogs);

  let mostFreqGuardId = null;
  let mostFreqMin = 0;
  let mostFreqMinCount = 0;

  for (const [guardId, guardSleepingMinutes] of sleepTimes) {
    for (const [minute, count] of guardSleepingMinutes) {
      if (count > mostFreqMinCount) {
        mostFreqMinCount = count;
        mostFreqMin = minute;
        mostFreqGuardId = guardId;
      }
    }
  }

  return mostFreqGuardId * mostFreqMin;
};

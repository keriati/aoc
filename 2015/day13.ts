import { createPermutations } from "../util/utils";

const getPeopleMap = (lines) => {
  const people = {};

  for (const line of lines) {
    const [, a, sign, amount, b] = line.match(
      /(\w+) would (lose|gain) (\d+) happiness units by sitting next to (\w+)./
    );
    people[a] = people[a] || {};
    people[a][b] = sign === "lose" ? -1 * Number(amount) : Number(amount);
  }
  return people;
};

const getHappinessScores = (sittingPlans: string[][], peopleMap: {}) => {
  const happiness = [];
  for (const sittingPlan of sittingPlans) {
    let score = 0;
    for (let i = 0; i < sittingPlan.length; i++) {
      const indexLeft = i === 0 ? sittingPlan.length - 1 : i - 1;
      const indexRight = i === sittingPlan.length - 1 ? 0 : i + 1;

      const personLeft = sittingPlan[indexLeft];
      const personRight = sittingPlan[indexRight];

      score +=
        peopleMap[sittingPlan[i]][personLeft] +
        peopleMap[sittingPlan[i]][personRight];
    }
    happiness.push(score);
  }
  return happiness;
};

export const getMaxHappiness = (input) => {
  const lines = input.split("\n");

  const peopleMap = getPeopleMap(lines);
  const sittingPlans = createPermutations(Object.keys(peopleMap));
  const hapinessScores = getHappinessScores(sittingPlans, peopleMap);

  return hapinessScores.reduce((max, score) => (score > max ? score : max), 0);
};

const addMeToPeopleMap = (
  peopleMap: Record<string, Record<string, number>>
) => {
  peopleMap.me = {};

  for (const person in peopleMap) {
    if (person === "me") continue;
    peopleMap[person].me = 0;
    peopleMap.me[person] = 0;
  }

  return peopleMap;
};

export const getMaxHappinessWithMe = (input) => {
  const lines = input.split("\n");

  const peopleMap = getPeopleMap(lines);

  addMeToPeopleMap(peopleMap);

  const sittingPlans = createPermutations(Object.keys(peopleMap));
  const happinessScores = getHappinessScores(sittingPlans, peopleMap);

  return happinessScores.reduce((max, score) => (score > max ? score : max), 0);
};

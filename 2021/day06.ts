const getSchool = (input: string): Map<number, number> => {
  const mySchool = new Map<number, number>();
  mySchool.set(-1, 0);
  mySchool.set(0, 0);
  mySchool.set(1, 0);
  mySchool.set(2, 0);
  mySchool.set(3, 0);
  mySchool.set(4, 0);
  mySchool.set(5, 0);
  mySchool.set(6, 0);
  mySchool.set(7, 0);
  mySchool.set(8, 0);

  return input.split(",").reduce((school, fish) => {
    const myFish = Number.parseInt(fish, 10);

    school.set(myFish, school.get(myFish) + 1);

    return school;
  }, mySchool);
};

export const getResult = (input, days) => {
  const mySchool = getSchool(input);

  for (let i = 0; i < days; i += 1) {
    mySchool.forEach((count, day) => {
      if (day === -1) {
        return;
      }

      mySchool.set(day - 1, count);
    });

    mySchool.set(8, mySchool.get(-1));
    mySchool.set(6, mySchool.get(6) + mySchool.get(-1));
    mySchool.set(-1, 0);
  }

  return Array.from(mySchool).reduce(
    (sum, [, fishCount]) => sum + fishCount,
    0
  );
};

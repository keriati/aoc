export function getElvWithMostCalories(input: string) {
  const inputArray = input.split("\n");
  const reduced = inputArray.reduce(
    (previousValue, currentValue) => {
      if (currentValue === "" || currentValue === " ") {
        return {
          currentCalories: 0,
          currentElv: previousValue.currentElv + 1,
          mostCalories: previousValue.mostCalories,
          elvNumber: previousValue.elvNumber,
        };
      }

      const currentCalories =
        Number.parseInt(currentValue, 10) + previousValue.currentCalories;

      const isMost = previousValue.mostCalories < currentCalories;

      const result = {
        currentCalories,
        currentElv: previousValue.currentElv,
        mostCalories: isMost ? currentCalories : previousValue.mostCalories,
        elvNumber: isMost ? previousValue.currentElv : previousValue.elvNumber,
      };
      return result;
    },
    { currentCalories: 0, currentElv: 1, mostCalories: 0, elvNumber: 0 }
  );

  console.log(reduced);
  return reduced.elvNumber;
}

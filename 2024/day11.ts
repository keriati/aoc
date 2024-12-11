export const getStoneCount = (input: string, blinks: number) => {
  let stones = input.split(" ").map(Number);
  let stoneCount = new Map<number, number>();
  const cache = new Map<number, [number, number]>();
  let biggestStone = 0;
  for (const stone of stones) {
    stoneCount.set(stone, 1);
  }

  for (let i = 0; i < blinks; i++) {
    const newStoneCount = new Map<number, number>();

    for (const [stone, occurrence] of stoneCount) {
      // 0 becomes 1
      if (stone === 0) {
        newStoneCount.set(1, (newStoneCount.get(1) || 0) + occurrence);
        continue;
      }

      // if the stone has been calculated before, use the result
      if (cache.has(stone)) {
        const newStone1 = cache.get(stone)[0];
        const newStone2 = cache.get(stone)[1];
        if (newStone1 > biggestStone) biggestStone = newStone1;
        if (newStone2 > biggestStone) biggestStone = newStone2;

        if (newStone1 > -1) {
          newStoneCount.set(
            newStone1,
            (newStoneCount.get(newStone1) || 0) + occurrence
          );
        }

        if (newStone2 > -1) {
          newStoneCount.set(
            newStone2,
            (newStoneCount.get(newStone2) || 0) + occurrence
          );
        }

        continue;
      }

      // if the stone has an even number of digits, split it in half
      const stoneString = stone.toString();
      if (stoneString.length % 2 === 0) {
        const stone1 = stoneString.slice(0, stoneString.length / 2);
        const stone2 = stoneString.slice(stoneString.length / 2);

        newStoneCount.set(
          Number(stone1),
          (newStoneCount.get(Number(stone1)) || 0) + occurrence
        );
        newStoneCount.set(
          Number(stone2),
          (newStoneCount.get(Number(stone2)) || 0) + occurrence
        );

        cache.set(stone, [Number(stone1), Number(stone2)]);

        continue;
      }

      // else multiply by 2024
      const newStone = stone * 2024;
      newStoneCount.set(
        newStone,
        (newStoneCount.get(newStone) || 0) + occurrence
      );

      cache.set(stone, [newStone, -1]);
    }

    stoneCount = newStoneCount;
  }

  // count the number of stones
  let result = 0;

  for (const [, occurrence] of stoneCount) {
    result += occurrence;
  }

  console.log(biggestStone);

  return result;
};

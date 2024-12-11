export const getStoneCount = (input: string, blinks: number) => {
  let stones = input.split(" ").map(Number);
  let stoneCount = new Map<number, number>();
  const cache = new Map<number, number[]>();

  for (const stone of stones) {
    stoneCount.set(stone, 1);
  }

  for (let i = 0; i < blinks; i++) {
    const newStones = new Map<number, number>();

    for (const [stone, occurrence] of stoneCount) {
      if (stone === 0) {
        newStones.set(1, (newStones.get(1) || 0) + occurrence);
        continue;
      }

      if (cache.has(stone)) {
        for (const newStone of cache.get(stone)) {
          newStones.set(newStone, (newStones.get(newStone) || 0) + occurrence);
        }
        continue;
      }

      const stoneString = stone.toString();
      if (stoneString.length % 2 === 0) {
        const stone1 = stoneString.slice(0, stoneString.length / 2);
        const stone2 = stoneString.slice(stoneString.length / 2);

        newStones.set(
          Number(stone1),
          (newStones.get(Number(stone1)) || 0) + occurrence
        );
        newStones.set(
          Number(stone2),
          (newStones.get(Number(stone2)) || 0) + occurrence
        );

        cache.set(stone, [Number(stone1), Number(stone2)]);

        continue;
      }

      newStones.set(
        stone * 2024,
        (newStones.get(stone * 2024) || 0) + occurrence
      );

      cache.set(stone, [stone * 2024]);
    }

    stoneCount = newStones;
  }

  let result = 0;

  for (const [, occurrence] of stoneCount) {
    result += occurrence;
  }

  return result;
};

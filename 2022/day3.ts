const ITEMS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const getPriority = (item) => ITEMS.indexOf(item) + 1;

export const getPriorities = (input: string) => {
  const inputArray = input.split("\n");

  return inputArray.reduce((previous, rucksack) => {
    const itemArray = rucksack.split("");
    const { length } = itemArray;
    const halfLength = length / 2;

    const pocket1 = new Set(itemArray.slice(0, halfLength));
    const pocket2 = new Set(itemArray.slice(halfLength));

    pocket1.forEach((item) => {
      if (pocket2.has(item)) {
        previous += getPriority(item);
      }
    });

    return previous;
  }, 0);
};

export const getGroupPriorities = (input: string) => {
  const inputArray = input.split("\n");
  const badgeItems = [];

  for (let i = 0; i <= inputArray.length; i += 3) {
    const elf1Items = new Set(inputArray[i]);
    const elf2Items = new Set(inputArray[i + 1]);
    const elf3Items = new Set(inputArray[i + 2]);

    elf1Items.forEach((item) => {
      if (elf2Items.has(item) && elf3Items.has(item)) {
        badgeItems.push(item);
      }
    });
  }

  return badgeItems.reduce((sum, item) => sum + getPriority(item), 0);
};

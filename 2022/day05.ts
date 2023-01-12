export const getTopCrates = (commandList, stackList) => {
  const stacks = stackList.map((stack) => stack.split(""));
  const commands = commandList.split("\n");

  commands.forEach((command) => {
    const [a, nr, b, from, c, to] = command.split(" ");

    for (let i = 0; i < nr; i += 1) {
      stacks[Number.parseInt(to, 10) - 1].push(
        stacks[Number.parseInt(from, 10) - 1].pop()
      );
    }
  });

  return stacks.reduce((prev, item) => prev + item[item.length - 1], "");
};

export const getTopCratesCM9001 = (commandList, stackList) => {
  const stacks = stackList.map((stack) => stack.split(""));
  const commands = commandList.split("\n");

  commands.forEach((command) => {
    const [a, nr, b, from, c, to] = command.split(" ");

    const tempStack = [];
    for (let i = 0; i < nr; i += 1) {
      tempStack.unshift(stacks[Number.parseInt(from, 10) - 1].pop());
    }
    stacks[Number.parseInt(to, 10) - 1].push(...tempStack);
  });

  return stacks.reduce((prev, item) => prev + item[item.length - 1], "");
};

const isCD = (command) => command.startsWith("$ cd");
const isFile = (command) => /^[0-9]+$/.test(command.split(" ")[0]);

const getDirSizes = (commands: string[]) =>
  commands.reduce(
    (state, command) => {
      const { dir, sizes } = state;

      if (isCD(command)) {
        const [a, b, myDir] = command.split(" ");
        if (myDir === "..") {
          dir.pop();
        } else {
          dir.push(myDir);
        }
      }

      if (isFile(command)) {
        const size = Number.parseInt(command.split(" ")[0], 10);

        let path = "";
        dir.forEach((dirPart) => {
          path += dirPart;
          sizes[path] = path in sizes ? sizes[path] + size : size;
        });
      }

      return {
        dir,
        sizes,
      };
    },
    { dir: [], sizes: {} }
  );

export const getTotalSize = (input: string) => {
  const commands = input.split("\n");

  const { sizes } = getDirSizes(commands);

  let result = 0;

  Object.keys(sizes).forEach((dir) => {
    if (sizes[dir] <= 100000) {
      result += sizes[dir];
    }
  });

  return result;
};

export const getSmallestDirToDelete = (input: string) => {
  const commands = input.split("\n");

  const { sizes } = getDirSizes(commands);

  const totalSpace = 70000000;
  const requiredSpace = 30000000;
  const totalUsed = sizes["/"];
  const totalUnused = totalSpace - totalUsed;
  const toFreeSpace = requiredSpace - totalUnused;

  let result: number = totalSpace;

  Object.values(sizes).forEach((size: number) => {
    if (size > toFreeSpace && size < result) {
      result = size;
    }
  });

  return result;
};

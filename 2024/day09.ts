export const getChecksum = (input: string) => {
  const disk = input.split("").map(Number);

  let result = 0;
  let lastFilePointer = disk.length - 1;
  let position = 0;

  for (let i = 0; i < disk.length; i++) {
    // add existing file
    if (i % 2 === 0) {
      const fileId = i / 2;
      for (let j = i; j < i + disk[i]; j++) {
        if (disk[i] === 0) {
          break;
        }
        result += position * fileId;
        position++;
      }

      continue;
    }

    // fill space and add
    while (disk[i] > 0) {
      let lastFileSize = disk[lastFilePointer];
      if (lastFileSize === 0) {
        lastFilePointer -= 2;
        continue;
      }

      if (i > lastFilePointer) {
        break;
      }

      const lastFileId = Math.floor(lastFilePointer / 2);

      result += position * lastFileId;

      disk[lastFilePointer] -= 1;
      disk[i]--;
      position++;
    }
  }

  return result;
};

export const getCheckSumWholeFiles = (input: string) => {
  const disk: { fileId: number; count: number }[] = input
    .split("")
    .map(Number)
    .map((x, i) =>
      i % 2 === 0 ? { fileId: i / 2, count: x } : { fileId: null, count: x }
    );

  let diskDefrag: { fileId: number; count: number }[] = [];

  for (let position = 0; position < disk.length; position++) {
    let entry = disk[position];

    if (entry.fileId === null) {
      // space
      let lastFilePosition = disk.length - 1;

      while (entry.count > 0 && lastFilePosition > position) {
        if (disk[lastFilePosition].fileId === null) {
          lastFilePosition--;
          continue;
        }

        if (disk[lastFilePosition].count <= entry.count) {
          diskDefrag.push({ ...disk[lastFilePosition] });

          entry.count -= disk[lastFilePosition].count;

          disk[lastFilePosition].fileId = null;

          lastFilePosition = disk.length - 1;
        }

        lastFilePosition--;
      }

      if (entry.count !== 0) diskDefrag.push(entry);
    } else {
      // file
      diskDefrag.push({ ...entry });
    }
  }

  return diskDefrag.reduce(
    ([sum, position], current) => {
      if (current.fileId !== null) {
        for (let j = 0; j < current.count; j++) {
          sum += current.fileId * position;
          position++;
        }
      } else {
        position += current.count;
      }

      return [sum, position];
    },
    [0, 0]
  )[0];
};

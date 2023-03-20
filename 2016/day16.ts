export const generateData = (a: boolean[]): boolean[] => {
  const b = a.slice();
  b.reverse();

  for (let i = 0; i < b.length; i++) {
    b[i] = !b[i];
  }

  return [].concat.apply([], [a, [0], b]);
};

export const getDragonChecksum = (input: string, diskSize: number): string => {
  const data = input.split("").map((n) => n === "1");
  let diskData = data;

  while (diskData.length < diskSize) {
    diskData = generateData(diskData);
  }

  diskData.splice(diskSize);

  let checkSum = diskData;

  while (checkSum.length % 2 === 0) {
    const newCheckSum = [];
    for (let i = 0; i < checkSum.length - 1; i += 2) {
      newCheckSum.push(checkSum[i] === checkSum[i + 1]);
    }
    checkSum = newCheckSum;
  }

  return checkSum.map((d) => (d ? "1" : 0)).join("");
};

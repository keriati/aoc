export const getResult = (input: string) => {
  const scannersRaw = input.split("\n\n").map((s) => s.split("\n"));

  const scanners = new Map<number, [number, number, number][]>();

  for (const scannerRaw of scannersRaw) {
    const scannerId = Number(scannerRaw.shift().match(/(\d+)/)[1]);
    const bacons = [];
    for (const baconRaw of scannerRaw) {
      const bacon = baconRaw.split(",").map(Number);
      bacons.push(bacon);
    }
    scanners.set(scannerId, bacons);
  }
  console.table([...scanners].flat());

  return scanners;
};

export const getResultPart2 = (input: string) => {
  const lines = input.split("\n");

  return lines;
};

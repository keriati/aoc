export const getBox = (lens: string) =>
  lens
    .split("")
    .map((s) => s.charCodeAt(0))
    .reduce((sum, cc) => ((sum + cc) * 17) % 256, 0);

export const getHashSum = (input: string) =>
  input
    .split(",")
    .map(getBox)
    .reduce((sum, step) => sum + step, 0);

export const getFocusPower = (input: string) =>
  input
    .split(",")
    .map((step) => step.split(/[-=]/))
    .map(([label, fl]): [string, number, number] => [
      label,
      Number(fl),
      getBox(label),
    ])
    .reduce(
      (boxes: Map<string, number>[], [label, fl, boxNumber]) => {
        let box = boxes[boxNumber];

        if (!fl) {
          box.delete(label);
          return boxes;
        }

        box.set(label, Number(fl));
        return boxes;
      },
      Array(256)
        .fill(null)
        .map(() => new Map<string, number>())
    )
    .reduce((sum, box, boxNumber) => {
      let i = 1;

      for (const [, fl] of box) {
        sum += (boxNumber + 1) * i * fl;
        i++;
      }

      return sum;
    }, 0);

const createImageMap = (
  input: string,
  w: number,
  h: number
): Map<number, string[]> => {
  const display = new Map<number, string[]>();

  input.split("").forEach((n, i) => {
    const layerNumber = Math.floor(i / (w * h));
    if (!display.has(layerNumber)) display.set(layerNumber, []);

    display.get(layerNumber).push(n);
  });

  return display;
};

export const checkImage = (input: string, w: number, h: number) => {
  const imageMap = createImageMap(input, w, h);

  return Array.from(imageMap.values())
    .reduce(
      ({ zeroCount, layer }, l) => {
        const currentZeroCount = l.reduce((s, n) => (n === "0" ? s + 1 : s), 0);
        return currentZeroCount < zeroCount
          ? { zeroCount: currentZeroCount, layer: l }
          : { zeroCount, layer };
      },
      {
        zeroCount: Number.MAX_SAFE_INTEGER,
        layer: [],
      }
    )
    .layer.reduce(
      ([ones, twos]: [number, number], n) =>
        n === "1"
          ? [ones + 1, twos]
          : n === "2"
          ? [ones, twos + 1]
          : [ones, twos],
      [0, 0]
    )
    .reduce((s, n) => n * s, 1);
};

export const drawImage = (input: string, w: number, h: number) => {
  const imageMap = createImageMap(input, w, h);
  const image = [];

  for (let i = 0; i < w * h; i++) {
    let layer = 0;
    let pixel = imageMap.get(layer)[i];

    while (pixel === "2") {
      layer++;
      pixel = imageMap.get(layer)[i];
    }

    image.push(pixel);
  }

  return image
    .reduce(
      (res, val, i) => {
        if ((i + 1) % w === 0) res.push("\n");
        res.push(val === "1" ? "#" : " ");
        return res;
      },
      ["\n "]
    )
    .join("");
};

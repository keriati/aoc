class Pixel {
  constructor(
    public x: number,
    public y: number,
    public readonly vx: number,
    public readonly vy: number
  ) {}

  tick() {
    this.x += this.vx;
    this.y += this.vy;
  }
}

const getArea = (pixels: Pixel[]): [number, number, number, number] =>
  pixels.reduce(
    ([minX, minY, maxX, maxY], pixel) => {
      const newMinX = pixel.x < minX ? pixel.x : minX;
      const newMinY = pixel.y < minY ? pixel.y : minY;
      const newMaxX = pixel.x > maxX ? pixel.x : maxX;
      const newMaxY = pixel.y > maxY ? pixel.y : maxY;

      return [newMinX, newMinY, newMaxX, newMaxY];
    },
    [Infinity, Infinity, -Infinity, -Infinity]
  );

const getPixelMap = (pixels: Pixel[]): Set<string> => {
  const pixelMap = new Set<string>();

  pixels.forEach((pixel) => {
    pixelMap.add(`${pixel.y},${pixel.x}`);
  });

  return pixelMap;
};

const display = (
  [minX, minY, maxX, maxY]: [number, number, number, number],
  pixelMap
): string => {
  let display = "";

  for (let y = minY; y <= maxY; y++) {
    display += "\n";
    for (let x = minX; x <= maxX; x++) {
      if (pixelMap.has(`${y},${x}`)) {
        display += "#";
      } else {
        display += " ";
      }
    }
  }

  return display;
};

export const getResult = (input): [string, number] => {
  const pixels = input.split("\n").map((line) => {
    const [, xS, yS, vxS, vyS] = line.match(
      /position=<([ \-\d]+),([ \-\d]+)> velocity=<([ \-\d]+),([ \-\d]+)>/
    );

    return new Pixel(Number(xS), Number(yS), Number(vxS), Number(vyS));
  });

  let minArea = Infinity;
  let areaPoints: [number, number, number, number];
  let pixelMap: Set<string>;
  let minSeconds = 0;

  for (let i = 0; i < 12000; i++) {
    const [minX, minY, maxX, maxY] = getArea(pixels);

    const top = maxX - minX;
    const left = maxY - minY;
    const area = top * left;

    if (area < minArea) {
      minArea = area;
      areaPoints = [minX, minY, maxX, maxY];
      pixelMap = getPixelMap(pixels);
      minSeconds = i;
    }
    pixels.forEach((pixel) => pixel.tick());
  }

  const myDisplay = display(areaPoints, pixelMap);

  return [myDisplay, minSeconds];
};

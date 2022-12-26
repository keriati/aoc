export const getSquareFeet = (input) => {
  const boxes = input.split("\n");

  return boxes.reduce((sqrfeet, box) => {
    const [X, sl, sw, sh] = box.match(/^(\d+)x(\d+)x(\d+)$/);

    const l = Number.parseInt(sl, 10);
    const w = Number.parseInt(sw, 10);
    const h = Number.parseInt(sh, 10);

    const s1 = l * w;
    const s2 = w * h;
    const s3 = h * l;

    const boxSize = 2 * s1 + 2 * s2 + 2 * s3;

    return sqrfeet + boxSize + Math.min(s1, s2, s3);
  }, 0);
};

export const getLength = (input) => {
  const boxes = input.split("\n");

  return boxes.reduce((length, box) => {
    const [X, sl, sw, sh] = box.match(/^(\d+)x(\d+)x(\d+)$/);

    const l = Number.parseInt(sl, 10);
    const w = Number.parseInt(sw, 10);
    const h = Number.parseInt(sh, 10);

    const bow = l * w * h;

    const [a, b] = [l, w, h].sort((n1, n2) => n1 - n2);
    const ribbon = a + a + b + b;

    return length + ribbon + bow;
  }, 0);
};

const rotate = (arr, n) => {
  if (n < 0) {
    for (let i = 0; i < Math.abs(n); i++) {
      arr.unshift(arr.pop());
    }
  }
  for (let i = 0; i < n; i++) {
    arr.push(arr.shift());
  }
};

export const getKnotResult = (maxValue: number, lengths: number[]) => {
  const values = Array(maxValue)
    .fill(null)
    .map((a, i) => i);

  let rotates = 0;
  let skipSize = 0;

  for (const length of lengths) {
    const sub = values.slice(0, length).reverse();
    values.splice(0, length, ...sub);

    rotates += length + skipSize;
    rotate(values, length + skipSize);
    skipSize++;
  }

  rotate(values, -1 * (rotates % values.length));

  return values[0] * values[1];
};

export const getKnotHash = (input: string) => {
  const values = Array(256)
    .fill(null)
    .map((a, i) => i);
  const lengths = input.split("").map((n) => n.charCodeAt(0));
  lengths.push(17, 31, 73, 47, 23);

  let rotates = 0;
  let skipSize = 0;

  for (let i = 0; i < 64; i++) {
    for (const length of lengths) {
      const sub = values.slice(0, length).reverse();
      values.splice(0, length, ...sub);

      rotates += length + skipSize;
      rotate(values, length + skipSize);
      skipSize++;
    }
  }

  rotate(values, -1 * (rotates % values.length));

  const denseHash: number[] = [];
  let block = values[0];

  for (let i = 0; i < 256; i++) {
    if ((i + 1) % 16 === 0) {
      denseHash.push(block);
      block = values[i + 1];
    } else {
      block ^= values[i + 1];
    }
  }

  return denseHash.reduce(
    (sum: string, n: number) => sum + n.toString(16).padStart(2, "0"),
    ""
  );
};

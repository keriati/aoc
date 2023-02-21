export const getDecompressedLength = (input: string) => {
  let chars = input;

  let markerStart = 0;

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === "(") {
      markerStart = i;
    }

    if (chars[i] === ")") {
      const marker = chars.substring(markerStart + 1, i);
      const [length, multiplier] = marker.split("x");

      const decompressed = chars
        .substring(i + 1, i + 1 + Number(length))
        .repeat(Number(multiplier));

      const newChars = `${chars.substring(
        0,
        markerStart
      )}${decompressed}${chars.substring(i + 1 + Number(length))}`;

      i += decompressed.length - marker.length - 2;

      chars = newChars;
    }
  }

  return chars.length;
};

const getLength = (chars: string): number => {
  if (chars.indexOf("(") < 0) return chars.length;

  const markerStart = chars.indexOf("(");
  const markerEnd = chars.indexOf(")");
  const marker = chars.substring(markerStart + 1, markerEnd);

  const [length, multiplier] = marker.split("x");

  const beginning = chars.substring(0, markerStart);
  const middle = chars.substring(markerEnd + 1, markerEnd + Number(length) + 1);
  const ending = chars.substring(markerEnd + 1 + Number(length));

  const middleLength = getLength(middle);
  const endingLength = getLength(ending);

  return beginning.length + endingLength + Number(multiplier) * middleLength;
};

export const getDecompressedLengthV2 = (input: string) => getLength(input);

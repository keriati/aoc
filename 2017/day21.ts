import { rotateClockwise } from "../util/matrix";

export const IMAGE_START = `.#.
..#
###`;

export const split = (image: string): string[] => {
  const imageSplit = image.split("\n");
  const { length } = imageSplit;
  const size = length % 2 === 0 ? 2 : 3;

  const imageParts = [];

  for (let y = 0; y < length; y += size) {
    for (let x = 0; x < length; x += size) {
      const imagePart = [];
      imagePart.push(imageSplit[y].substring(x, x + size));
      imagePart.push(imageSplit[y + 1].substring(x, x + size));
      if (size === 3) imagePart.push(imageSplit[y + 2].substring(x, x + size));
      imageParts.push(imagePart.join("\n"));
    }
  }

  return imageParts;
};

const flipHorizontal = (image: string) =>
  image
    .split("\n")
    .map((line) => line.split("").reverse().join(""))
    .join("\n");

const flipVertical = (image: string) => image.split("\n").reverse().join("\n");

export const rotate = (image: string) =>
  rotateClockwise(image.split("\n").map((line) => line.split("")))
    .map((line) => line.join(""))
    .join("\n");

export const getVariations = (image: string) => [
  image,
  flipHorizontal(image),
  flipVertical(image),
  flipHorizontal(flipVertical(image)),

  rotate(image),
  flipHorizontal(rotate(image)),
  flipVertical(rotate(image)),
  flipHorizontal(flipVertical(rotate(image))),
];

const getReplacement = (
  imagePart: string,
  rules: Map<string, string>
): string =>
  getVariations(imagePart)
    .map((r) => rules.get(r))
    .filter((replacement) => replacement)[0];

export const merge = (imageParts: string[]) => {
  if (imageParts.length === 1) return imageParts[0];

  const image = [];

  const columns = Math.sqrt(imageParts.length);
  const rows = imageParts[0].split("\n").length;
  let imageRows = 0;

  for (let j = 0; j < imageParts.length; j += columns) {
    for (let i = j; i < j + columns; i++) {
      const imagePart = imageParts[i].split("\n");

      for (let k = 0; k < rows; k++) {
        if (!image[k + imageRows]) image[k + imageRows] = "";
        image[k + imageRows] += imagePart[k];
      }
    }
    imageRows += rows;
  }

  return image.join("\n");
};

const enhance = (pattern: string, rules: Map<string, string>): string => {
  const imageParts = split(pattern);

  const newImageParts = imageParts.map((image) => getReplacement(image, rules));

  return merge(newImageParts);
};

const parseRules = (input: string) =>
  input
    .split("\n")
    .map((l) => l.split(" => "))
    .map(([from, to]) => [from.replaceAll("/", "\n"), to.replaceAll("/", "\n")])
    .reduce(
      (acc, [from, to]) => new Map([...acc, [from, to]]),
      new Map<string, string>()
    );

export const getEnhancedImage = (input: string, iterations = 5) => {
  const rules = parseRules(input);

  let image = IMAGE_START;

  for (let i = 0; i < iterations; i++) {
    image = enhance(image, rules);
  }

  return image.split("").filter((c) => c === "#").length;
};

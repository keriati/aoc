const expandImage = (image: string[][], defChar) => {
  const newImage = image.map((l) => [defChar, ...l, defChar]);

  const extraLine = new Array(newImage[0].length).fill(defChar);

  return [[...extraLine], ...newImage, [...extraLine]];
};

function enhanceImage(imageRaw: string[][], enhancement: string[], defChar) {
  const image = expandImage(imageRaw, defChar);

  const newImage = new Array(image.length);

  for (let i = 0; i < newImage.length; i++) {
    newImage[i] = new Array(image[i].length).fill(defChar);
  }

  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image[y].length; x++) {
      const pixels = [];

      pixels.push(image?.[y - 1]?.[x - 1] ?? defChar);
      pixels.push(image?.[y - 1]?.[x] ?? defChar);
      pixels.push(image?.[y - 1]?.[x + 1] ?? defChar);

      pixels.push(image?.[y]?.[x - 1] ?? defChar);
      pixels.push(image?.[y]?.[x] ?? defChar);
      pixels.push(image?.[y]?.[x + 1] ?? defChar);

      pixels.push(image?.[y + 1]?.[x - 1] ?? defChar);
      pixels.push(image?.[y + 1]?.[x] ?? defChar);
      pixels.push(image?.[y + 1]?.[x + 1] ?? defChar);

      const key = parseInt(
        pixels.map((p) => (p === "#" ? "1" : "0")).join(""),
        2
      );

      newImage[y][x] = enhancement[key];
    }
  }

  return newImage;
}

export const getLitPixels = (input: string) => {
  const [enhancementRaw, imageRaw] = input.split("\n\n");

  const enhancement = enhancementRaw.split("");

  const image = imageRaw.split("\n").map((line) => line.split(""));

  let defChar = ".";

  const enhancedImage = enhanceImage(image, enhancement, defChar);

  if (enhancement[0] === "#") {
    defChar = "#";
  }
  const enhancedImage2 = enhanceImage(enhancedImage, enhancement, defChar);

  return enhancedImage2.flatMap((l) => l).filter((p) => p === "#").length;
};

export const getLitPixels50 = (input: string) => {
  const [enhancementRaw, imageRaw] = input.split("\n\n");

  const enhancement = enhancementRaw.split("");

  const image = imageRaw.split("\n").map((line) => line.split(""));

  let newImage = image;
  let defChar = ".";

  for (let i = 0; i < 50; i++) {
    newImage = enhanceImage(newImage, enhancement, defChar);
    if (enhancement[0] === "#") {
      defChar = defChar === "." ? "#" : ".";
    }
  }

  return newImage.flatMap((l) => l).filter((p) => p === "#").length;
};

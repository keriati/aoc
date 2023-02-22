const getMetaData = (license: number[], index): [number, number] => {
  const children = license[index];
  const metaLength = license[index + 1];

  if (children === 0) {
    let metaData = 0;

    for (let i = index + 2; i < index + 2 + metaLength; i++) {
      metaData += license[i];
    }

    return [metaData, index + 2 + metaLength];
  }

  let newIndex = index + 2;
  let metaDataSum = 0;

  for (let i = 0; i < children; i++) {
    let metaData = 0;
    [metaData, newIndex] = getMetaData(license, newIndex);
    metaDataSum += metaData;
  }

  for (let i = 0; i < metaLength; i++) {
    metaDataSum += license[newIndex + i];
  }

  return [metaDataSum, newIndex + metaLength];
};

export const getResult = (input) => {
  const license = input.split(" ").map((n) => Number(n));

  return getMetaData(license, 0)[0];
};

const getMetaValue = (license: number[], index): [number, number] => {
  const children = license[index];
  const metaLength = license[index + 1];

  if (children === 0) {
    let metaData = 0;

    for (let i = index + 2; i < index + 2 + metaLength; i++) {
      metaData += license[i];
    }

    return [metaData, index + 2 + metaLength];
  }

  let newIndex = index + 2;
  const childrenValues = [];

  for (let i = 0; i < children; i++) {
    let metaData = 0;
    [metaData, newIndex] = getMetaValue(license, newIndex);
    childrenValues.push(metaData);
  }

  let metaDataSum = 0;

  for (let i = 0; i < metaLength; i++) {
    const metaChildIndex = license[newIndex + i];
    if (typeof childrenValues[metaChildIndex - 1] !== "undefined") {
      metaDataSum += childrenValues[metaChildIndex - 1];
    }
  }

  return [metaDataSum, newIndex + metaLength];
};

export const getResult2 = (input) => {
  const license = input.split(" ").map((n) => Number(n));

  return getMetaValue(license, 0)[0];
};

const compare = (left, right) => {
  if (!left && left !== 0) return 1;

  if (!right && right !== 0) return -1;

  if (Array.isArray(left) || Array.isArray(right)) {
    const leftArr = Array.isArray(left) ? left : [left];
    const rightArr = Array.isArray(right) ? right : [right];

    const maxLen = Math.max(leftArr.length, rightArr.length);

    for (let i = 0; i < maxLen; i += 1) {
      const order = compare(leftArr[i], rightArr[i]);
      if (order !== 0) return order;
    }

    return 0;
  }

  if (left === right) return 0;

  return left < right ? 1 : -1;
};

export const getSumOfIndices = (input) => {
  const pairs = input
    .split("\n\n")
    .map((pair) => pair.split("\n"))
    .map((pair) => [JSON.parse(pair[0]), JSON.parse(pair[1])]);

  let pairsInRightOrder = 0;

  pairs.forEach(([left, right], i) => {
    const order = compare(left, right);
    if (order !== -1) {
      console.log(i);
      pairsInRightOrder += i + 1;
    }
  });

  return pairsInRightOrder;
};

export const getDecoderKey = (input) => {
  const divider1 = [[2]];
  const divider2 = [[6]];

  const packets = input
    .split("\n")
    .filter((p) => p !== "")
    .map((p) => JSON.parse(p));

  packets.push(divider1, divider2);

  packets.sort((a, b) => compare(b, a));

  const packetsString = packets.map((p) => p.toString());

  const divierd1index = packetsString.indexOf(divider1.toString()) + 1;
  const divierd2index = packetsString.indexOf(divider2.toString()) + 1;

  return divierd1index * divierd2index;
};

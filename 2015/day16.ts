const SCAN_RESULT = `children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`;

const parseScanResults = () =>
  SCAN_RESULT.split("\n").reduce((s, l) => {
    const [item, amount] = l.split(": ");

    s[item] = Number(amount);
    return s;
  }, {});

const parseAunts = (input) =>
  input.split("\n").reduce((r, l) => {
    const [
      ,
      auntNum,
      item1,
      item1Amount,
      item2,
      item2Amount,
      item3,
      item3Amount,
    ] = l.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);

    r.push({
      id: Number(auntNum),
      items: [
        {
          name: item1,
          amount: Number(item1Amount),
        },
        {
          name: item2,
          amount: Number(item2Amount),
        },
        {
          name: item3,
          amount: Number(item3Amount),
        },
      ],
    });
    return r;
  }, []);

export const getAuntNumber = (input) => {
  const scanResult = parseScanResults();

  const aunts = parseAunts(input);

  for (const aunt of aunts) {
    let score = 0;
    for (const { name, amount } of aunt.items) {
      if (scanResult[name] === amount) {
        score++;
      }
    }
    if (score === 3) {
      return aunt.id;
    }
  }

  return [aunts, scanResult];
};

export const getAuntNumberPart2 = (input) => {
  const scanResult = parseScanResults();

  const aunts = parseAunts(input);

  for (const aunt of aunts) {
    let score = 0;
    for (const { name, amount } of aunt.items) {
      switch (name) {
        case "cats":
        case "trees":
          if (scanResult[name] < amount) score++;
          break;
        case "goldfish":
        case "pomeranians":
          if (scanResult[name] > amount) score++;
          break;
        default:
          if (scanResult[name] === amount) score++;
      }
    }
    if (score === 3) {
      return aunt.id;
    }
  }

  return 0;
};

const parseCards = (input: string): Record<string, [number[], number[]]> =>
  input.split("\n").reduce((cards, line) => {
    const [, cardId, winNumRaw, numRaw] = line.match(
      /(\d+): ([\d ]+) \| ([\d ]+)/
    );

    const winningNumbers = winNumRaw.split(/ +/).map(Number);
    const myNumbers = numRaw.split(/ +/).map(Number);

    cards[cardId] = [winningNumbers, myNumbers];
    return cards;
  }, {});

export const getCardPoints = (input: string) => {
  let score = 0;
  const cards = parseCards(input);

  for (const cardId in cards) {
    const [winningNumbers, myNumbers] = cards[cardId];

    const myWinningNumbers = myNumbers.filter((n) =>
      winningNumbers.includes(n)
    );

    if (myWinningNumbers.length > 0) {
      score += 2 ** (myWinningNumbers.length - 1);
    }
  }

  return score;
};

export const getCardCount = (input: string) => {
  const cards = parseCards(input);
  const myCards = {};

  for (const cardId in cards) {
    myCards[cardId] = 1;
  }

  for (const cardId in cards) {
    const myWinningNumbers = cards[cardId][1].filter((n) =>
      cards[cardId][0].includes(n)
    );

    for (
      let i = Number(cardId) + 1;
      i < Number(cardId) + 1 + myWinningNumbers.length;
      i++
    ) {
      myCards[String(i)] += myCards[cardId];
    }
  }

  return Object.values(myCards).reduce((sum: number, n: number) => sum + n, 0);
};

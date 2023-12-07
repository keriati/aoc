import { createCombinations } from "../util/utils";

type Hand = {
  cards: string;
  strength: number;
  bid: number;
};

const CARD_ORDER = "AKQJT98765432";
const CARD_ORDER_JOKER = "AKQT98765432J";
const CARDS_WITHOUT_JOKER = "AKQT98765432";

const getHandStrength = (hand: string): number => {
  const sorted = hand.split("").sort().join("");

  // five of a kind
  if (sorted[0] === sorted[4]) {
    return 0;
  }

  // four of a kind
  if (sorted[0] === sorted[3] || sorted[1] === sorted[4]) {
    return 1;
  }

  // full house
  if (
    (sorted[0] === sorted[2] && sorted[3] === sorted[4]) ||
    (sorted[0] === sorted[1] && sorted[2] === sorted[4])
  ) {
    return 2;
  }

  // three of a kind
  if (
    sorted[0] === sorted[2] ||
    sorted[1] === sorted[3] ||
    sorted[2] === sorted[4]
  ) {
    return 3;
  }

  // two pair
  if (
    (sorted[0] === sorted[1] && sorted[2] === sorted[3]) ||
    (sorted[0] === sorted[1] && sorted[3] === sorted[4]) ||
    (sorted[1] === sorted[2] && sorted[3] === sorted[4])
  ) {
    return 4;
  }

  // one pair
  if (
    sorted[0] === sorted[1] ||
    sorted[1] === sorted[2] ||
    sorted[2] === sorted[3] ||
    sorted[3] === sorted[4]
  ) {
    return 5;
  }

  // high card
  return 6;
};

const compareHands =
  (order: string) =>
  (a: Hand, b: Hand): number => {
    if (a.strength !== b.strength) {
      return b.strength - a.strength;
    }

    for (let i = 0; i < a.cards.length; i++) {
      if (a.cards[i] !== b.cards[i]) {
        return order.indexOf(b.cards[i]) - order.indexOf(a.cards[i]);
      }
    }

    return 0;
  };

export const getTotalWinnings = (input: string): number => {
  const hands = input
    .split("\n")
    .map((line): Hand => {
      const [cards, bid] = line.split(" ");

      const strength = getHandStrength(cards);

      return {
        cards,
        strength,
        bid: Number(bid),
      };
    })
    .sort(compareHands(CARD_ORDER));

  return hands.reduce((result, hand, i) => result + (i + 1) * hand.bid, 0);
};

export const getTotalWinningsWithJoker = (input: string) => {
  const allJokerCombinations = [];

  for (let i = 1; i < 4; i++) {
    let jokers = [];

    for (let j = 1; j <= i; j++) {
      jokers = [...jokers, ...CARDS_WITHOUT_JOKER];
    }

    const jokerCombinations = createCombinations(jokers, i);
    allJokerCombinations.push(jokerCombinations);
  }

  const hands = input
    .split("\n")
    .map((line): Hand => {
      const [cards, bid] = line.split(" ");

      let strength: number;

      if (!cards.includes("J")) {
        strength = getHandStrength(cards);
      } else if (cards === "JJJJJ" || cards.split("J").length === 5) {
        strength = 0;
      } else {
        let bestStrength = Number.MAX_SAFE_INTEGER;

        const handWithoutJoker = cards.replaceAll("J", "");
        const jokers = cards.length - handWithoutJoker.length;
        const jokerCombinations = allJokerCombinations[jokers - 1];

        for (let i = 0; i < jokerCombinations.length; i++) {
          const handWithJoker =
            handWithoutJoker + jokerCombinations[i].join("");

          const strengthWithJoker = getHandStrength(handWithJoker);

          if (strengthWithJoker < bestStrength) {
            bestStrength = strengthWithJoker;
          }
        }

        strength = bestStrength;
      }

      return {
        cards,
        strength,
        bid: Number(bid),
      };
    })
    .sort(compareHands(CARD_ORDER_JOKER));

  return hands.reduce((result, hand, i) => result + (i + 1) * hand.bid, 0);
};

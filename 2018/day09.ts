import { Deque } from "@blakeembrey/deque";

export const getResult = (players: number, maxPoints: number) => {
  const marbles = new Deque([0]);
  let player = 1;
  const scores = new Map<number, number>();

  for (let i = 1; i <= maxPoints; i++) {
    player++;

    if (player > players - 1) player = 0;

    if (i % 23 === 0) {
      if (!scores.has(player)) scores.set(player, 0);

      marbles.rotate(7);

      scores.set(player, scores.get(player) + i + marbles.pop());

      marbles.rotate(-1);

      continue;
    }

    marbles.rotate(-1);
    marbles.push(i);
  }

  return Array.from(scores.values()).reduce((max, n) => (n > max ? n : max), 0);
};

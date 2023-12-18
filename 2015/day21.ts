import { Deque } from "@blakeembrey/deque";

type Name = string;
type Cost = number;
type Damage = number;
type Armor = number;

export class Boss {
  constructor(
    public hitPoints: number,
    public readonly damage: number,
    public readonly armor: number
  ) {}
}

class Player {
  hitPoints = 100;

  damage: Damage = 0;

  armor: Armor = 0;

  items: Item[] = [];

  cost = 0;

  buy(item: Item) {
    this.items.push(item);
    this.armor += item.armor;
    this.damage += item.damage;
    this.cost += item.cost;
  }
}

class Item {
  constructor(
    public readonly name: Name,
    public readonly cost: Cost,
    public readonly damage: Damage,
    public readonly armor: Armor
  ) {}
}

const Weapons: Item[] = [
  new Item("Dagger", 8, 4, 0),
  new Item("Shortsword", 10, 5, 0),
  new Item("Warhammer", 25, 6, 0),
  new Item("Longsword", 40, 7, 0),
  new Item("Greataxe", 74, 8, 0),
];

const Armors: Item[] = [
  new Item("None", 0, 0, 0),
  new Item("Leather", 13, 0, 1),
  new Item("Chainmail", 31, 0, 2),
  new Item("Splintmail", 53, 0, 3),
  new Item("Bandedmail", 75, 0, 4),
  new Item("Platemail", 102, 0, 5),
];

const Rings: Item[] = [
  new Item("None", 0, 0, 0),
  new Item("None", 0, 0, 0),
  new Item("Damage +1", 25, 1, 0),
  new Item("Damage +2", 50, 2, 0),
  new Item("Damage +3", 100, 3, 0),
  new Item("Defense +1", 20, 0, 1),
  new Item("Defense +2", 40, 0, 2),
  new Item("Defense +3", 80, 0, 3),
];

const fight = (player: Player, boss: Boss) => {
  while (player.hitPoints > 0 && boss.hitPoints > 0) {
    boss.hitPoints -= Math.max(1, player.damage - boss.armor);
    if (boss.hitPoints <= 0) {
      return true;
    }
    player.hitPoints -= Math.max(1, boss.damage - player.armor);
  }
  return false;
};

export const getLeastGold = (
  hitPoints: number,
  damage: Damage,
  armor: Armor
) => {
  const q = new Deque<[number, number, number, number]>();
  q.push([0, 0, 1, 0]);

  let minCost = Number.MAX_SAFE_INTEGER;

  while (q.size > 0) {
    const [w, a, r1, r2] = q.popLeft();

    const player = new Player();

    player.buy(Weapons[w]);
    player.buy(Armors[a]);
    player.buy(Rings[r1]);
    player.buy(Rings[r2]);

    if (player.cost > minCost) continue;

    const boss = new Boss(hitPoints, damage, armor);

    const didWin = fight(player, boss);

    if (didWin) {
      minCost = player.cost;
    }

    [
      [w + 1, a, r1, r2],
      [w, a + 1, r1, r2],
      [w, a, r1 + 1, r2],
      [w, a, r1, r2 + 1],
    ].forEach(([nw, na, nr1, nr2]) => {
      if (
        nw < Weapons.length &&
        na < Armors.length &&
        nr1 < Rings.length &&
        nr2 < Rings.length &&
        nr1 !== nr2
      ) {
        q.push([nw, na, nr1, nr2]);
      }
    });
  }

  return minCost;
};

export const getMostGold = (
  hitPoints: number,
  damage: Damage,
  armor: Armor
) => {
  const q = new Deque<[number, number, number, number]>();
  q.push([
    Weapons.length - 1,
    Armors.length - 1,
    Rings.length - 1,
    Rings.length - 2,
  ]);

  let maxCost = 0;

  while (q.size > 0) {
    const [w, a, r1, r2] = q.popLeft();

    const player = new Player();

    player.buy(Weapons[w]);
    player.buy(Armors[a]);
    player.buy(Rings[r1]);
    player.buy(Rings[r2]);

    if (player.cost < maxCost) continue;

    const boss = new Boss(hitPoints, damage, armor);

    const didWin = fight(player, boss);

    if (!didWin) {
      maxCost = player.cost;
    }

    [
      [w - 1, a, r1, r2],
      [w, a - 1, r1, r2],
      [w, a, r1 - 1, r2 - 1],
      [w, a, r1, r2 - 1],
    ].forEach(([nw, na, nr1, nr2]) => {
      if (nw >= 0 && na >= 0 && nr1 >= 0 && nr2 >= 0 && nr1 !== nr2) {
        q.push([nw, na, nr1, nr2]);
      }
    });
  }

  return maxCost;
};

import Heap from "heap-js";
import { Deque } from "@blakeembrey/deque";

type Name = string;
type Cost = number;
type Damage = number;
type Mana = number;
type HitPoints = number;
type Armor = number;
type Effects = Map<string, [number, (player: Character, turn: number) => void]>;
type Spells = Map<string, Spell>;
interface Character {
  name: Name;
  mana: Mana;
  armor: Armor;
  effects: Effects;
  hitPoints: HitPoints;
}

interface Cast {
  cast(player: Character, boss: Character): void;
}

class Spell implements Cast {
  constructor(public readonly name: Name, public readonly mana: Cost) {}

  cast(player: Character, boss: Character) {}
}

class MagicMissile extends Spell {
  constructor() {
    super("Magic Missile", 53);
  }

  cast(player: Character, boss: Character) {
    boss.hitPoints -= 4;
    player.mana -= this.mana;
  }
}

class Drain extends Spell {
  constructor() {
    super("Drain", 73);
  }

  cast(player: Character, boss: Character) {
    boss.hitPoints -= 2;
    player.hitPoints += 2;
    player.mana -= this.mana;
  }
}

class Shield extends Spell {
  constructor() {
    super("Shield", 113);
  }

  cast(player: Character, boss: Character) {
    player.armor += 7;
    player.mana -= this.mana;
    player.effects.set(this.name, [
      6,
      (player: Character, turn: number) => {
        if (turn === 1) player.armor -= 7;
      },
    ]);
  }
}

class Poison extends Spell {
  constructor() {
    super("Poison", 173);
  }

  cast(player: Player, boss: Boss) {
    player.mana -= this.mana;
    boss.effects.set(this.name, [
      6,
      (boss: Character, turn: number) => {
        boss.hitPoints -= 3;
      },
    ]);
  }
}

class Recharge extends Spell {
  constructor() {
    super("Recharge", 229);
  }

  cast(player: Player, boss: Boss) {
    player.mana -= this.mana;
    player.effects.set(this.name, [
      5,
      (player: Character, turn: number) => {
        player.mana += 101;
      },
    ]);
  }
}

export class Boss implements Character {
  name: Name = "Boss";

  mana: Mana = 0;

  effects: Effects = new Map();

  armor: Armor = 0;

  constructor(public hitPoints: HitPoints, public readonly damage: Damage) {}

  attack(player: Character) {
    player.hitPoints -= Math.max(1, this.damage - player.armor);
  }
}

export class Player implements Character {
  name: Name = "Player";

  armor: Armor = 0;

  effects: Effects = new Map();

  constructor(public hitPoints: HitPoints = 100, public mana: Mana = 500) {}

  spells: Spells = new Map([
    ["magicMissile", new MagicMissile()],
    ["drain", new Drain()],
    ["shield", new Shield()],
    ["poison", new Poison()],
    ["recharge", new Recharge()],
  ]);
}

class Game {
  constructor(public player: Player, public boss: Boss, public hard = false) {}

  cast(spell: Cast) {
    spell.cast(this.player, this.boss);
  }

  copy() {
    const player = new Player(this.player.hitPoints, this.player.mana);
    player.armor = this.player.armor;
    const boss = new Boss(this.boss.hitPoints, this.boss.damage);

    const playerEffects: Effects = new Map();
    this.player.effects.forEach(([turns, cbf], name) => {
      playerEffects.set(name, [turns, cbf]);
    });
    player.effects = playerEffects;

    const bossEffects: Effects = new Map();
    this.boss.effects.forEach(([turns, cbf], name) => {
      bossEffects.set(name, [turns, cbf]);
    });
    boss.effects = bossEffects;

    return new Game(player, boss, this.hard);
  }

  applyEffects() {
    this.player.effects.forEach((effect, name) => {
      effect[1](this.player, effect[0]);
      effect[0] -= 1;
      if (effect[0] === 0) {
        this.player.effects.delete(name);
      }
    });
    this.boss.effects.forEach((effect, name) => {
      effect[0] -= 1;
      effect[1](this.boss, effect[0]);
      if (effect[0] === 0) {
        this.boss.effects.delete(name);
      }
    });
  }

  turn(spell: Spell) {
    if (this.hard) {
      this.player.hitPoints -= 1;
      if (this.player.hitPoints <= 0) {
        return false;
      }
    }
    this.applyEffects();
    if (this.boss.hitPoints <= 0) {
      return 0;
    }
    if (this.player.mana < spell.mana) {
      return false;
    }
    this.cast(spell);
    if (this.boss.hitPoints <= 0) {
      return spell.mana;
    }
    this.applyEffects();
    if (this.boss.hitPoints <= 0) {
      return spell.mana;
    }
    this.boss.attack(this.player);
    if (this.player.hitPoints <= 0) {
      return false;
    }
    return spell.mana;
  }

  log(spell: string) {
    const buff = [];
    buff.push(
      `Player has ${this.player.hitPoints} hit points, ${this.player.armor} armor, ${this.player.mana} mana`
    );
    buff.push(`Boss has ${this.boss.hitPoints} hit points`);
    buff.push(`Player casts ${spell}`);
    buff.push(
      `Player effects: ${[
        ...Array.from(this.player.effects.entries()).map(
          ([a, [b]]) => `${a},${b}`
        ),
      ].join(", ")}`
    );
    buff.push(
      `Boss effects: ${[
        ...Array.from(this.boss.effects.entries()).map(
          ([a, [b]]) => `${a},${b}`
        ),
      ].join(", ")}`
    );
    buff.push(`next turn`);
    return buff.join("\n");
  }
}

export const getLeastMana = (player: Player, boss: Boss, hard = false) => {
  const game = new Game(player, boss, hard);
  const queue = new Deque<[Game, string, number, string[]]>();

  for (const [spell] of player.spells) {
    queue.push([game.copy(), spell, 0, ["start"]]);
  }

  while (queue.size > 0) {
    const [game, spell, manaSpent, log] = queue.popLeft();

    if (game.boss.hitPoints <= 0) {
      console.log(log.join("\n\n"));
      return manaSpent;
    }
    if (game.player.hitPoints <= 0) {
      continue;
    }

    const result = game.turn(game.player.spells.get(spell));

    const newLog = [...log, game.log(spell)];

    if (result === 0) {
      console.log(newLog.join("\n\n"));
      return manaSpent;
    }

    if (result === false) {
      continue;
    }

    for (const [nextSpellName, nextSpell] of game.player.spells) {
      if (game.player.effects.has(nextSpellName)) continue;
      if (game.boss.effects.has(nextSpellName)) continue;

      const nextGame = game.copy();

      queue.push([
        nextGame,
        nextSpellName,
        manaSpent + player.spells.get(spell).mana,
        newLog,
      ]);
    }
  }

  return -1;
};

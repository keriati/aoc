import { Boss, getLeastMana, Player } from "../day22";

describe("Advent of Code 2015", () => {
  describe("Day 22: Wizard Simulator 20XX", () => {
    it("returns the least amount of mana required example 1", () => {
      const player = new Player(10, 250);
      const boss = new Boss(13, 8);
      const actual = getLeastMana(player, boss);

      expect(actual).toBe(226);
    });

    it("returns the least amount of mana required example 2", () => {
      const player = new Player(10, 250);
      const boss = new Boss(14, 8);

      const actual = getLeastMana(player, boss);

      expect(actual).toBe(641);
    });

    it("returns the least amount of mana required", () => {
      const player = new Player(50, 500);
      const boss = new Boss(51, 9);

      const actual = getLeastMana(player, boss);

      expect(actual).toBe(900);
    });

    it("returns the least amount of mana required with hard difficulty", () => {
      const player = new Player(50, 500);
      const boss = new Boss(51, 9);

      const actual = getLeastMana(player, boss, true);

      expect(actual).toBe(1216);
    });
  });
});

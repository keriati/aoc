import {
  FloorMap,
  getMinElevatorRides,
  isSimilarFloors,
  isFloorMapValid,
  isWinner,
} from "../day11";

describe("Advent of Code 2016", () => {
  describe("Day 11: Radioisotope Thermoelectric Generators", () => {
    describe("isValidFloors()", () => {
      it("returns true for valid state", () => {
        const floors: FloorMap = [
          [false, true, false, true],
          [true, false, false, false],
          [false, false, true, false],
          [false, true, false, true],
        ];

        expect(isFloorMapValid(floors)).toBe(true);
      });

      it("returns false for invalid state", () => {
        const floors: FloorMap = [
          [false, true, true, true],
          [true, false, false, false],
          [false, false, false, false],
          [false, true, false, true],
        ];

        expect(isFloorMapValid(floors)).toBe(false);
      });

      it("returns false for invalid state", () => {
        const floors: FloorMap = [
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, true],
          [true, true, true, false],
        ];

        expect(isFloorMapValid(floors)).toBe(true);
      });
    });

    describe("isWinner()", () => {
      it("returns true for winning state", () => {
        const floors: FloorMap = [
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false],
          [true, true, true, true],
        ];

        expect(isWinner(floors)).toBe(true);
      });

      it("returns false for not winning state", () => {
        const floors: FloorMap = [
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, true],
          [true, true, true, false],
        ];

        expect(isWinner(floors)).toBe(false);
      });
    });

    describe("isEqualFloors()", () => {
      it("returns true for equal states", () => {
        const floorsA: FloorMap = [
          [false, false, true, true],
          [true, true, false, false],
          [false, false, false, false],
          [false, false, false, false],
        ];
        const floorsB: FloorMap = [
          [true, true, false, false],
          [false, false, true, true],
          [false, false, false, false],
          [false, false, false, false],
        ];

        expect(isSimilarFloors(floorsA, floorsB)).toBe(true);
      });

      it("returns true for equal states 2", () => {
        const floorsA: FloorMap = [
          [false, false, true, false],
          [true, true, false, true],
          [false, false, false, false],
          [false, false, false, false],
        ];
        const floorsB: FloorMap = [
          [true, false, false, false],
          [false, true, true, true],
          [false, false, false, false],
          [false, false, false, false],
        ];

        expect(isSimilarFloors(floorsA, floorsB)).toBe(true);
      });
    });

    it("returns the number of minimum steps example", () => {
      const input = `The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`;

      const actual = getMinElevatorRides(input);

      expect(actual).toBe(11);
    });

    it("returns the number of minimum steps - file input", () => {
      const input = `The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
The third floor contains a thulium-compatible microchip.
The fourth floor contains nothing relevant.`;

      const actual = getMinElevatorRides(input);

      expect(actual).toBe(37);
    });

    it("returns the number of minimum steps part 2 - file input", () => {
      const input = `The first floor contains a elerium generator, a elerium-compatible microchip, a dilithium generator, a dilithium-compatible microchip, a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
The third floor contains a thulium-compatible microchip.
The fourth floor contains nothing relevant.`;

      const actual = getMinElevatorRides(input);

      expect(actual).toBe(61);
    });

    it("returns the number of minimum steps Nandi - file input", () => {
      const input = `The first floor contains a promethium generator and a promethium-compatible microchip.
The second floor contains a cobalt generator, a curium generator, a ruthenium generator, and a plutonium generator.
The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, a ruthenium-compatible microchip, and a plutonium-compatible microchip.
The fourth floor contains nothing relevant.`;

      const actual = getMinElevatorRides(input);

      expect(actual).toBe(33);
    });

    it("returns the number of minimum steps part 2 Nandi - file input", () => {
      const input = `The first floor contains a elerium generator, a elerium-compatible microchip, a dilithium generator, a dilithium-compatible microchip, a promethium generator and a promethium-compatible microchip.
The second floor contains a cobalt generator, a curium generator, a ruthenium generator, and a plutonium generator.
The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, a ruthenium-compatible microchip, and a plutonium-compatible microchip.
The fourth floor contains nothing relevant.`;

      const actual = getMinElevatorRides(input);

      expect(actual).toBe(57);
    });
  });
});

/**
 *
 * F4 .  .  .  .  .
 * F3 .  .  .  .  .  TG .  .  .  .
 * F2 .  .  .  .  .  .  TM RG RM CG CM
 * F1 E  SG SM PG PM .  .  .  .  .  .
 *
 * F4 .  .  .  .  .
 * F3 .  .  .  .  .  TG .  .  .  .
 * F2 .  .  .  PG PM .  TM RG RM CG CM
 * F1 E  SG SM .  .  .  .  .  .  .  .
 *
 * F4 .  .  .  .  .
 * F3 .  .  .  PG PM TG .  .  .  .
 * F2 .  .  .  .  .  .  TM RG RM CG CM
 * F1 E  SG SM .  .  .  .  .  .  .  .
 *
 * F4 .  .  .  .  .
 * F3 .  .  .  PG PM .  .  .  .  .
 * F2 .  .  .  .  .  TG TM RG RM CG CM
 * F1 E  SG SM .  .  .  .  .  .  .  .
 *
 */

import { mk2n, mk3n, pairSInt, umk2n, uPairSInt } from "../utils";

describe("utils", () => {
  describe("Elegant Pairing - unsigned", () => {
    it("returns a unique integer from 2 unsigned integers", () => {
      const actual = new Set<number>();
      for (let x = 0; x < 1000; x++) {
        for (let y = 0; y < 1000; y++) {
          actual.add(mk2n(x, y));
        }
      }

      expect(actual.size).toBe(1000 * 1000);
    });

    it("returns two original integers from paired integer", () => {
      for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 100; y++) {
          const actual = mk2n(x, y);

          const [ex, ey] = umk2n(actual);

          expect(ex).toBe(x);
          expect(ey).toBe(y);
        }
      }
    });
  });

  describe("mk3n", () => {
    it("returns a unique integer from 3 signed integers", () => {
      const actual = new Set<number>();

      for (let x = -100; x < 100; x++) {
        for (let y = -100; y < 100; y++) {
          for (let z = -100; z < 100; z++) {
            actual.add(mk3n(x, y, z));
          }
        }
      }

      expect(actual.size).toBe(200 * 200 * 200);
    });
  });

  describe("Signed Elegant Pairing", () => {
    it("returns a unique integer from 2 signed integers", () => {
      const actual = new Set<number>();

      for (let x = -500; x < 500; x++) {
        for (let y = -500; y < 500; y++) {
          actual.add(pairSInt(x, y));
        }
      }

      expect(actual.size).toBe(1000 * 1000);
    });

    xit("returns two original integers from paired integer", () => {
      for (let x = -100; x < 100; x++) {
        for (let y = -100; y < 100; y++) {
          const actual = pairSInt(x, y);

          const [ex, ey] = uPairSInt(actual);

          expect(ex).toBe(x);
          expect(ey).toBe(y);
        }
      }
    });
  });
});

import * as fs from "fs";
import * as path from "path";
import {
  getLengthTypeID,
  getLiteralValue,
  getNumberOfSubPackets,
  getResult,
  getResult2,
  getSubPackets,
  getTotalLengthOfSubPackets,
  getTypeID,
  getVersion,
  hexToBin,
} from "../day16";

describe("Advent of Code 2021", () => {
  describe("Day 16: Packet Decoder", () => {
    it("returns the binary representation", () => {
      const input = `D2FE28`;
      const actual = hexToBin(input);

      expect(actual).toBe("110100101111111000101000");
    });

    it("returns the binary representation 3", () => {
      const input = `8A004A801A8002F478`;
      const actual = hexToBin(input);

      expect(actual).toBe(
        "100010100000000001001010100000000001101010000000000000101111010001111000"
      );
    });

    it("returns the version", () => {
      const input = `D2FE28`;
      const actual = getVersion(hexToBin(input));

      expect(actual).toBe(6);
    });

    it("returns the version 2", () => {
      const input = `38006F45291200`;
      const actual = getVersion(hexToBin(input));

      expect(actual).toBe(1);
    });

    it("returns the typeID", () => {
      const input = `D2FE28`;
      const actual = getTypeID(hexToBin(input));

      expect(actual).toBe(4);
    });

    it("returns the typeID 2", () => {
      const input = `38006F45291200`;
      const actual = getTypeID(hexToBin(input));

      expect(actual).toBe(6);
    });

    it("returns the length type ID", () => {
      const input = `38006F45291200`;
      const actual = getLengthTypeID(hexToBin(input));

      expect(actual).toBe("0");
    });

    it("returns the length type ID 2", () => {
      const input = `EE00D40C823060`;
      const actual = getLengthTypeID(hexToBin(input));

      expect(actual).toBe("1");
    });

    it("returns the total length of bits in subpackets", () => {
      const input = `38006F45291200`;
      const actual = getTotalLengthOfSubPackets(hexToBin(input));

      expect(actual).toBe(27);
    });

    it("returns the number of subpackets", () => {
      const input = `EE00D40C823060`;
      const actual = getNumberOfSubPackets(hexToBin(input));

      expect(actual).toBe(3);
    });

    it("returns the subpackets", () => {
      const input = `38006F45291200`;
      const actual = getSubPackets(hexToBin(input));

      expect(actual).toEqual([
        [
          0,
          "0011100000000000011011",
          [[[22, "11010001010"]], [[33, "0101001000100100"]]],
        ],
      ]);
    });

    it("returns the subpackets 2", () => {
      const input = `EE00D40C823060`;
      const actual = getSubPackets(hexToBin(input));

      expect(actual).toEqual([
        [
          0,
          "111011100000000011",
          [[[18, "01010000001"]], [[29, "10010000010"]], [[40, "00110000011"]]],
        ],
      ]);
    });

    it("returns the subpackets 3", () => {
      const input = `8A004A801A8002F478`;
      const actual = getSubPackets(hexToBin(input));

      expect(actual).toEqual([
        [
          0,
          "100010100000000001",
          [
            [
              [
                18,
                "001010100000000001",
                [[[36, "1010100000000000001011", [[[58, "11010001111"]]]]]],
              ],
            ],
          ],
        ],
      ]);
    });

    it("returns the subpackets 4", () => {
      const input = `620080001611562C8802118E34`;
      const actual = getSubPackets(hexToBin(input));

      expect(actual).toEqual([
        [
          0,
          "011000100000000010",
          [
            [
              [
                18,
                "0000000000000000010110",
                [[[40, "00010001010"]], [[51, "10110001011"]]],
              ],
            ],
            [
              [
                62,
                "001000100000000010",
                [[[80, "00010001100"]], [[91, "01110001101"]]],
              ],
            ],
          ],
        ],
      ]);
    });

    it("returns the subpackets 5", () => {
      const input = `C0015000016115A2E0802F182340`;
      const actual = getSubPackets(hexToBin(input));

      expect(actual).toEqual([
        [
          0,
          "1100000000000001010100",
          [
            [
              [
                22,
                "0000000000000000010110",
                [[[44, "00010001010"]], [[55, "11010001011"]]],
              ],
            ],
            [
              [
                66,
                "100000100000000010",
                [[[84, "11110001100"]], [[95, "00010001101"]]],
              ],
            ],
          ],
        ],
      ]);
    });

    it("returns the subpackets 6", () => {
      const input = `A0016C880162017C3686B18A3D4780`;
      const actual = getSubPackets(hexToBin(input));

      expect(actual).toEqual([
        [
          0,
          "1010000000000001011011",
          [
            [
              [
                22,
                "001000100000000001",
                [
                  [
                    [
                      40,
                      "011000100000000101",
                      [
                        [[58, "11110000110"]],
                        [[69, "11010000110"]],
                        [[80, "10110001100"]],
                        [[91, "01010001111"]],
                        [[102, "01010001111"]],
                      ],
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ]);
    });

    it("returns the version sum", () => {
      const input = `8A004A801A8002F478`;
      const actual = getResult(input);

      expect(actual).toBe(16);
    });

    it("returns the version sum 2", () => {
      const input = `620080001611562C8802118E34`;
      const actual = getResult(input);

      expect(actual).toBe(12);
    });

    it("returns the version sum 3", () => {
      const input = `C0015000016115A2E0802F182340`;
      const actual = getResult(input);

      expect(actual).toBe(23);
    });

    it("returns the version sum 4", () => {
      const input = `A0016C880162017C3686B18A3D4780`;
      const actual = getResult(input);

      expect(actual).toBe(31);
    });

    it("returns the result - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day16.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult(input);

      expect(actual).toBe(934);
    });

    it("returns the literal value", () => {
      const input = `110100101111111000101000`;

      const actual = getLiteralValue(input);

      expect(actual).toBe(2021);
    });

    it("returns the sum", () => {
      const input = `C200B40A82`;

      const actual = getResult2(input);

      expect(actual).toBe(3);
    });

    it("returns the product", () => {
      const input = `04005AC33890`;

      const actual = getResult2(input);

      expect(actual).toBe(54);
    });

    it("returns the min", () => {
      const input = `880086C3E88112`;

      const actual = getResult2(input);

      expect(actual).toBe(7);
    });

    it("returns the max", () => {
      const input = `CE00C43D881120`;

      const actual = getResult2(input);

      expect(actual).toBe(9);
    });

    it("returns 0 as smaller", () => {
      const input = `F600BC2D8F`;

      const actual = getResult2(input);

      expect(actual).toBe(0);
    });

    it("returns 1 as greater", () => {
      const input = `D8005AC2A8F0`;

      const actual = getResult2(input);

      expect(actual).toBe(1);
    });

    it("returns 0 as not equal", () => {
      const input = `9C005AC2F8F0`;

      const actual = getResult2(input);

      expect(actual).toBe(0);
    });

    it("returns 1 as is equal", () => {
      const input = `9C0141080250320F1802104A08`;

      const actual = getResult2(input);

      expect(actual).toBe(1);
    });

    it("returns the result part 2 - file input", () => {
      const input = fs.readFileSync(path.resolve(__dirname, "../day16.txt"), {
        encoding: "utf8",
        flag: "r",
      });

      const actual = getResult2(input);

      expect(actual).toBe(912901337844);
    });
  });
});

type PacketTree = [number, string, PacketTree[]?][];

const GROUP_SIZE = 5;
const PACKET_LITERAL_HEADER_LENGTH = 6;
const PACKET_OPERATOR_TYPE_0_HEADER_LENGTH = 22;
const PACKET_OPERATOR_TYPE_1_HEADER_LENGTH = 18;

export const hexToBin = (hex: string): string =>
  hex
    .split("")
    .map((h) => parseInt(h, 16).toString(2).padStart(4, "0"))
    .join("");

export const getTypeID = (bin: string) => parseInt(bin.substring(3, 6), 2);

export const getLengthTypeID = (bin: string) => bin.substring(6, 7);

export const getTotalLengthOfSubPackets = (bin: string) =>
  parseInt(bin.substring(7, PACKET_OPERATOR_TYPE_0_HEADER_LENGTH), 2);

export const getNumberOfSubPackets = (bin: string) =>
  parseInt(bin.substring(7, PACKET_OPERATOR_TYPE_1_HEADER_LENGTH), 2);

export const getVersion = (bin: string): number =>
  parseInt(bin.substring(0, 3), 2);

const getVersions = (packets: string[]): number[] =>
  packets.map((packet) => getVersion(packet));

const isLastGroup = (packet: string, index: number) => packet[index] === "0";

export const getSubPackets = (packet: string, startIndex = 0): PacketTree => {
  const typeID = getTypeID(packet);

  if (typeID === 4) {
    let i = PACKET_LITERAL_HEADER_LENGTH;

    while (!isLastGroup(packet, i)) {
      i += GROUP_SIZE;
    }

    return [[startIndex, packet.substring(0, i + GROUP_SIZE)]];
  }

  const lengthTypeID = getLengthTypeID(packet);
  const allPackets = [];
  const myPackets = [];
  let operatorPacket = null;

  if (lengthTypeID === "0") {
    operatorPacket = packet.substring(0, PACKET_OPERATOR_TYPE_0_HEADER_LENGTH);

    let parsedLength = PACKET_OPERATOR_TYPE_0_HEADER_LENGTH;

    const totalLengthOfSubPackets =
      getTotalLengthOfSubPackets(operatorPacket) + parsedLength;

    while (totalLengthOfSubPackets > parsedLength) {
      const myPacket = packet.substring(parsedLength);

      const subPackets = getSubPackets(myPacket, startIndex + parsedLength);

      myPackets.push(subPackets);

      const flatPackets: FlatArray<PacketTree, 999>[] = subPackets.flat(999);

      const lastPacketIndex = flatPackets[
        flatPackets.length - 2
      ] as unknown as number;
      const lastPacket = flatPackets[
        flatPackets.length - 1
      ] as unknown as string;

      parsedLength = lastPacketIndex + lastPacket.length - startIndex;
    }
  }

  if (lengthTypeID === "1") {
    operatorPacket = packet.substring(0, PACKET_OPERATOR_TYPE_1_HEADER_LENGTH);

    const numberOfSubpackes = getNumberOfSubPackets(packet);

    let packetsFound = 0;

    let parsedLength = PACKET_OPERATOR_TYPE_1_HEADER_LENGTH;

    while (packetsFound < numberOfSubpackes) {
      const myPacket = packet.substring(parsedLength);

      const subPackets = getSubPackets(myPacket, startIndex + parsedLength);

      myPackets.push(subPackets);

      const flatPackets: FlatArray<PacketTree, 999>[] = subPackets.flat(999);

      const lastPacketIndex = flatPackets[
        flatPackets.length - 2
      ] as unknown as number;
      const lastPacket = flatPackets[
        flatPackets.length - 1
      ] as unknown as string;

      parsedLength = lastPacketIndex + lastPacket.length - startIndex;

      packetsFound += 1;
    }
  }

  allPackets.push([startIndex, operatorPacket, myPackets]);

  return allPackets;
};

export const getResult = (input) => {
  const bin = hexToBin(input);

  const subPackets = getSubPackets(bin)
    .flat(9999)
    .filter((a) => typeof a === "string") as unknown as string[];

  return getVersions(subPackets).reduce((sum, v) => sum + v, 0);
};

export const getLiteralValue = (packet) => {
  const packetData = packet.substring(6);
  let i = 0;
  const groups = [packetData.substring(i + 1, i + GROUP_SIZE)];

  while (!isLastGroup(packetData, i)) {
    i += GROUP_SIZE;
    groups.push(packetData.substring(i + 1, i + GROUP_SIZE));
  }

  return parseInt(groups.join(""), 2);
};

const processPackets = (subPackets: PacketTree) => {
  const [, packet, childPackets] = subPackets.shift();

  const typeID = getTypeID(packet);

  if (typeID === 4) return getLiteralValue(packet);

  const childValues = [];

  for (const childPacket of childPackets) {
    childValues.push(processPackets(childPacket));
  }

  if (typeID === 0) return childValues.reduce((sum, val) => sum + val, 0);
  if (typeID === 1) return childValues.reduce((sum, val) => sum * val, 1);
  if (typeID === 2) return Math.min(...childValues);
  if (typeID === 3) return Math.max(...childValues);
  if (typeID === 5) return childValues[0] > childValues[1] ? 1 : 0;
  if (typeID === 6) return childValues[0] < childValues[1] ? 1 : 0;
  if (typeID === 7) return childValues[0] === childValues[1] ? 1 : 0;

  throw new Error("No Love!");
};

export const getResult2 = (input) => {
  const bin = hexToBin(input);

  const subPackets = getSubPackets(bin);

  return processPackets(subPackets);
};

import { mk2n, umk2n } from "../util/utils";

type Port = [number, number];

const rotatePort = (port: Port): Port => [port[1], port[0]];

const mk = (port: Port): number => {
  const [a, b] = [...port].sort();
  return mk2n(a, b);
};

const getStrength = (visited: Set<number>): [number, number] => [
  Array.from(visited).reduce((strength, port) => {
    const [a, b] = umk2n(port);
    return strength + a + b;
  }, 0),
  visited.size,
];

export const getBridgeStrength = (input: string, longest = false) => {
  const ports: Port[] = input
    .split("\n")
    .map((line): Port => line.split("/").map(Number) as Port);

  const startingPorts = ports
    .filter((port) => port[0] === 0 || port[1] === 0)
    .map((port) => (port[0] === 0 ? port : rotatePort(port)));

  const bridgeStrengths = [];

  const queue: [Port, Set<number>][] = [];

  queue.push(
    ...startingPorts.map(
      (port) => [port, new Set([mk(port)])] as [Port, Set<number>]
    )
  );

  while (queue.length > 0) {
    const [current, visited] = queue.pop();
    const openConnection = current[1];

    const nextPorts = ports.filter(
      (port) =>
        (port[0] === openConnection || port[1] === openConnection) &&
        !visited.has(mk(port))
    );

    if (nextPorts.length === 0) {
      bridgeStrengths.push(getStrength(visited));
      continue;
    }

    const rotatedNextPorts: Port[] = nextPorts.map((port) =>
      port[0] === openConnection ? port : rotatePort(port)
    );

    rotatedNextPorts.forEach((port) => {
      const newVisited = new Set(visited);
      newVisited.add(mk(port));
      queue.push([port, newVisited]);
    });
  }

  if (!longest) return bridgeStrengths.map(([s]) => s).sort((a, b) => b - a)[0];

  return bridgeStrengths
    .sort((a, b) => b[1] - a[1])
    .filter((s) => s[1] === bridgeStrengths[0][1])
    .map((s) => s[0])
    .sort((a, b) => b - a)[0];
};

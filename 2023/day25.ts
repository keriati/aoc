import "regenerator-runtime/runtime";
import { mincut } from "@graph-algorithm/minimum-cut";
import { graphViz } from "../util/graphviz";

const cutConnection = (
  connections: Map<string, string[]>,
  componentA: string,
  componentB: string
): Map<string, string[]> => {
  const nodesA = connections.get(componentA);
  const nodesB = connections.get(componentB);

  connections.set(componentA, nodesA.filter((c) => c !== componentB) ?? []);
  connections.set(componentB, nodesB.filter((c) => c !== componentA) ?? []);

  return connections;
};

const getComponentGroups = (connections: Map<string, string[]>) => {
  const groups: string[][] = [];
  const visited = new Set<string>();

  for (const component of connections.keys()) {
    if (visited.has(component)) continue;

    const group: string[] = [];
    const queue = [component];

    while (queue.length > 0) {
      const connectedComponent = queue.pop();

      if (visited.has(connectedComponent)) continue;
      visited.add(connectedComponent);

      group.push(connectedComponent);
      queue.push(...connections.get(connectedComponent));
    }

    groups.push(group);
  }

  return groups;
};

export const getComponentGroupSizes = (input: string) => {
  const connections: [string, string][] = [];
  const connectionsMap: Map<string, string[]> = new Map();

  input.split("\n").forEach((line) => {
    const [component, connectedComponentsString] = line.split(": ");
    let connectedComponents = connectedComponentsString.split(" ");

    if (!connectionsMap.has(component)) {
      connectionsMap.set(component, connectedComponents);
    } else {
      connectionsMap.get(component).push(...connectedComponents);
    }

    for (const connectedComponent of connectedComponents) {
      connections.push([component, connectedComponent]);

      if (!connectionsMap.has(connectedComponent))
        connectionsMap.set(connectedComponent, []);

      const alreadyConnectedComponents = connectionsMap.get(connectedComponent);

      alreadyConnectedComponents.push(component);
    }
  });

  const highlights = [];

  for (const [componentA, componentB] of mincut(connections)) {
    cutConnection(connectionsMap, componentA, componentB);
    highlights.push(componentA);
    highlights.push(componentB);
  }
  console.log(highlights);

  graphViz(connections)
    .highlight(highlights, "#F4B183", "doublecircle")
    // .layout("sfdp")
    .overlap("prism1000")
    .overlapScaling(20)
    .render("aoc2023d25");

  const groups = getComponentGroups(connectionsMap);

  return groups[0].length * groups[1].length;
};

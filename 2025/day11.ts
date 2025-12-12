import { graphViz } from "../util/graphviz";

export const getResult = (input: string) => {
  const lines = input
    .split("\n")
    .map((line) => {
      const [from, to] = line.split(": ");
      return { from, to: to.split(" ") };
    })
    .reduce((acc, { from, to }) => {
      acc.set(from, to);
      return acc;
    }, new Map<string, string[]>());

  console.log(lines);

  let numberOfPaths = 0;
  const queue: string[] = [];
  queue.push("you");

  while (queue.length > 0) {
    const position = queue.shift();

    for (const to of lines.get(position)) {
      if (to === "out") {
        numberOfPaths++;
        continue;
      }

      queue.push(to);
    }
  }

  return numberOfPaths;
};

function getNumberOfPaths(
  pathMap: Map<string, string[]>,
  from: string,
  to: string,
  memo = new Map<string, number>()
) {
  if (from === to) {
    return 1;
  }

  if (memo.has(from)) {
    return memo.get(from);
  }

  let totalPaths = 0;
  const destinations = pathMap.get(from) || [];

  for (const destination of destinations) {
    totalPaths += getNumberOfPaths(pathMap, destination, to, memo);
  }

  memo.set(from, totalPaths);
  return totalPaths;
}

export const getResultPart2 = (input: string) => {
  const pathMap = input
    .split("\n")
    .map((line) => {
      const [from, to] = line.split(": ");
      return { from, to: to.split(" ") };
    })
    .reduce((acc, { from, to }) => {
      acc.set(from, to);
      return acc;
    }, new Map<string, string[]>());

  console.log(pathMap);

  const ffttodac = getNumberOfPaths(pathMap, "fft", "dac");
  const dactofft = getNumberOfPaths(pathMap, "dac", "fft");

  const srvtofft = getNumberOfPaths(pathMap, "svr", "fft");
  const srvtodac = getNumberOfPaths(pathMap, "svr", "dac");

  const ffttoout = getNumberOfPaths(pathMap, "fft", "out");
  const dactoout = getNumberOfPaths(pathMap, "dac", "out");

  return srvtofft * ffttodac * dactoout + srvtodac * dactofft * ffttoout;

  // const graph = Array.from(pathMap.entries()).reduce((graph, [name, items]) => {
  //   graph.push([name, items]);
  //   return graph;
  // }, []);
  //
  // const highlights = ["svr", "fft", "dac", "out"];
  // graphViz(graph)
  //   .highlightNode(highlights, "#F9D65D", "doublecircle")
  //   .layout("dot")
  //   .overlap("prism")
  //   .render("aoc2025d11");
};

import { writeFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";

type FileFormats = "svg" | "png" | "jpg" | "pdf" | "plain" | "ps" | "json";
type NeatoMode = "major" | "KK" | "sgd" | "hier" | "ipsep";
type Overlap =
  | "true"
  | "prism"
  | "scalexy"
  | "voronoi"
  | "compress"
  | "prism1000";
type LayoutEngine =
  | "dot"
  | "neato"
  | "fdp"
  | "sfdp"
  | "twopi"
  | "circo"
  | "nop"
  | "nop2"
  | "osage"
  | "patchwork";

export type GraphvizOptions = {
  overlap?: Overlap;
  overlap_scaling?: number;
  mode?: NeatoMode;
  layout?: LayoutEngine;
};

const OUT_DIR = "z_out";

export const graphViz = <T>(
  nodes: [T, T][] | [T, T[]][] | [T, [T, number][]][]
) => {
  const dotNodes = [];
  const graphType = Array.isArray(nodes[0][1]) ? "digraph" : "graph";

  if (Array.isArray(nodes[0][1])) {
    for (const [start, ends] of nodes) {
      if (typeof ends === "string") {
        dotNodes.push(` ${start} -- ${ends}`);
      } else if (Array.isArray(ends)) {
        for (const end of ends) {
          if (Array.isArray(end)) {
            dotNodes.push(
              ` ${start} -> ${end[0]} [label=${end[1]}] [weight=${end[1]}]`
            );
          } else {
            dotNodes.push(` ${start} -> ${end}`);
          }
        }
      }
    }
  }

  const options: GraphvizOptions = {
    overlap: "true",
    overlap_scaling: 0,
    layout: "neato",
    mode: "sgd",
  };

  const render = (fileName = "", format: FileFormats = "png") => {
    fileName = fileName || `graph-${Date.now()}`;

    const dotString = [];
    dotString.push(`${graphType} G {`);

    for (const [key, value] of Object.entries(options)) {
      dotString.push(` ${key}=${value}`);
    }

    dotString.push(...dotNodes);
    dotString.push(`}`);

    writeFileSync(`graph.dot`, dotString.join("\n"));
    execSync(`mkdir -p ${OUT_DIR}`);
    execSync(`dot -T${format} graph.dot -o ./${OUT_DIR}/${fileName}.${format}`);
    unlinkSync(`graph.dot`);
  };

  const builder = {
    overlap: (v: Overlap) => {
      options.overlap = v;
      return builder;
    },
    overlapScaling: (v: number) => {
      options.overlap_scaling = v;
      return builder;
    },
    layout: (v: LayoutEngine) => {
      options.layout = v;
      return builder;
    },
    mode: (v: NeatoMode) => {
      options.mode = v;
      return builder;
    },
    render,
  };

  return builder;
};

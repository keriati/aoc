import { writeFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";

type FileFormats = "svg" | "png" | "jpg" | "pdf" | "plain" | "ps" | "json";
type NeatoMode = "major" | "KK" | "sgd" | "hier" | "ipsep";
type OutputMode = "breadthfirst" | "nodesfirst" | "edgesfirst";
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
type NodeShape =
  | "box"
  | "polygon"
  | "ellipse"
  | "oval"
  | "circle"
  | "point"
  | "egg"
  | "triangle;plaintext"
  | "plain"
  | "diamond"
  | "trapezium"
  | "parallelogram"
  | "house"
  | "pentagon"
  | "hexagon"
  | "septagon"
  | "octagon"
  | "doublecircle"
  | "doubleoctagon"
  | "tripleoctagon"
  | "invtriangle"
  | "invtrapezium"
  | "invhouse"
  | "Mdiamond"
  | "Msquare"
  | "Mcircle"
  | "rect"
  | "rectangle"
  | "square"
  | "star"
  | "none"
  | "underline"
  | "cylinder"
  | "note"
  | "tab"
  | "folder"
  | "box3d"
  | "component"
  | "promoter"
  | "cds"
  | "terminator"
  | "utr"
  | "primersite"
  | "restrictionsite"
  | "fivepoverhang"
  | "threepoverhang"
  | "noverhang"
  | "assembly"
  | "signature"
  | "insulator"
  | "ribosite"
  | "rnastab"
  | "proteasesite"
  | "proteinstab"
  | "rpromoter"
  | "rarrow"
  | "larrow"
  | "lpromoter";

export type GraphvizOptions = {
  overlap?: Overlap;
  overlap_scaling?: number;
  mode?: NeatoMode;
  layout?: LayoutEngine;
  outputorder?: OutputMode;
  rotate?: string;
  bgcolor?: string;
  pad?: number;
};

const BG_COLOR = "#0A0F1F";
const NODE_COLOR = "#3BA7A3";
const EDGE_COLOR = "#C7D3DD";
const FONT_COLOR = "white";

const OUT_DIR = "z_out";

const DEFAULT_OPTIONS: GraphvizOptions = {
  overlap: "true",
  overlap_scaling: 0,
  layout: "neato",
  mode: "sgd",
  outputorder: "edgesfirst",
  bgcolor: BG_COLOR,
  pad: 1,
};

export const graphViz = <T>(
  nodes: [T, T][] | [T, T[]][] | [T, [T, number][]][]
) => {
  const dotNodes = [];
  let graphType = Array.isArray(nodes[0][1]) ? "digraph" : "graph";

  const options = { ...DEFAULT_OPTIONS };

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
  } else {
    for (const [a, b] of nodes) {
      dotNodes.push(a);
      dotNodes.push(b);
      dotNodes.push(`${a} -- ${b}`);
    }
  }

  let highlights = [];
  let highlightNodes = [];

  const render = (fileName = "", format: FileFormats = "png") => {
    fileName = fileName || `graph-${Date.now()}`;

    const dotString = [];
    dotString.push(`${graphType} G {`);

    // Add options
    for (const [key, value] of Object.entries(options)) {
      dotString.push(` ${key}="${value}"`);
    }

    // Custom global settings
    dotString.push('edge [color="' + EDGE_COLOR + '"];');
    dotString.push(
      'node [color="' +
        NODE_COLOR +
        '", style=filled, fontcolor=' +
        FONT_COLOR +
        ', shape=circle, fillcolor="' +
        NODE_COLOR +
        '"];'
    );

    // Update nodes with highlights
    for (let i = 0; i < dotNodes.length; i++) {
      const node = dotNodes[i];
      for (let j = 0; j < highlights.length; j++) {
        const elements = highlights[j][0];
        const color = highlights[j][1];
        const shape = highlights[j][2];

        if (elements.includes(node)) {
          dotNodes[i] = `${node} [color="${color}" shape=${shape}];`;
        }
      }
    }

    for (const highlightNode of highlightNodes) {
      dotString.push(
        `${highlightNode[0]} [fontcolor="#0A0F1F" color="${highlightNode[1]}" fillcolor="${highlightNode[1]}" shape=${highlightNode[2]}];`
      );
    }

    // Add nodes
    dotString.push(...dotNodes);

    dotString.push(`}`);

    writeFileSync(`graph.dot`, dotString.join("\n"));
    execSync(`mkdir -p ${OUT_DIR}`);
    execSync(`dot -T${format} graph.dot -o ./${OUT_DIR}/${fileName}.${format}`);
    unlinkSync(`graph.dot`);
  };

  const builder = {
    overlap: (overlap: Overlap) => {
      options.overlap = overlap;
      return builder;
    },
    overlapScaling: (factor: number) => {
      options.overlap_scaling = factor;
      return builder;
    },
    layout: (engine: LayoutEngine) => {
      options.layout = engine;
      return builder;
    },
    mode: (neatoMode: NeatoMode) => {
      options.mode = neatoMode;
      return builder;
    },
    highlight: (nodes: T[], color: string, shape: NodeShape = "circle") => {
      highlights.push([nodes, color, shape]);
      return builder;
    },
    highlightNode: (nodes: T[], color: string, shape: NodeShape = "circle") => {
      for (const node of nodes) {
        highlightNodes.push([node, color, shape]);
      }
      return builder;
    },
    render,
  };

  return builder;
};

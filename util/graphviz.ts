import { writeFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";

type NeatoMode = "major" | "KK" | "sgd" | "hier" | "ipsep";
type FileFormats = "svg" | "png" | "jpg" | "pdf" | "plain" | "ps" | "json";

const SELECTED_NEATO_MODE: NeatoMode = "sgd";
const SELECTED_FILE_FORMAT: FileFormats = "png";
const OUT_DIR = "z_out";

export const plotGraph = (nodes: [string, string][], fileName: string) => {
  let dotString = [];
  dotString.push(`graph G {`);
  dotString.push(` mode="${SELECTED_NEATO_MODE}"`);

  for (const [start, end] of nodes) {
    dotString.push(` ${start} -- ${end}`);
  }

  dotString.push(`}`);

  writeFileSync(`${fileName}.dot`, dotString.join("\n"));
  execSync(`mkdir -p ${OUT_DIR}`);
  execSync(
    `)dot -T${SELECTED_FILE_FORMAT} -Kneato ${fileName}.dot -o ./${OUT_DIR}/${fileName}.${SELECTED_FILE_FORMAT}`
  );
  unlinkSync(`${fileName}.dot`);
};

export const plotDiGraph = <T>(nodes: [T, T[]][], fileName: string) => {
  let dotString = [];
  dotString.push(`digraph G {`);
  dotString.push(` mode="${SELECTED_NEATO_MODE}"`);

  for (const [start, ends] of nodes) {
    for (const end of ends) {
      dotString.push(` ${start} -> ${end}`);
    }
  }

  dotString.push(`}`);

  writeFileSync(`${fileName}.dot`, dotString.join("\n"));
  execSync(`mkdir -p ${OUT_DIR}`);
  execSync(
    `dot -T${SELECTED_FILE_FORMAT} -Kneato ${fileName}.dot -o ./${OUT_DIR}/${fileName}.${SELECTED_FILE_FORMAT}`
  );
  unlinkSync(`${fileName}.dot`);
};

import path from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";

const YEAR_START = 2015;
const YEAR_END = 2022;

const updateStats = () => {
  const complete = {};
  let result = "";

  for (let year = YEAR_START; year <= YEAR_END; year++) {
    complete[year] = [];
    readdirSync(path.resolve(__dirname, `${year}`)).forEach((file) => {
      if (/day\d+\.ts/.test(file)) {
        complete[year].push(`${year}/${file}`);
      }
    });
  }

  for (const year in complete) {
    result += `    [${year}]: ${`${complete[year].length}`.padStart(
      2,
      " "
    )} *\n`;
  }

  return result;
};

const main = () => {
  const readme = readFileSync(path.resolve(__dirname, "README.md"), {
    encoding: "utf8",
    flag: "r",
  });

  const stats = updateStats().split("\n");

  const updatedReadme = readme.split("\n");
  updatedReadme.splice(9, stats.length, ...stats);

  writeFileSync(
    path.resolve(__dirname, "README.md"),
    updatedReadme.join("\n"),
    { encoding: "utf8" }
  );
};
main();

import path from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";

const YEAR_START = 2015;
const YEAR_END = 2023;

const getStats = () => {
  const complete = {};

  for (let year = YEAR_START; year <= YEAR_END; year++) {
    complete[year] = [];
    readdirSync(path.resolve(__dirname, `${year}`)).forEach((file) => {
      if (/day\d+\.ts/.test(file)) {
        complete[year].push(`${year}/${file}`);
      }
    });
  }
  return complete;
};

const main = () => {
  const readme = readFileSync(path.resolve(__dirname, "README.md"), {
    encoding: "utf8",
    flag: "r",
  });

  const stats = getStats();
  const statsText = [];
  let starsTotal = 0;

  for (const year in stats) {
    const stars = stats[year].length * 2;
    starsTotal += stars;
    statsText.push(`    [${year}]: ${`${stars}`.padStart(2, " ")}*`);
  }

  statsText.reverse();
  statsText.push("");
  statsText.push(`    Total stars: ${starsTotal}*`);

  const updatedReadme = readme.split("\n");
  updatedReadme.splice(9, statsText.length, ...statsText);

  writeFileSync(
    path.resolve(__dirname, "README.md"),
    updatedReadme.join("\n"),
    { encoding: "utf8" }
  );
};
main();

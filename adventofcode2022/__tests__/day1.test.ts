import * as fs from "fs";
import * as path from "path";
import { getElvWithMostCalories } from "../day1";

it("should return the elv number with most calories 1", () => {
  const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

  const elvNumber = getElvWithMostCalories(input);
});

it("should return the elv number with most calories", () => {
  const input = fs.readFileSync(path.resolve(__dirname, "../day1.txt"), {
    encoding: "utf8",
    flag: "r",
  });

  const elvNumber = getElvWithMostCalories(input);
});

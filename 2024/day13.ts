import { init } from "z3-solver";

type MachineParams = {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  px: number;
  py: number;
};

const parseInput = (input: string, addValue: number): MachineParams[] =>
  input
    .split("\n\n")
    .map((raw) => raw.split("\n").join(" "))
    .map((line) =>
      line.match(
        /Button A: X\+(\d+), Y\+(\d+) Button B: X\+(\d+), Y\+(\d+) Prize: X=(\d+), Y=(\d+)/
      )
    )
    .map((values) => values.map(Number))
    .map(([, ax, ay, bx, by, px, py]) => ({
      ax,
      ay,
      bx,
      by,
      px: px + addValue,
      py: py + addValue,
    }));

export const getFewestTokens = async (input: string, addValue = 0) => {
  const machines = parseInput(input, addValue);

  const { Context } = await init();
  const Z3 = Context(`main`);
  const solver = new Z3.Solver();

  const zbpa = Z3.Int.const("zbpa");
  const zbpb = Z3.Int.const("zbpb");

  const zax = Z3.Int.const("zax");
  const zay = Z3.Int.const("zay");
  const zbx = Z3.Int.const("zbx");
  const zby = Z3.Int.const("zby");
  const zpx = Z3.Int.const("zpx");
  const zpy = Z3.Int.const("zpy");

  solver.add(zbpa.mul(zax).add(zbpb.mul(zbx)).eq(zpx));

  solver.add(zbpa.mul(zay).add(zbpb.mul(zby)).eq(zpy));

  const solve = async ({ ax, ay, bx, by, px, py }) => {
    solver.push();

    solver.add(zax.eq(Z3.Int.val(ax)));
    solver.add(zay.eq(Z3.Int.val(ay)));
    solver.add(zbx.eq(Z3.Int.val(bx)));
    solver.add(zby.eq(Z3.Int.val(by)));
    solver.add(zpx.eq(Z3.Int.val(px)));
    solver.add(zpy.eq(Z3.Int.val(py)));

    const isSat = await solver.check();

    if (isSat !== "sat") {
      solver.pop();
      return 0;
    }

    const model = solver.model();

    const buttonPressesA = Number(model.eval(zbpa));
    const buttonPressesB = Number(model.eval(zbpb));

    solver.pop();

    return buttonPressesA * 3 + buttonPressesB;
  };

  return machines.reduce(
    async (acc, machine) => (await acc) + (await solve(machine)),
    Promise.resolve(0)
  );
};

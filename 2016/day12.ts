export const getResult = (input, cInit = 0) => {
  const lines = input.split("\n");

  const register = new Map<string, number>([
    ["a", 0],
    ["b", 0],
    ["c", cInit],
    ["d", 0],
  ]);

  for (let i = 0; i < lines.length; i++) {
    const [cmd, arg1, arg2] = lines[i].split(" ");

    switch (cmd) {
      case "cpy":
        if (/^\d+$/.test(arg1)) {
          register.set(arg2, Number(arg1));
        } else {
          register.set(arg2, register.get(arg1));
        }
        break;
      case "inc":
        register.set(arg1, register.get(arg1) + 1);
        break;
      case "dec":
        register.set(arg1, register.get(arg1) - 1);
        break;
      case "jnz":
        let jnzArg = 0;
        if (/^\d+$/.test(arg1)) {
          jnzArg = Number(arg1);
        } else {
          jnzArg = register.get(arg1);
        }
        if (jnzArg !== 0) {
          i += Number(arg2) - 1;
        }
        break;
      default:
        break;
    }
  }

  return register.get("a");
};

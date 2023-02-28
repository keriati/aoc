export const defaultDict = (init) =>
  new Proxy(
    {},
    {
      get: (target, name) =>
        name in target
          ? target[name]
          : (target[name] =
              typeof init === "function" ? new init().valueOf() : init),
    }
  );

export const ABC_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const ABC_LOWER = "abcdefghijklmnopqrstuvwxyz";
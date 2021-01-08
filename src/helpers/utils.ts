export function pick<T, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Partial<Pick<T, K>> {
  const ret: Partial<Pick<T, K>> = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}

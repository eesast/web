/**
 * ```ts
 * pick(obj: T, keys: K[])
 * ```
 *
 * 用于从 obj 中提取部分字段
 *
 * 例：
 *
 * ```ts
 * A = { a : 0, b : 1 }
 * B = pick(a, ["b"])
 * // B { b : 1 }
 * ```
 */
export function pick<T, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<Pick<T, K>> {
  const ret: Partial<Pick<T, K>> = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}

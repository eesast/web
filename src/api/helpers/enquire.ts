import enquire from "enquire.js";

export const enquireScreenSize = (
  fun: (bool: boolean) => void,
  query: string = "screen and (max-width: 767px)",
) => {
  const handler = {
    match: () => {
      fun(true);
    },
    unmatch: () => {
      fun(false);
    },
  };
  enquire.register(query, handler);
  return handler;
};

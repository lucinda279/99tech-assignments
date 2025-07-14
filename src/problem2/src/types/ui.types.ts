export type Theme = "light" | "dark";

export type InputEvent<TValue = unknown> = {
  target: { value: TValue; name: string };
};

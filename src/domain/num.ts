export type NumT = number;

export type Fn<T> = (s: number) => T;

export function lt(newNum: number): Fn<boolean> {
  return (num) => num > newNum;
}

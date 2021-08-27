export function absurd(never: never): never {
  // eslint-disable-next-line functional/no-throw-statement
  throw Error(never);
}

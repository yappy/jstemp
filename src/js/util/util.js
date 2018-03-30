export function assert(expr) {
  if (!(expr)) {
    throw new Error("Assertion failed");
  }
}

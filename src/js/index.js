import { assert } from "./util/util";

assert(true);

class MyClass {
  constructor() {
    this.message = "class test";
  }
  say() {
    console.log(this.message);
  }
}

new MyClass().say();
assert(false);

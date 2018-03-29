import { assert } from "./util";

assert(true);

class MyClass {
  constructor() {
    this.message = "class test";
  }
  say() {
    console.log(this.message);
  }
}

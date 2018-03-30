import * as util from "./util/util";

class MyClass {
  constructor() {
    this.message = "class test";
  }
  say() {
    console.log(this.message);
  }
}

util.assert(true);
new MyClass().say();
console.log(util.inspect({a: "aaa", b: "bbbbb"}));
console.log(util.inspect([1, 2, 3, 4, 5]));

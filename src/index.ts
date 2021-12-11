import {testUtil} from './test';

/**
 * @description 测试类
 */
class Test {
  public name: string;
  /**
   * @constructor
   * @param {string} name
   */
  constructor(name: string) {
    this.name = name;
  }
}
const test = new Test(testUtil());
console.log('test');
console.table(test);

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
    testUtil();
  }
}
const test = new Test('124');
console.log('test');
console.table(test);

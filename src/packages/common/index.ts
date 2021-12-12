/**
 * @author Gems
 * @date 2021/12/11 12:43:03
 * @description 公共基类
 */
export class Common {
  /**
   * @author Gems
   * @date 2021/12/11 12:43:32
   * @description 确认弹窗
   * @param {string} msg
   * @param {LFn} success
   * @param {LFn} fail
   */
  public confirm(msg: string, success?: LFn, fail?: LFn) {
    if (confirm(msg)) success && success();
    else fail && fail();
  }
  /**
   * @author Gems
   * @date 2021/12/11 15:25:19
   * @description 静态Common实例
   */
  static common = new Common();
  /**
   * @author Gems
   * @date 2021/12/11 15:25:31
   * @description 静态确认弹窗
   */
  static confirm(...rest: any) {
    this.common.confirm(rest);
  }
}

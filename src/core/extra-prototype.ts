/**
 * @author Gems
 * @date 2021/12/11 15:08:11
 * @description 对象forEach
 * @param {ObjForEachCallBack} callback
 */
Object.prototype.forEach = function (callback) {
  Object.keys(this).forEach((k: string, i: number) => {
    callback((this as any)[k], k, i, this);
  });
};

Object.prototype.map = function (callback) {
  return Object.keys(this).map((k: string, i: number) => {
    return callback((this as any)[k], k, i, this);
  });
};

String.prototype.toKebabCase = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase();
};

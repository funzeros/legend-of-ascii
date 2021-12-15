/**
 * @author Gems
 * @date 2021/12/15 19:20:44
 * @description loa状态管理
 */
class Loax {
  /**
   * @author Gems
   * @date 2021/12/15 19:49:17
   * @description loax  构造函数
   * @param {string} name
   */
  constructor(name: string) {
    this.name = name;
  }
  protected name: string;

  protected sets = new Map<string, LObj>();
  /**
   * @author Gems
   * @date 2021/12/15 20:05:11
   * @description 创建一个命名空间
   * @param {string} name;
   * @param {ClassLoax.DefineStoreOptions}options
   * @return {any}
   */
  public defineStore<
    S extends ClassLoax._StoreState = {},
    A extends ClassLoax._StoreActions = {},
  >(name: string = 'default', options: ClassLoax.DefineStoreOptions<S, A>) {
    options;
    const state = options.state();
    const store = {
      ...state,
    } as S & A;
    (options.actions as unknown as Object).forEach((v, k) => {
      (<LObj>store)[k] = v.bind(store);
    });
    return () => store;
  }
}

const loax = new Loax('loa');
export const defineStore = loax.defineStore;

import {nextTick} from '@/utils';
import {Engine} from '@loa';

/**
 * @author Gems
 * @date 2021/12/11 16:59:07
 * @description 游戏运行时
 */
export class Runtime {
  private engine:Engine;
  private routes:ClassRuntime.Router.RouteRaw[]=[];
  /**
   * @author Gems
   * @date 2021/12/11 17:00:40
   * @description Runtime构造函数
   * @param {Engine} engine
   * @param {ClassRuntime.Router.RouteRaw[]} routes
   */
  constructor(engine:Engine, routes?:ClassRuntime.Router.RouteRaw[]) {
    routes&&(this.routes=routes);
    this.engine=engine;
    this.engine.$on('init', ()=>{
      nextTick(()=>{
        this.init();
      }, this);
    });
  }
  /**
   * @author Gems
   * @date 2021/12/11 17:03:02
   * @description 运行时初始化
   */
  private init() {
    if (!this.routes.length) throw Error('At least one route is required');
    const [fistPage] = this.routes;
    this.renderClear();
    this.render(fistPage);
  };
  /**
   * @author Gems
   * @date 2021/12/11 20:07:16
   * @description 渲染方法
   * @param {ClassRuntime.Router.RouteRaw} page
   */
  private render(page:ClassRuntime.Router.RouteRaw) {
    const renderDataRaw = page.component.setup();
    this.engine.singleRender(renderDataRaw);
  }
  /**
   * @author Gems
   * @date 2021/12/11 22:26:26
   * @description 清空
   */
  private renderClear() {
    console.clear();
  }
  /**
   * @author Gems
   * @date 2021/12/11 17:05:34
   * @description 静态载入方法
   */
  static install(...rest:[Engine, ClassRuntime.Router.RouteRaw[]]) {
    new Runtime(...rest);
  }
}

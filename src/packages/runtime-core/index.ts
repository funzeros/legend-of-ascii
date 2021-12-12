import { nextTick } from '@/utils';
import { Engine } from '@loa';
import { SetupOption } from '@compiler';
/**
 * @author Gems
 * @date 2021/12/11 16:59:07
 * @description 游戏运行时
 */
export class Runtime {
  private engine: Engine;
  private routes: ClassRuntime.Router.RouteRaw[] = [];
  private route?: ClassRuntime.Router.RouteRaw;
  private routeActionPool = new Map<ClassRuntime.Router.RouteName, LFn[]>();
  private renderDataRaw?: ClassRenderer.Constructor.Options;
  /**
   * @author Gems
   * @date 2021/12/11 17:00:40
   * @description Runtime构造函数
   * @param {Engine} engine
   * @param {ClassRuntime.Router.RouteRaw[]} routes
   */
  constructor(engine: Engine, routes?: ClassRuntime.Router.RouteRaw[]) {
    routes && (this.routes = routes);
    this.engine = engine;
    this.engine.$on('init', () => {
      nextTick(() => {
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
  }
  /**
   * @author Gems
   * @date 2021/12/11 20:07:16
   * @description 渲染方法
   * @param {ClassRuntime.Router.RouteRaw} page
   */
  private render(page: ClassRuntime.Router.RouteRaw) {
    // TODO: 再次执行时需要销毁上次route 并执行响应销毁方法 生命周期还没写完
    this.route = page;
    const setupCtx: SetupOption = {
      props: {},
      ctx: this,
    };
    this.renderDataRaw = page.component.setup(setupCtx);
    this.engine.singleRender(this.renderDataRaw!);
  }
  /**
   * @author Gems
   * @date 2021/12/12 16:35:10
   * @description 重新渲染
   */
  private rerender() {
    this.renderClear();
    this.engine.singleRender(this.renderDataRaw!);
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
   * @date 2021/12/12 15:26:15
   * @description 键盘事件绑定
   * @param {ClassEngine.ActionKey}action
   * @param {LFn}callback
   * @param {boolean}isRerender
   */
  public actionOn(
    action: ClassEngine.ActionKey,
    callback: LFn<[ClassEngine.ActionEvent]>,
    isRerender: boolean = true,
  ) {
    const routeName = this.route?.name ?? '';
    if (!routeName) return;
    const overrideCallback = () => {
      callback();
      isRerender && this.rerender();
    };
    if (this.routeActionPool.has(routeName))
      this.routeActionPool.get(routeName)?.push(overrideCallback);
    else this.routeActionPool.set(routeName, [overrideCallback]);
    this.engine.$on(action, overrideCallback);
  }
  // TODO:务必完成路由生命周期和事件自动卸载，否则可能导致事件重复绑定
  /**
   * @author Gems
   * @date 2021/12/11 17:05:34
   * @description 静态载入方法
   */
  static install(...rest: [Engine, ClassRuntime.Router.RouteRaw[]]) {
    new Runtime(...rest);
  }
}

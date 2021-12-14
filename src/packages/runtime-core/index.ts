import { isString, nextTick } from '@/utils';
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
  private routeRaw?: ClassRuntime.Router.RouteRaw;
  private routeActionPool = new Map<
    ClassRuntime.Router.RouteName,
    { action: ClassEngine.ActionKey; overrideCallback: LFn }[]
  >();
  private routeHistory: ClassRuntime.Router.RouterOption[] = [];
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
    this.render(fistPage, { name: fistPage.name });
  }
  /**
   * @author Gems
   * @date 2021/12/13 22:41:55
   * @description 通过路由名称获取路由
   * @param {ClassRuntime.Router.RouterOption} realOpt
   */
  private renderByRouteOpt(
    realOpt: ClassRuntime.Router.RouterOption,
  ): ClassRuntime.Router.RouteRaw | void {
    this.routerClear();
    const item = this.routes.find(({ name }) => {
      return name === realOpt.name;
    });
    if (item) {
      this.render(item, realOpt);
    } else {
      console.error('Route is 404');
    }
  }
  /**
   * @author Gems
   * @date 2021/12/13 22:07:54
   * @description 路由前进
   * @param {string|ClassRuntime.Router.RouterOption}opt
   */
  private routerPush(opt: string | ClassRuntime.Router.RouterOption) {
    let realOpt = opt as ClassRuntime.Router.RouterOption;
    if (isString(opt)) realOpt = { name: opt as string };
    if (realOpt.name === this.routeRaw?.name) {
      console.warn('Invalid duplicate name jump');
      return;
    }
    this.renderByRouteOpt(realOpt);
  }
  /**
   * @author Gems
   * @date 2021/12/13 22:33:08
   * @description 路由返回
   */
  private routerBack() {
    if (this.routeHistory.length < 2) {
      console.warn('This is the last route');
      return;
    }
    this.routeHistory.pop();
    const lastOne = this.routeHistory.pop() as ClassRuntime.Router.RouterOption;
    this.renderByRouteOpt(lastOne);
  }
  /**
   * @author Gems
   * @date 2021/12/13 22:13:42
   * @description 清楚当前路由
   */
  private routerClear() {
    this.renderClear();
    this.actionClear();
  }
  /**
   * @author Gems
   * @date 2021/12/11 20:07:16
   * @description 渲染方法
   * @param {ClassRuntime.Router.RouteRaw} page
   * @param {ClassRuntime.Router.RouterOption} route
   */
  private render(
    page: ClassRuntime.Router.RouteRaw,
    route: ClassRuntime.Router.RouterOption,
  ) {
    this.routeRaw = page;
    this.routeHistory.push(route);
    const setupCtx: SetupOption = {
      props: {},
      ctx: this,
      router: {
        push: this.routerPush.bind(this),
        back: this.routerBack.bind(this),
      },
      route,
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
    callback: LFn<ClassEngine.ActionEvent>,
    isRerender: boolean = true,
  ) {
    const routeName = this.routeRaw?.name ?? '';
    if (!routeName) return;
    const overrideCallback = (actionEvent: ClassEngine.ActionEvent) => {
      callback(actionEvent);
      isRerender && this.rerender();
    };
    if (this.routeActionPool.has(routeName))
      this.routeActionPool.get(routeName)?.push({ action, overrideCallback });
    else this.routeActionPool.set(routeName, [{ action, overrideCallback }]);
    this.engine.$on(action, overrideCallback);
  }
  /**
   * @author Gems
   * @date 2021/12/13 22:15:22
   * @description 清楚事件
   */
  private actionClear() {
    const routeName = this.routeRaw?.name ?? '';
    if (!routeName) return;
    this.routeActionPool
      .get(routeName)
      ?.forEach(({ action, overrideCallback }) => {
        this.engine.$off(action, overrideCallback);
      });
  }
  /**
   * @author Gems
   * @date 2021/12/11 17:05:34
   * @description 静态载入方法
   */
  static install(...rest: [Engine, ClassRuntime.Router.RouteRaw[]]) {
    new Runtime(...rest);
  }
}

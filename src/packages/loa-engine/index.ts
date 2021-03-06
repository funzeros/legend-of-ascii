import { Common } from '@common';

/**
 * @author Gems
 * @date 2021/12/11 12:20:22
 * @description 游戏主引擎
 */
export class Engine extends Common {
  private name = '';
  private isDev = false;
  private docs: ClassEngine.Constructor.OptionsDoc = {
    start: '是否开始游戏？',
    isStart: '游戏已开始',
  };
  private isStart = false;
  /**
   * @author Gems
   * @date 2021/12/11 12:20:34
   * @description Engine构造函数
   * @param {ClassEngine.Constructor.Options} options
   */
  constructor(options: ClassEngine.Constructor.Options) {
    super();
    (options as unknown as Object<ClassEngine.Constructor.Options>).forEach(
      (v, k) => {
        this[k] = v as never;
      },
    );
  }
  /**
   * @author Gems
   * @date 2021/12/11 12:20:40
   * @description 暴露给window的对象
   * @return {ClassEngine.LoaExpose}
   */
  public expose(): ClassEngine.LoaExpose {
    const { name, start } = this;
    return {
      name,
      start: start.bind(this),
    };
  }
  /**
   * @author Gems
   * @date 2021/12/11 12:39:50
   * @description 开始游戏的命令
   * @return {void}
   */
  public start(): void {
    if (this.isStart) return console.warn(this.docs.isStart);
    if (this.isDev) return this.init();
    this.confirm(this.docs.start, () => {
      this.init();
    });
  }
  /**
   * @author Gems
   * @date 2021/12/11 14:17:18
   * @description 游戏引擎初始化
   */
  private init() {
    if (this.isStart) return;
    this.isStart = true;
    this.$emit('init');
    this.actionInit();
  }
  /**
   * @author Gems
   * @date 2021/12/11 17:18:51
   * @description 扩展插件
   * @param {ClassEngine.Plugin} plugin
   * @return {Engine}
   */
  public use(plugin: ClassEngine.Plugin, ...rest: any[]): Engine {
    plugin.install(this, ...rest);
    return this;
  }
  /**
   * @author Gems
   * @date 2021/12/11 19:53:07
   * @description 默认单渲染方法
   * @description 会被Runtime调用
   * @description 可被重载
   * @param {ClassRenderer.Constructor.Options} option
   */
  public singleRender(option: ClassRenderer.Constructor.Options) {
    console.log(JSON.stringify(option));
    console.warn('Make sure the renderer is mounted?');
  }

  // 全局事件总线
  private eventPool = new Map<ClassEngine.EventPoolKey, LFn[]>();
  /**
   * @author Gems
   * @date 2021/12/11 20:24:29
   * @description 添加事件监听
   * @param {ClassEngine.EventPoolKey} key
   * @param {LFn} callback
   */
  public $on(key: ClassEngine.EventPoolKey, callback: LFn) {
    if (this.eventPool.has(key)) this.eventPool.get(key)?.push(callback);
    else this.eventPool.set(key, [callback]);
  }
  /**
   * @author Gems
   * @date 2021/12/11 20:31:15
   * @description 移除事件监听
   * @param {ClassEngine.EventPoolKey} key
   * @param {LFn} callback
   */
  public $off(key: ClassEngine.EventPoolKey, callback: LFn) {
    this.eventPool.set(
      key,
      this.eventPool.get(key)?.filter((m) => m !== callback) ?? [],
    );
  }
  /**
   * @author Gems
   * @date 2021/12/11 20:31:29
   * @description 触发事件监听
   * @param {ClassEngine.EventPoolKey} key
   */
  public $emit(key: ClassEngine.EventPoolKey, ...rest: any[]) {
    this.eventPool.get(key)?.forEach((m) => {
      m(...rest);
    });
  }

  // 键盘事件管理Action
  private actionDisabled = false;

  protected readonly actionKeyDcitMap: LObj<ClassEngine.ActionKey> = {
    ['ArrowUp'.toUpperCase()]: 'select',
    ['ArrowDown'.toUpperCase()]: 'select',
    ['ArrowLeft'.toUpperCase()]: 'select',
    ['ArrowRight'.toUpperCase()]: 'select',
    ['w'.toUpperCase()]: 'select',
    ['s'.toUpperCase()]: 'select',
    ['a'.toUpperCase()]: 'select',
    ['d'.toUpperCase()]: 'select',
    [' '.toUpperCase()]: 'confirm',
    ['enter'.toUpperCase()]: 'confirm',
  };
  protected readonly availableKeys = Object.keys(this.actionKeyDcitMap);
  /**
   * @author Gems
   * @date 2021/12/12 14:26:58
   * @description 键盘事件初始化
   */
  public actionInit() {
    this.actionDisabled = false;
    document.documentElement.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.actionDisabled) return;
      const actionKey = e.key.toUpperCase();
      const command = this.actionKeyDcitMap[actionKey];
      if (command) {
        const { ctrlKey, shiftKey, altKey } = e;
        this.$emit(command, {
          key: actionKey,
          command,
          ctrlKey,
          shiftKey,
          altKey,
        });
      }
    });
  }
}

import {isArray} from '@/utils';
import {Engine} from '../loa-engine';

/**
 * @author Gems
 * @date 2021/12/11 15:18:39
 * @description 渲染器
 */
export class Renderer {
  /**
   * @author Gems
   * @date 2021/12/11 16:46:58
   * @description 渲染条目数组
   */
  private entities: ClassRenderer.Constructor.RendererOption[] = [];

  /**
   * @author Gems
   * @date 2021/12/11 15:21:47
   * @description Renderer构造函数
   * @param {ClassRenderer.Constructor.Option} options
   */
  constructor(options: ClassRenderer.Constructor.Options) {
    isArray(options) ||
      (options = [options as ClassRenderer.Constructor.RendererOption]);
    this.entities = options as ClassRenderer.Constructor.RendererOption[];
    this.render();
  }
  /**
   * @author Gems
   * @date 2021/12/11 16:50:03
   * @description console渲染
   */
  private render() {
    this.entities.forEach((m) => {
      this[`_render_${m.type ?? 'info'}`](m.element);
    });
  }
  /**
   * @author Gems
   * @date 2021/12/11 21:44:25
   * @description 解析样式
   * @param {ClassRenderer.RendererStyl} styleObj
   * @return {string}
   */
  private resolveStyle(styleObj?:ClassRenderer.RendererStyle):string {
    if (!styleObj) return '';
    return (styleObj as unknown as Object<ClassRenderer.RendererStyle>).map((v, k)=>{
      return `${k.toKebabCase()}:${v};`;
    }).join('');
  }
  /**
   * @author Gems
   * @date 2021/12/11 20:53:03
   * @description info渲染
   * @param {ClassRenderer.RendererElement} element
   */
  private _render_info(element: ClassRenderer.RendererElement) {
    const styleList:string[] = [];
    let text = '';
    element.forEach((el)=>{
      text+=`%c${el.content}`;
      styleList.push(this.resolveStyle(el.style));
    });
    console.info(text, ...styleList);
  }
  /**
   * @author Gems
   * @date 2021/12/11 20:53:08
   * @description table渲染
   * @param {ClassRenderer.RendererElement} element
   */
  private _render_table(element: ClassRenderer.RendererElement) {
    console.table(element);
  }
  /**
   * @author Gems
   * @date 2021/12/11 16:47:31
   * @description 静态创建方法
   * @param {ClassRenderer.Constructor.Options} options
   * @return {Renderer}
   */
  static create(options: ClassRenderer.Constructor.Options): Renderer {
    return new Renderer(options);
  }
  /**
   * @author Gems
   * @date 2021/12/11 19:50:32
   * @description 静态载入方法
   */
  static install(...rest: [Engine]) {
    const [engine] = rest;
    engine.singleRender = Renderer.create as any;
  }
}

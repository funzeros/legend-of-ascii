import { isArray } from '@/utils';
import { Runtime } from '@runtime';

export interface SetupOption {
  props: LObj;
  ctx: Runtime | null;
}
type DefineComponentReturn = {
  name?: string;
  setup(opt: SetupOption): ClassRenderer.Constructor.Options;
  injectComponent(
    opt?: Partial<SetupOption>,
  ): ClassRenderer.Constructor.RendererOption[];
};
type DefineComponentOption = Omit<DefineComponentReturn, 'injectComponent'>;

/**
 * @author Gems
 * @date 2021/12/12 13:14:33
 * @description 合并setup参数
 * @param {object} otp
 * @return {SetupOption}
 */
const getSetupOption = (otp?: Partial<SetupOption>): SetupOption => {
  return {
    props: {},
    ctx: null,
    ...otp,
  };
};

/**
 * @author Gems
 * @date 2021/12/12 15:55:52
 * @description 获取渲染树
 * @param {ClassRenderer.Constructor.Options}renderOpt
 * @return {ClassRenderer.Constructor.RendererOption[]}
 */
export const getRenderOpt = (
  renderOpt: ClassRenderer.Constructor.Options,
): ClassRenderer.Constructor.RendererOption[] => {
  let realEntities = renderOpt() as ClassRenderer.Constructor.RendererOption[];
  if (!isArray(realEntities))
    realEntities = [
      realEntities as unknown as ClassRenderer.Constructor.RendererOption,
    ];
  return realEntities;
};
/**
 * @author Gems
 * @date 2021/12/11 18:59:28
 * @description defineComponent
 * @param {DefineComponentOption} options
 * @return {DefineComponentReturn}
 */
export const defineComponent = (
  options: DefineComponentOption,
): DefineComponentReturn => {
  return {
    ...options,
    injectComponent(otp): ClassRenderer.Constructor.RendererOption[] {
      const renderOpt = options.setup.call(this, getSetupOption(otp));
      return getRenderOpt(renderOpt);
    },
  };
};

/**
 * @author Gems
 * @date 2021/12/12 13:15:19
 * @description 获取组件属性
 */

export const defineProps = <T extends LObj>(ctx: SetupOption): T => {
  return ctx.props as T;
};

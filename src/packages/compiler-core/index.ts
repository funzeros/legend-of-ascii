export type DefineComponentOption ={
  name?:string,
  setup:()=>ClassRenderer.Constructor.Options
}
/**
 * @author Gems
 * @date 2021/12/11 18:59:28
 * @description defineComponent
 * @param {object} options
 * @return {DefineComponentOption}
 */
export const defineComponent = (options:DefineComponentOption): DefineComponentOption=>{
  return options;
};

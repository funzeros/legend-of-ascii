declare module ClassRenderer {
  namespace Constructor {
    interface RendererOption {
      element: RendererElement;
      type?: RendererType;
    }
    type Options = (...p: any) => RendererOption | RendererOption[];
    type OptionsArr = (...p: any) => RendererOption[];
  }
  /**
   * @author Gems
   * @date 2021/12/11 16:34:43
   * @description console样式属性
   */
  enum EnumRendererStyle {
    fontSize,
    fontWeight,
    lineHeight,
    fontFamily,
    textShadow,
    color,
    background,
    backgroundColor,
    backgroundImage,
    padding,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    borderRadius,
    textAlign,
  }
  type RendererStyle = Partial<{
    [K in keyof typeof EnumRendererStyle]: string | number;
  }>;
  type RendererElementItem = {
    content: strnum;
    style?: RendererStyle;
    type?: 'div';
  };
  type RendererElement = RendererElementItem[];
  enum EnumConsole {
    info,
    table,
  }
  type RendererType = keyof typeof EnumConsole;
}

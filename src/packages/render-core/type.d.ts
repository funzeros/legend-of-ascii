declare module ClassRenderer {
  namespace Constructor {
    interface RendererOption {
      element: RendererElement;
      type?: RendererType;
    }
    type Options = () => RendererOption | RendererOption[];
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
  }
  type RendererStyle = Partial<{
    [K in keyof typeof EnumRendererStyle]: string | number;
  }>;
  type RendererElement = {
    content: string;
    style?: RendererStyle;
  }[];
  enum EnumConsole {
    info,
    table,
  }
  type RendererType = keyof typeof EnumConsole;
}

import { FontFamily } from './styles';

export const loaml = {
  br: {
    content: '\r\n',
  },
  div(
    content: string,
    style?: ClassRenderer.RendererStyle,
  ): ClassRenderer.RendererElementItem {
    return {
      content,
      style,
      type: 'div',
    };
  },
  view(
    content: string,
    style?: ClassRenderer.RendererStyle,
  ): ClassRenderer.RendererElementItem {
    return {
      content,
      style: {
        fontFamily: FontFamily['sans-serif'],
        ...style,
      },
      type: 'div',
    };
  },
  span(
    content: string,
    style?: ClassRenderer.RendererStyle,
  ): ClassRenderer.RendererElementItem {
    return {
      content,
      style,
    };
  },
  text(
    content: string,
    style?: ClassRenderer.RendererStyle,
  ): ClassRenderer.RendererElementItem {
    return {
      content,
      style: {
        fontFamily: FontFamily['sans-serif'],
        ...style,
      },
    };
  },
  row(
    ...element: ClassRenderer.RendererElement
  ): ClassRenderer.Constructor.RendererOption {
    return {
      element: element.reduce((acc, cur, i) => {
        if (cur.type === 'div') {
          if (i > 0 && element[i - 1].type !== 'div') acc.push(loaml.br);
          acc.push(cur, loaml.br);
        } else {
          acc.push(cur);
        }
        return acc;
      }, [] as ClassRenderer.RendererElement),
      type: 'info',
    };
  },
};

const { br, span, div, view, text, row } = loaml;

export { br, span, div, view, text, row };

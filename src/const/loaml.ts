import { FontFamily } from './styles';

export const loaml = {
  br: {
    content: '\r\n',
  },
  div(
    content: strnum,
    style?: ClassRenderer.RendererStyle,
  ): ClassRenderer.RendererElementItem {
    return {
      content,
      style,
      type: 'div',
    };
  },
  view(
    content: strnum,
    style?: ClassRenderer.RendererStyle,
  ): ClassRenderer.RendererElementItem {
    return {
      content,
      style: {
        fontFamily: FontFamily.default,
        ...style,
      },
      type: 'div',
    };
  },
  span(
    content: strnum,
    style?: ClassRenderer.RendererStyle,
  ): ClassRenderer.RendererElementItem {
    return {
      content,
      style,
    };
  },
  text(
    content: strnum,
    style?: ClassRenderer.RendererStyle,
  ): ClassRenderer.RendererElementItem {
    return {
      content,
      style: {
        fontFamily: FontFamily.default,
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

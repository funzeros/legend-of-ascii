import { span, row, text } from '@/const/loaml';
import { Color, FontFamily } from '@/const/styles';
import { defineComponent } from '@/packages/compiler-core';

export default defineComponent({
  name: 'Tips',
  setup($) {
    return ({ msg }) =>
      row(
        span('Tips:', {
          fontWeight: 900,
          backgroundColor: Color.中灰绿,
          color: Color.白,
          padding: '2px 4px',
          marginRight: '4px',
          borderRadius: '4px',
        }),
        text(msg, {
          backgroundColor: Color.浅灰,
          color: Color.淡淡的黄,
          padding: '2px 10px',
          marginRight: '10px',
          borderRadius: '4px',
          fontFamily: FontFamily['sans-serif'],
        }),
      );
  },
});

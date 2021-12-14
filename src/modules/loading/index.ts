import tips from '@/components/tips';
import { GAME } from '@/const/default';
import { span, row, text, div, view, br } from '@/const/loaml';
import { defineComponent } from '@/packages/compiler-core';

export default defineComponent({
  name: 'Loading',
  setup({ ctx, router }) {
    const tipsComp = tips.injectComponent();
    let count = 1;
    ctx?.actionOn('select', () => {
      count++;
    });
    ctx?.actionOn(
      'confirm',
      () => {
        router.push({
          name: 'home',
          query: {
            count,
          },
        });
      },
      false,
    );
    return () => [
      row(
        div(GAME.NAME, {
          fontSize: '40px',
          fontWeight: '900',
          textShadow: '2px 2px 4px #667733',
          color: '#ffeecc',
        }),
        view(`[${GAME.NAME_ZH}]`, {
          fontSize: '40px',
          fontWeight: '900',
          textShadow: '2px 2px 4px #667733',
          color: '#ffee99',
        }),
        br,
        span(`按方向键增大这里的数字`),
        span(`${count}`, { fontSize: '60px' }),
      ),
      row(
        span(' ', {
          padding: '4px',
          paddingLeft: '10px',
          paddingRight: '10px',
          marginRight: '10px',
          fontSize: '0',
          backgroundColor: '#0099ff',
          borderRadius: '4px',
        }),
        text('冒险开始', {
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '900',
          color: '#313131',
        }),
      ),
      ...tipsComp({
        msg: '请按下Enter/Space开始冒险，若无效请先单击网页空白处',
      }),
    ];
  },
});

import tips from '@/components/tips';
import { GAME } from '@/const/default';
import { FontFamily } from '@/const/styles';
import { defineComponent } from '@/packages/compiler-core';

export default defineComponent({
  name: 'Loading',
  setup({ ctx }) {
    let count = 1;
    ctx?.actionOn('confirm', () => {
      count++;
    });
    return () => [
      {
        element: [
          {
            content: GAME.NAME,
            style: {
              fontSize: '40px',
              fontWeight: '900',
              textShadow: '2px 2px 4px #667733',
              color: '#ffeecc',
            },
          },
          {
            content: `[${GAME.NAME_ZH}]${count}`,
            style: {
              fontFamily: FontFamily['sans-serif'],
              fontSize: '40px',
              fontWeight: '900',
              textShadow: '2px 2px 4px #667733',
              color: '#ffee99',
            },
          },
        ],
      },
      {
        element: [
          {
            content: ' ',
            style: {
              padding: '4px',
              paddingLeft: '10px',
              paddingRight: '10px',
              marginRight: '10px',
              fontSize: '0',
              backgroundColor: '#0099ff',
              borderRadius: '4px',
            },
          },
          {
            content: '冒险开始',
            style: {
              textAlign: 'center',
              fontFamily: FontFamily['sans-serif'],
              fontSize: '24px',
              fontWeight: '900',
              color: '#313131',
            },
          },
        ],
      },
      ...tips.injectComponent({
        props: {
          value: '请按下Enter开始冒险，若无效请先单击网页空白处',
        },
      }),
    ];
  },
});

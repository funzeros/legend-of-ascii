import {GAME} from '@/const/default';
import {defineComponent} from '@compiler';

export default defineComponent({
  name: 'Loading',
  setup() {
    return [
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
            content: `[${GAME.NAME_ZH}]`,
            style: {
              fontFamily: 'sans-serif',
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
              fontFamily: 'sans-serif',
              fontSize: '24px',
              fontWeight: '900',
              color: '#313131',
            },
          }],
      },
    ];
  },
});

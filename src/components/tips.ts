import { FontFamily } from '@/const/styles';
import { defineComponent, defineProps } from '@/packages/compiler-core';

export default defineComponent({
  name: 'Tips',
  setup(opt) {
    const props = defineProps<{ value: string }>(opt);
    return () => ({
      element: [
        {
          content: 'Tips:',
          style: {
            fontWeight: 900,
            backgroundColor: '#778899',
            color: '#fff',
            padding: '2px 4px',
            marginRight: '4px',
            borderRadius: '4px',
          },
        },
        {
          content: props.value,
          style: {
            backgroundColor: '#aaa',
            color: '#ffa',
            padding: '2px 10px',
            marginRight: '10px',
            borderRadius: '4px',
            fontFamily: FontFamily['sans-serif'],
          },
        },
      ],
    });
  },
});

import { br, row, view } from '@/const/loaml';
import { defineComponent } from '@/packages/compiler-core';

export default defineComponent({
  name: 'Home',
  setup({ ctx, router, route }) {
    ctx?.actionOn(
      'confirm',
      () => {
        router.back();
      },
      false,
    );
    return () =>
      row(
        view(`这里是主页传过来的数字${route.query?.count}`, {
          fontSize: '40px',
          fontWeight: '900',
          textShadow: '2px 2px 4px #667733',
          color: '#ffee99',
        }),
        br,
        view(`路由名称${route.name}，按确认键返回上级路由`),
      );
  },
});

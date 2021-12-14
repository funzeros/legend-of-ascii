import commandList, { CommandOptions } from '@/components/command-list';
import { br, row, view } from '@/const/loaml';
import { defineComponent } from '@/packages/compiler-core';

export default defineComponent({
  name: 'Home',
  setup($) {
    const commandListProps: { optionList: CommandOptions } = {
      optionList: Array.from(new Array(50)).map((_, i) => {
        return {
          name: `第${i + 1}个选项撒`,
          fn() {
            alert(`内容：第${i + 1}个选项撒`);
          },
        };
      }),
    };
    const commandListComp = commandList.injectComponent({
      ...$,
      props: commandListProps,
    });
    return () => [
      row(
        view(`这里是主页传过来的数字${$.route.query?.count}`, {
          fontSize: '40px',
          fontWeight: '900',
          textShadow: '2px 2px 4px #667733',
          color: '#ffee99',
        }),
        br,
        view(`路由名称${$.route.name}`),
      ),
      ...commandListComp(),
    ];
  },
});

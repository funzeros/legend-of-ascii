import commandList, { CommandListProps } from '@/components/command-list';
import { br, row, view } from '@/const/loaml';
import { defineComponent } from '@/packages/compiler-core';
import { useStore } from '@/store';

export default defineComponent({
  name: 'Home',
  setup($) {
    const store = useStore();
    const commandListProps: CommandListProps = {
      optionList: Array.from(new Array(50)).map((_, i) => {
        return {
          name: `第${i + 1}个选项撒`,
        };
      }),
      onselect: (item) => {
        alert(`内容：${item.name}`);
        store.addCount();
      },
    };
    const commandListComp = commandList.injectComponent({
      ...$,
      props: commandListProps,
    });
    return () => [
      row(
        view(
          `这里是主页传过来的数字${$.route.query?.count}\n这是store的count${store.count}`,
          {
            fontSize: '40px',
            fontWeight: '900',
            textShadow: '2px 2px 4px #667733',
            color: '#ffee99',
          },
        ),
        br,
        view(`路由名称${$.route.name}`),
      ),
      ...commandListComp(),
    ];
  },
});

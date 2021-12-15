import { text, row } from '@/const/loaml';
import { Color } from '@/const/styles';
import {
  defineComponent,
  defineProps,
  SetupOption,
} from '@/packages/compiler-core';
import tips from './tips';
export default defineComponent({
  name: 'CommandList',
  setup($) {
    const tipsComp = tips.injectComponent();
    const size = 9;
    let current = 1;
    const props = defineProps<CommandListProps>($);
    const total = Math.ceil(props.optionList.length / size);
    const getRenderList = () => {
      return props.optionList.slice((current - 1) * size, current * size);
    };
    $.ctx?.actionOn('select', (e) => {
      if (['ARROWLEFT', 'A'].includes(e.key)) return current > 1 && --current;
      if (['ARROWRIGHT', 'D'].includes(e.key))
        return current < total && ++current;
      const item = getRenderList()[+e.key - 1];
      if (!item) return;
      props.onselect && props.onselect(item, $, e);
    });
    return () => {
      const renderList = getRenderList();
      const hasPagination = props.optionList.length > size;
      return [
        ...renderList.map((m, i) => {
          return row(
            text(i + 1, {
              fontSize: '16px',
              backgroundColor: Color.中灰绿,
              color: Color.白,
              padding: '0px 4px',
              marginRight: '6px',
              borderRadius: '4px',
            }),
            text(m[props.labelName || 'name'], {
              fontSize: '14px',
              color: Color.深灰,
            }),
          );
        }),
        ...(hasPagination
          ? [
              row(
                text(`页码【${current}/${total}】`, {
                  fontWeight: 900,
                  fontSize: '14px',
                  color: Color.深灰绿,
                  padding: '2px 4px',
                  margin: '6px',
                  borderRadius: '4px',
                }),
              ),
            ]
          : []),
        ...tipsComp({
          msg: '使用[1-9]选择选项，使用[←][→]或[a][d]切换分页',
        }),
      ];
    };
  },
});

export interface CommandOption {
  name: string;
  describe?: string;
  [k: string]: any;
}
export type CommandOptions = CommandOption[];

export type CommandListProps = {
  optionList: CommandOptions;
  labelName?: string;
  onselect: (
    item: CommandOption,
    $: SetupOption,
    e: ClassEngine.ActionEvent,
  ) => void;
};

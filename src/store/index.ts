import { defineStore } from '@loax';

// 这里类型提示写不出来了 但是使用的时候有类型提示
export const useStore = defineStore('main', {
  state() {
    return {
      count: 0,
    };
  },
  actions: {
    addCount() {
      this.count++;
    },
  },
});

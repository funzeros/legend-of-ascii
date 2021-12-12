/* eslint-disable require-jsdoc */
const callbacks: Function[] = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

const p = Promise.resolve();
const microTimerFunc = () => {
  p.then(flushCallbacks);
};

export function nextTick(cb: Function, ctx: any) {
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx);
    }
  });
  if (!pending) {
    pending = true;
    microTimerFunc();
  }
}

export const useAntiShake = () => {
  const antiShake: LObj = {
    delayFlag: true,
    holdTimer: null,
    reHoldTimer: null,
    holdFlag: true,
  };
  const delayAS = (cb: LFn, delay = 3000) => {
    if (antiShake.delayFlag) {
      antiShake.delayFlag = false;
      cb();
      setTimeout(() => {
        antiShake.delayFlag = true;
      }, delay);
    }
  };
  const holdAS = (cb: LFn, delay = 1000) => {
    clearTimeout(antiShake.holdTimer);
    if (antiShake.holdFlag) {
      antiShake.holdFlag = false;
      cb();
    }
    antiShake.holdTimer = setTimeout(() => {
      antiShake.holdFlag = true;
    }, delay);
  };
  const reholdAS = (cb: LFn, delay = 1000) => {
    clearTimeout(antiShake.reHoldTimer);
    antiShake.reHoldTimer = setTimeout(() => {
      cb();
    }, delay);
  };
  return {
    delayAS,
    holdAS,
    reholdAS,
  };
};

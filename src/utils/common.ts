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

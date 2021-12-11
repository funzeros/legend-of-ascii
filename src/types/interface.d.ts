interface LObj<T = any> {
  [K: string]: T;
  [K: number]: T;
}

type LFn = <T extends any[] = any[], U=any>(...p:T[])=>U|void

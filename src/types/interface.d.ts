interface LObj<T = any> {
  [K: string]: T;
  [K: number]: T;
}

type LFn<T = any, U = any> = (...p: T[]) => U | void;

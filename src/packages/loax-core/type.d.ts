declare module ClassLoax {
  type _StoreState = LObj;
  type _StoreAction = (this: any) => any;
  type _StoreActions = LObj<_StoreAction>;
  interface DefineStoreOptions<S extends _StoreState, A extends _StoreActions> {
    state: () => S;
    actions: A;
  }
}

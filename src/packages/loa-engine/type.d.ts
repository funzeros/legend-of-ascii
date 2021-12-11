declare module ClassEngine {
  namespace Constructor {
    interface Options {
      name: string;
      isDev?: boolean;
      docs?:Partial<OptionsDoc>
    }
    interface OptionsDoc{
      start:string
    }
  }
  interface LoaExpose {
    [K: string]: any;
  }
  interface Plugin extends LObj {
      install:(...rest:any[])=>void
  }
  enum EnumEventPool {
    init
  }
  type EventPoolKey =keyof typeof EnumEventPool;
}

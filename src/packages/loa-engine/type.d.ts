declare module ClassEngine {
  namespace Constructor {
    interface Options {
      name: string;
      isDev?: boolean;
      docs?: Partial<OptionsDoc>;
    }
    interface OptionsDoc {
      start: string;
      isStart: string;
    }
  }
  interface LoaExpose {
    [K: string]: any;
  }
  interface Plugin extends LObj {
    install: (...rest: any[]) => void;
  }
  type ActionKey = 'select' | 'confirm';
  interface ActionEvent {
    key: string;
    command: string;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
  }
  enum EnumEventPool {
    init,
  }
  type EventPoolKey = keyof typeof EnumEventPool | ActionKey;
}

declare interface RunTimeProcess {
  env: {
    BASE_URL: string;
    IS_DEV: boolean;
  };
}
declare const process: RunTimeProcess;

declare interface Window {
  loa: ClassEngine.LoaExpose;
}

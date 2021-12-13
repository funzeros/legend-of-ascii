declare interface RunTimeProcess {
  env: {
    LOA_BASE_URL: string;
    LOA_IS_DEV: boolean;
  };
}
declare const process: RunTimeProcess;

declare interface Window {
  loa: ClassEngine.LoaExpose;
}

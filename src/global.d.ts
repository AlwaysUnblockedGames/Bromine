declare global {

  interface Window {
    __uv$config: any;
    $scramjetLoadController: () => { ScramjetController: any };
  }


  interface TransportOptions {
    epoxy: string;
    libcurl: string;
  }
  type Transport = keyof TransportOptions;
}

export { };

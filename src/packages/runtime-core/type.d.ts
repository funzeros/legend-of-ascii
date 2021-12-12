declare module ClassRuntime {
  namespace Router {
    type RouteName = string | number | symbol;
    interface RouteRaw {
      name: RouteName;
      component: any;
    }
  }
}

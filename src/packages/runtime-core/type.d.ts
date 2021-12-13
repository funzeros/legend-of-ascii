declare module ClassRuntime {
  namespace Router {
    type RouteName = string;
    interface RouteRaw {
      name: RouteName;
      component: any;
    }
    interface RouterOption {
      name: RouteName;
      query?: LObj;
    }
  }
}

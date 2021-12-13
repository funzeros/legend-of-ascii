import home from '@/modules/home';
import loading from '@/modules/loading/index';

export const routeList: ClassRuntime.Router.RouteRaw[] = [
  {
    name: 'loading',
    component: loading,
  },
  {
    name: 'home',
    component: home,
  },
];

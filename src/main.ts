import '@/core/extra-prototype';
import { Engine } from '@loa';
import { GAME } from './const/default';
import { Runtime } from './packages/runtime-core';
import { Renderer } from './packages/render-core';
import { routeList } from './router';

const game = new Engine({
  name: GAME.NAME,
  isDev: process.env.IS_DEV,
});

game.use(Runtime, routeList).use(Renderer).start();

window.loa = game.expose();

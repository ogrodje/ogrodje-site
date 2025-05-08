import {createRouter, createWebHistory} from 'vue-router';
import Meetups from './Meetups.vue';
import Events from './Events.vue';

const routes = [
  {path: '/', redirect: '/meetups'},
  {path: '/meetups', component: Meetups},
  {path: '/events', component: Events},
]

/*
export const router = createRouter({
  history: createWebHistory('/admin'),
  routes: [],
});
*/

const initRouter = () => {
  const history = createWebHistory('/admin')
  return createRouter({ history, routes })
}

export { initRouter }

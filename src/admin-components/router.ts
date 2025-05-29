import {createRouter, createWebHistory} from 'vue-router';
import Meetups from './Meetups.vue';
import Events from './Events.vue';

const routes = [
  {name: 'home', path: '/', redirect: 'events'},
  {name: 'meetups', path: '/meetups', component: Meetups},
  {name: 'events', path: '/events', component: Events},
]

const initRouter = () => {
  const history = createWebHistory('/admin')
  return createRouter({
    history, routes
  })
}

export {initRouter}

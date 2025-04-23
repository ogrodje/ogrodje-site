import {createRouter, createWebHistory} from 'vue-router';
import Meetups from './Meetups.vue';
import Events from './Events.vue';

export const router = createRouter({
  history: createWebHistory('/admin'),
  routes: [
    {path: '/', redirect: '/meetups'},
    {path: '/meetups', component: Meetups},
    {path: '/events', component: Events},
  ],
});

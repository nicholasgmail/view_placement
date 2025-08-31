import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import Map from '@/views/Map.vue';
import ItemDetails from '@/views/ItemDetails.vue';

const routes = [
  {
    path: '/',          
    name: 'Home',
    component: Home,
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
  },
  {
    path: '/items/:id',
    name: 'item-details',
    component: ItemDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

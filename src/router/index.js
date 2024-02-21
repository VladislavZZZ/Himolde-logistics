
import { createRouter, createWebHistory } from 'vue-router'
import Books from '../components/Books.vue'
import Ping from '../components/Ping.vue'
import Knapsack from '../components/Knapsack.vue'
import MST from '../components/MST.vue'
import TSP from '../components/TSP.vue'
import Location from '../components/Location.vue'
import Transportation from '../components/Transportation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Books',
      component: Books,
    },
    {
      path: '/ping',
      name: 'ping',
      component: Ping
    },
    {
      path: '/TSP',
      name: 'TSP',
      component: TSP
    },
    {
      path: '/Transportation',
      name: 'Transportation',
      component: Transportation
    },
    {
      path: '/MST',
      name: 'MST',
      component: MST
    },
    {
      path: '/Knapsack',
      name: 'Knapsack',
      component: Knapsack
    },
    {
      path: '/Location',
      name: 'Location',
      component: Location
    },
  ]
})

export default router
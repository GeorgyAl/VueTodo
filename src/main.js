import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'

import Completed from './Completed.vue'
import List from './List.vue'

const routes = [
    { name: 'List', path: '/', component: List},
    { name:'Complete', path: '/complete', component: Completed },
  ]
  
const router = createRouter({
    history: createWebHistory(),
    routes
  })


createApp(App)
    .use(router)
    .mount('#app')

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Players from '@/components/Players'
import Words from '@/components/Words'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/players',
      name: 'Players',
      component: Players
    },
    {
      path: '/words',
      name: 'Words',
      component: Words
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    }
  ]
})

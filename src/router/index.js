import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Players from '@/components/Players'
import Words from '@/components/Words'
import Game from '@/components/Game'

Vue.use(Router)

const router = new Router({
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

router.beforeEach((to, from, next) => {
  if (to.name === 'Words' && from.name === 'Game') {
    var r = confirm('Are you sure you want to leave and lose game data?')
    if (r === true) {
      next()
    } else {
      next(false)
    }
  } else next()
})

export default router

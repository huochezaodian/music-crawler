import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/components/music'
import HotMusic from '@/components/hotMusic'
import NewMusic from '@/components/newMusic'
import SearchMusic from '@/components/searchMusic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Music',
      component: Music
    },
    {
      path: '/hot',
      name: 'HotMusic',
      component: HotMusic
    },
    {
      path: '/new',
      name: 'NewMusic',
      component: NewMusic
    },
    {
      path: '/search',
      name: 'SearchMusic',
      component: SearchMusic
    }
  ]
})

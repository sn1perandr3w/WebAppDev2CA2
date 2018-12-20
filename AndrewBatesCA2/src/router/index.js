import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import AboutUs from '@/components/AboutUs'
import ContactUs from '@/components/ContactUs'
import Tournaments from '@/components/Tournaments'

import Participants from '@/components/Participants'

import CreateTournament from '@/components/CreateTournament'
import CreateAccount from '@/components/CreateAccount'
import Accounts from '@/components/Accounts'
import Account from '@/components/Account'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/contact',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/tournaments',
      name: 'Tournaments',
      component: Tournaments
    },
    {
      path: '/createTournament',
      name: 'CreateTournament',
      component: CreateTournament
    },
    {
      path: '/createAccount',
      name: 'CreateAccount',
      component: CreateAccount
    },
    {
      path: '/participants',
      name: 'Participants',
      component: Participants,
      props: true
    },

    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

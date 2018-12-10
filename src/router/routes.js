import { Guest } from '../middleware/Guest'
import { Authenticated } from '../middleware/Authenticated'
import { HasAnOrganization } from '../middleware/HasAnOrganization'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MyLayout'),
    children: [
      {
        path: '/',
        name: 'home',
        components: {
          header: () => import('../components/Example/Index/ExExampleIndexPageNavbar'),
          default: () => import('../components/Example/Index/ExExampleIndexPage.vue')
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

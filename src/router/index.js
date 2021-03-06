import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Project from '../views/Project.vue'
import AddProject from '../views/AddProject'
import ProjectDetail from '../views/ProjectDetail'
import AddItem from '../views/AddItem'

// const originalPush = VueRouter.prototype.push
//    VueRouter.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About
      },
      {
        path: 'project',
        name: 'Project',
        component: Project,
        children: [
          {
            path: 'addProject',
            name: 'AddProject',
            component: AddProject
          },
          {
            path: 'projectDetail',
            name: 'ProjectDetail',
            component: ProjectDetail
          },
          {
            path: 'addItem',
            name: 'AddItem',
            component: AddItem
          }
        ]
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router

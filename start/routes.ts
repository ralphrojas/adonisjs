/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
const ProjectsController = () => import('#controllers/projects_controller')
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// User routes
router.get('/users', [UsersController, 'index'])
router.post('/users', [UsersController, 'store'])
router.get('/users/:id', [UsersController, 'show'])
router.put('/users/:id', [UsersController, 'update'])
router.delete('/users/:id', [UsersController, 'destroy'])

// Project routes
router
  .group(() => {
    router.get('/projects', [ProjectsController, 'index'])
    router.get('/projects/:id', [ProjectsController, 'show'])
    router.put('/projects/:id', [ProjectsController, 'update'])
    router.delete('/projects/:id', [ProjectsController, 'destroy'])
  })
  .use(middleware.sample())

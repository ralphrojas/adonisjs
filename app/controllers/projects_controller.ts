import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'

export default class ProjectsController {
  // async index({ auth }: HttpContext) {
  //   // const user = auth.getUserOrFail()
  //   const projects = await Project.query().where('user_id', user.id)
  //   return projects
  // }

  async index({ response }: HttpContext) {
    const projects = await Project.all()
    return response.json(projects)
  }

  async store({ request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = request.only(['name', 'description'])
    const project = await Project.create({ ...data, userId: user.id })
    return project
  }

  async show({ params, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const project = await Project.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()
    return project
  }

  async update({ params, request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const project = await Project.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()

    const data = request.only(['name', 'description'])
    project.merge(data)
    await project.save()

    return project
  }

  async destroy({ params, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const project = await Project.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()

    await project.delete()
    return { message: 'Project deleted successfully' }
  }
}

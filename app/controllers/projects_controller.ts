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

  async show({ params, response }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    return response.json(project)
  }

  async update({ params, request, response }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['name', 'description'])
    project.merge(data)
    await project.save()
    return response.json(project)
  }

  async destroy({ params, response }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    await project.delete()
    return response.noContent()
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'
import vine from '@vinejs/vine'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.query().preload('projects')
    return response.json(users)
  }

  async store({ request, response }: HttpContext) {
    const data = await createUserValidator.validate(request.body())
    const { projects, ...userData } = data
    const user = await User.create(userData)

    if (projects && projects.length > 0) {
      await user.related('projects').createMany(projects)
      await user.load('projects')
    }

    return response.status(201).json(user)
  }

  async show({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return response.json(user)
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = await updateUserValidator.validate(request.body())
    user.merge(data)
    await user.save()
    return response.json(user)
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.status(204)
  }
}

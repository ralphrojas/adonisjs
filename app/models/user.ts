import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, computed } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import { beforeSave } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column.date()
  declare birthdate: DateTime

  @hasMany(() => Project)
  declare projects: HasMany<typeof Project>

  @computed()
  get age(): number {
    if (!this.birthdate) return 0
    return Math.floor(this.birthdate.diffNow('years').years * -1)
  }

  // @computed()
  // get fullName(): string {
  //   return `${this.firstName} ${this.lastName}`.trim()
  // }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim()
  }

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}

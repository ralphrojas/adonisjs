import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

const emailValidator = vine
  .string()
  .email()
  .unique(async (db, value) => {
    const user = await db.from('users').where('email', value).first()
    return !user
  })

const passwordValidator = vine.string().minLength(8).maxLength(32)
const firstNameValidator = vine.string().trim().minLength(2).maxLength(50)
const lastNameValidator = vine.string().trim().minLength(2).maxLength(50)
const birthdateValidator = vine
  .date({ format: 'yyyy-MM-dd' })
  .before('today')
  .after('1900-01-01')
  .transform((value) => DateTime.fromJSDate(value))

export const createUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: passwordValidator,
    firstName: firstNameValidator,
    lastName: lastNameValidator,
    birthdate: birthdateValidator,
    projects: vine
      .array(
        vine.object({
          name: vine.string().trim().minLength(2).maxLength(100),
          description: vine.string().trim().optional(),
        })
      )
      .optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: emailValidator.optional(),
    password: passwordValidator.optional(),
    firstName: firstNameValidator.optional(),
    lastName: lastNameValidator.optional(),
    birthdate: birthdateValidator.optional(),
  })
)

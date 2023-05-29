import { IUser } from './users.interface'
import { User } from './users.model'
import config from '../../../config/index'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto increment generated id
  const id = await generateUserId()
  user.id = id

  // default student password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new Error('Failed to create user')
  }

  return createdUser
}

export default {
  createUser,
}

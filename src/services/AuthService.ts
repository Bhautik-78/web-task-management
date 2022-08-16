import { Registration } from '../data/types/Registration'
import { UserSetting } from '../data/types/UserSetting'
import AxiosHttpService from './AxiosHttpService'

export const AuthService = {
  fetchCustomUserSettings: (username: string,accessToken: string, language: string): Promise<UserSetting> => {
    return AxiosHttpService.Get(`user/ToT/${encodeURIComponent(username)}`)
  },
  postUserRegistration: (registration: Registration): Promise<any> => {
    return AxiosHttpService.Post(
      `user/ToT/${encodeURIComponent(registration['user-name'])}`,
      registration
    )
  },
}

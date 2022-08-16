import { useContext } from 'react'
import { Registration } from '../../data/types/Registration'
import { getHttpError } from '../../utils/getHttpError'
import AppContext from '../../components/AppContext'
import { AuthService } from '../../services/AuthService'
import { useTranslation } from 'react-i18next'

/**
 * usePostUserRegistration
 *
 * post User Registration Data
 * If there is success response, call successCallback function passed as function parameter
 * else set HTTP errorMessage
 * @returns {object<fetchCustomUserSettings>}
 */
export const usePostUserRegistration = (): {
  postUserRegistration: (
    registration: Registration,
    successCallback: () => void
  ) => Promise<void>
} => {
  const { errorMessageState } = useContext(AppContext)
  const { t } = useTranslation()
  const postUserRegistration = async (
    registration: Registration,
    successCallback: () => void
  ) => {
    return await AuthService.postUserRegistration(registration)
      .then(() => {
        localStorage.setItem('userSetting', JSON.stringify(registration))
        successCallback()
      })
      .catch((err) => {
        const httpError = getHttpError(err)
        if (httpError) {
          errorMessageState.setMessage(t(httpError))
        } else {
          console.log(err)
        }
      })
  }

  return {
    postUserRegistration,
  }
}

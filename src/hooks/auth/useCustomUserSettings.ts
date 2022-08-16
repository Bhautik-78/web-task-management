import React, { useContext } from 'react'
import { UserSetting } from '../../data/types/UserSetting'
import { getHttpError } from '../../utils/getHttpError'
import AppContext from '../../components/AppContext'
import { useLogoutState } from './useLogoutState'
import { AuthService } from '../../services/AuthService'
import { useNavigation } from 'react-navi'
import { useTranslation } from 'react-i18next'
import { compose, map, mount, redirect, withStatus, withView } from 'navi'
import { usePowerPlantOptions } from './usePowerPlantOptions'
import { useAssetGroupOptions } from './useAssetGroupOptions'
import { useHeaderDetails } from '../header/useHeaderDetails'

/**
 * useCustomUserSetting
 *
 * fetch userSettings using userPrincipalName
 * If received set customUserSetting obejct {object<power-plant-id,asset-group-id>}
 * else set HTTP errorMessage
 * @returns {object<customUserSetting, fetchCustomUserSettings>}
 */
export const useCustomUserSettings = (): {
  customUserSettings: UserSetting
  fetchCustomUserSettings: (username: string, accessToken: string, language: string) => Promise<void>
} => {
  const { errorMessageState } = useContext(AppContext)
  const { handleLogout } = useLogoutState()
  const { t } = useTranslation()
  const navigation = useNavigation()

  const [
    customUserSettings,
    setCustomUserSettings,
  ] = React.useState<UserSetting>(null)

  const { powerPlantOptions, fetchPowerPlantOptions } = usePowerPlantOptions();
  const {
      assetGroupOptions,
      teamOptions,
      fetchAssetGroupOptions,
      resetAssetGroupOptions,
      resetTeamGroupOptions,
      fetchTeamOptions,
    } = useAssetGroupOptions()

    const {
      comparTeamValue,
      compareAssetGrouptValue,
      comparePlantValue
    } = useHeaderDetails()

  const fetchCustomUserSettings = async (username: string, accessToken: string, language: string) => {

    return await AuthService.fetchCustomUserSettings(username,accessToken, language )
      .then(async (res: any) => {
        localStorage.setItem('userSetting', JSON.stringify(res.data[0]));
        setCustomUserSettings(res.data[0])
        setLocalStorageUserSettings(res.data[0]);
        comparePlantValue();
        compareAssetGrouptValue();
        comparTeamValue();
        setTimeout( //TODO remove timeout (Its temp because mockable not working for continuous calls)
          () => {window.location.href='/'}, 
          10000
        );
        
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            // redirect('/user-registration')
            // navigation.setContext({ path: "/user-registration"});
            navigation.navigate('/user-registration')
          } else {
            const httpError = getHttpError(err)
            if (httpError) {
              errorMessageState.setMessage(t(httpError))
            } else {
              console.log(err)
            }
            handleLogout()
          }
        } else {
          handleLogout()
          errorMessageState.setMessage(err.message)
        }
      })
  }

  const setLocalStorageUserSettings = async (data) => {
        await fetchPowerPlantOptions();
        await fetchAssetGroupOptions(data['power-plant-id']);
        await fetchTeamOptions(data['asset-task-group-id']);
  }

  return {
    customUserSettings,
    fetchCustomUserSettings,
  }
}

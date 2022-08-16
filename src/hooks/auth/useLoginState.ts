import React, { useContext, useState } from 'react'
import { useNavigation } from 'react-navi'
import { AzureAdContext } from '../../components/azure-ad/AzureAdContext'
import { useCustomUserSettings } from './useCustomUserSettings'
import { UserInfo } from '../../data/types/UserInfo'
import AppContext from '../../components/AppContext'
import { useTranslation } from 'react-i18next'

const ua = window.navigator.userAgent
const msie = ua.indexOf('MSIE ')
const msie11 = ua.indexOf('Trident/')
const isIE = msie > 0 || msie11 > 0

/**
 * Login State Object Type
 */
type LoginState = {
  errorMessage: string
  isClientConfigured: boolean
  handleLoginClick: () => void
}

/**
 * useLoginState is functional component for Login Page
 * It performs actions like :
 *  - Connect to Microsoft Login
 *  - After Successful microsoft login, fetch user settings from API
 *  - Redirect user to appropriate page
 *
 * @returns LoginState
 */
export const useLoginState = (): LoginState => {
  const navigation = useNavigation() //It is used to navigate on pages
  const { t } = useTranslation()

  // Global context to set error messages for pages)
  const { errorMessage, setMessage } = useContext(AppContext).errorMessageState
  const { setIsLoggedInFlag } = useContext(AppContext).isLoggedInState

  // Azure Context object to use microsoft login, logout, account detail
  const azureAuthContext: AzureAdContext = new AzureAdContext()

  // hook to have user setting state for login page
  const {
    customUserSettings,
    fetchCustomUserSettings,
  } = useCustomUserSettings()

  // hook to have state of client ID configured or not
  const [isClientConfigured, setIsClientconfigured] = useState<boolean>(false)

  /**
   * hook to handle login click
   * connect to microsoft login page based on browser
   * If browser is other than Internet Explorer open login popup else redirect to microsoft login page
   */

  const handleLoginClick = () => {
    const typeName = 'loginPopup'
    const logInType = isIE ? 'loginRedirect' : typeName

    azureAuthContext.login(logInType, handleLoginResponse)
  }

  // hook to handle microsoft login response
  // store user information in local storage to use in other pages
  // fetch user settings based on microsoft user information
  const handleLoginResponse = (
    userInfo: UserInfo | undefined,
    accessToken: string ,
    language: string
  ) => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedInFlag(true)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('accessToken', accessToken)
    language = 'en';
    getCustomUserSettings(userInfo, accessToken, language)
  }

  // funciton to get user settings after successful microsoft login
  // if found user settings, redirect user to main page
  // else redirect to user registration page
  const getCustomUserSettings = (userInfo: UserInfo | undefined, accessToken: string , language : string ) => {
    if (userInfo && userInfo.profile) {
      fetchCustomUserSettings(userInfo.profile.userPrincipalName, accessToken, language)
    } else {
      navigation.navigate('/login')
    }
  }

  //on page load, set flag for azure client id configured or not and set
  React.useEffect(() => {
    ;(async () => {
      setIsClientconfigured(azureAuthContext.isClientConfigured)
      if (!azureAuthContext.isClientConfigured) {
        setMessage(t('LOGIN.AZURE_CLIENT_NOT_CONFIGURED'))
      } else {
        setMessage('')
      }
    })()
  }, [])

  //whenever customUserSetting value changes, update localStorage value
  React.useEffect(() => {
    localStorage.setItem('userSetting', JSON.stringify(customUserSettings))
  }, [customUserSettings])

  return {
    errorMessage,
    isClientConfigured,
    handleLoginClick,
  }
}

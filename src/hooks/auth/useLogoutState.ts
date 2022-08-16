import { AzureAdContext } from '../../components/azure-ad/AzureAdContext'
import { UserInfo } from '../../data/types/UserInfo'

/**
 * LogoutState type
 */
type LogoutState = {
  handleLogout: () => void
}

/**
 * useLoginState is functional component for Logout button/event
 * It performs actions like :
 *  - Get userInfo from localStorgage
 *  - Logout Microsoft login
 *  - Clear localStorage
 *
 * @returns LogoutState
 *
 */
export const useLogoutState = (): LogoutState => {
  const authenticationModule: AzureAdContext = new AzureAdContext()

  const handleLogout = () => {
    const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo'))
    authenticationModule.logout(userInfo, handlePostLogout)
  }

  //hook to handle Post logout process to clear storage values and navigate user to login page
  const handlePostLogout = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userSetting')
    window.location.href = '/login'
  }
  return {
    handleLogout,
  }
}

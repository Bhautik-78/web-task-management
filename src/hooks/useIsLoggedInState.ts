import React from 'react'

export const useIsLoggedInState = (): {
  isLoggedIn: boolean
  setIsLoggedInFlag: (flag: boolean) => void
  getIsLoggedIn: () => boolean
} => {
  const [isLoggedIn, setIsLoggedin] = React.useState<boolean>(false)
  const setIsLoggedInFlag = (flag: boolean) => {
    setIsLoggedin(flag)
  }
  const getIsLoggedIn = () => {
    return isLoggedIn
  }
  return {
    isLoggedIn,
    setIsLoggedInFlag,
    getIsLoggedIn,
  }
}

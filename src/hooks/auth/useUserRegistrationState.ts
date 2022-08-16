import AppContext from '../../components/AppContext'
import { OptionType } from '../../data/types/OptionType'
import { Registration } from '../../data/types/Registration'
import { UserInfo } from '../../data/types/UserInfo'
import { useAssetGroupOptions } from './useAssetGroupOptions'
import { useLogoutState } from './useLogoutState'
import { usePostUserRegistration } from './usePostUserRegistration'
import { usePowerPlantOptions } from './usePowerPlantOptions'
import i18n from 'i18next'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'react-navi'

/**
 * UserRegistrationForm type
 */
export type UserRegistrationFormState = {
  isFormValid: boolean
  errorMessage: string
  powerPlantOptions: OptionType[]
  assetGroupOptions: OptionType[]
  teamOptions: OptionType[]
  powerPlant: OptionType | undefined
  assetGroup: OptionType | undefined
  team: OptionType | undefined
  handlePowerPlantChange: (selectedOption: OptionType) => void
  handleAssetGroupChange: (selectedOption: OptionType) => void
  handleTeamChange: (selectedOption: OptionType) => void
  registrationButtonClickHandler: () => void
  cancelButtonClickHandler: () => void
  userEmail: string
  fullName: string,
  handleBackButton: () => void,
  title:any
}

/**
 * useUserRegistrtionState is functional component for Regisration Page
 * It performs actions like :
 *  - Display error message for registration and fetch Power Plant on initial load
 *  - Fetch Asset Groups on selection of Power Plant
 *  - Validate Form
 *  - For Valid form, process user registration ( Make API Call to Post user registration data)
 *  - On success response, redirect user to home page
 *
 * @returns UserRegistrationFormState
 */

export const useUserRegistrationState = (): UserRegistrationFormState => {
  const navigation = useNavigation()
  
  const { t } = useTranslation()
  const { handleLogout } = useLogoutState()
  // Global context to set error messages for pages)
  const { errorMessage, setMessage } = useContext(AppContext).errorMessageState

  // fetch and set powerplant options
  const { powerPlantOptions, fetchPowerPlantOptions } = usePowerPlantOptions()

  const [title, setTitle] = useState<any>('')

  // fetch, reset and set asset group options
  const {
    assetGroupOptions,
    teamOptions,
    fetchAssetGroupOptions,
    resetAssetGroupOptions,
    resetTeamGroupOptions,
    fetchTeamOptions,
  } = useAssetGroupOptions()

  // hook to have state of form is valid or not, power plant, and asset group
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [powerPlant, setPowerPlant] = useState<OptionType>()
  const [assetGroup, setAssetGroup] = useState<OptionType>()
  const [team, setTeam] = useState<OptionType>()

  //hook to store user mail address value for registration screen
  const [userEmail, setUserEmail] = useState<any>()
  //hook to store user FullName value for registration screen
  const [fullName, setFullName] = useState<any>()
  //hook for API call for user registration
  const { postUserRegistration } = usePostUserRegistration()

  /**
   * handlePowerPlantChange
   * Reset Asset Group options
   * fetch new Asset group based on selected power plant
   *
   * @param selectedOption selectedOption from select input on change
   */
  const handlePowerPlantChange = async (selectedOption: OptionType) => {
    resetAssetGroupOptions()
    resetTeamGroupOptions()
    fetchAssetGroupOptions(selectedOption.value)
    setPowerPlant(selectedOption)
    setAssetGroup({ label: '選択…', value: '' })
    setTeam({ label: '選択…', value: '' })
  }

  /**
   * handleAssetGroupChange
   * set value for asset group
   * @param selectedOption selectedOption from select input on change
   */
  const handleAssetGroupChange = async (selectedOption: OptionType) => {
    resetTeamGroupOptions()
    setAssetGroup(selectedOption)
    fetchTeamOptions(selectedOption.value)
    setTeam({ label: '選択…', value: '' })
  }

  const handleTeamChange = async (selectedOption: OptionType) => {
    setTeam(selectedOption)
  }
  /**
   * buildUserRegistration
   * Build userRegistration object containing, userName(userPrincipleName), language,
   * authorization, Body(power-plant-id, asset-task-group-id, user-name, team-id)
   *
   * @param username username is userPrincicpleName received from microsoft login
   * @param accessToken accessToke is received from microsoft login
   * @returns
   */
  const buildUserRegistration = async (
    username: string,
    accessToken: string
  ): Promise<Registration> => {
    let powerPlantName = ''
    let assetTaskGroupName = ''
    let teamName = ''
    if (powerPlant) {
      powerPlantName = powerPlantOptions.filter((obj: any) => {
        if (powerPlant.value === obj['value']) {
          return obj
        }
      })
      if (powerPlantName.length > 0) {
        powerPlantName = powerPlantName[0].label
      }
    }
    if (assetGroup) {
      assetTaskGroupName = assetGroupOptions.filter((obj: any) => {
        if (assetGroup.value === obj['value']) {
          return obj
        }
      })
      if (assetTaskGroupName.length > 0) {
        assetTaskGroupName = assetTaskGroupName[0].label
      }
    }
    if (team) {
      teamName = teamOptions.filter((obj: any) => {
        if (team.value === obj['value']) {
          return obj
        }
      })
      if (teamName.length > 0) {
        teamName = teamName[0]['label']
      }
    }

    return {
      // 'accept-language': i18n.language,
      // 'user-id': username,
      // authorisation: accessToken,
      // Body: {
      'user-name': username,
      'power-plant-id': powerPlant?.value,
      'asset-task-group-id': assetGroup?.value,
      'team-id': team?.value,
      'power-plant-name': powerPlant ? powerPlantName : '',
      'team-name': team ? teamName : '',
      'asset-task-group-name': assetGroup ? assetTaskGroupName : '',
      // },
    }
  }

  const registrationButtonClickHandler = async () => {
    const userInfoStr: string | null = localStorage.getItem('userInfo')
    const accessToken: string | null = localStorage.getItem('accessToken')
    if (userInfoStr && userInfoStr != '' && accessToken && accessToken != '') {
      const userInfo: UserInfo = JSON.parse(userInfoStr)
      const registration = await buildUserRegistration(
        userInfo.profile.userPrincipalName,
        accessToken
      )
      //API call for post user registration data
      await postUserRegistration(registration, () => {
        navigation.navigate('/')
      })
    } else {
      handleLogout()
    }
  }

  //validate Registration form
  const validateRegistrationForm = () => {
    if (
      !powerPlant ||
      powerPlant.value === '' ||
      !assetGroup ||
      assetGroup.value === '' ||
      !team ||
      team.value === ''
    ) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }

  /**
   * cancelButtonClickHandler
   * on Cancel button click, logout microsoft account and redirect to login page
   */
  const cancelButtonClickHandler = () => {
    navigation.navigate('/login')
  }

  //get userinformation like mailaddress from localstorage.
  const getUserdata = async () => {
    const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (userInfo) {
      setUserEmail(userInfo.account.username)
      setFullName(userInfo.account.name)
    }
  }
  const handleBackButton = () => {
    const navigatedata: any = navigation.extractState()
    if (navigatedata || navigatedata !== undefined) {
      console.log("&&&",navigatedata);
      if(navigatedata['showErrorMessage'] && navigatedata['showErrorMessage'] == 'none'){
        navigation.navigate('/')
      }
      else{
        handleLogout()
      }
    }
    else{
      handleLogout()
    }
    // if(navigatedata || navigatedata !== undefined){
    //   if(navigatedata.url.pathname === '/'){
    //     navigation.navigate('/')
    //   }
    //   else{
    //     handleLogout()
    //   }
    // }
    console.log("hello",navigatedata);
  }

  const getDataFromNavigation = () => {
    const navigatedata: any = navigation.extractState()
    if (navigatedata || navigatedata !== undefined) {
      handlePowerPlantChange(navigatedata.powerplant)
      handleAssetGroupChange(navigatedata.unit)
      handleTeamChange(navigatedata.team)
      if(navigatedata['showErrorMessage'] && navigatedata['showErrorMessage'] == 'none'){
        setMessage(null)
        setTitle('isRegestration')
      }
      else{
        setMessage(t('HTTP_ERRORS.MR_IR_013'))
        setTitle('isLogin')
      } 
    }
    else{
      setMessage(t('HTTP_ERRORS.MR_IR_013'))
    }

  }

  /**
   * on initial load set error message for registration and fetch power plant options
   * 
   * 
   */

  React.useEffect(() => {
    ;(async () => {
      setMessage(null)
      await fetchPowerPlantOptions()
      getUserdata()
      getDataFromNavigation()
    })()
  }, [])

  /**
   * on any changes in powerplant and asset group values, validate form and set flag
   * isFormValid true or false, enable/disable registration button based on Flag isFormValid
   */
  React.useEffect(() => {
    ;(async () => {
      validateRegistrationForm()
    })()
  }, [powerPlant, assetGroup, team])

  return {
    isFormValid,
    errorMessage,
    powerPlantOptions,
    assetGroupOptions,
    teamOptions,
    powerPlant,
    assetGroup,
    team,
    handlePowerPlantChange,
    handleAssetGroupChange,
    handleTeamChange,
    registrationButtonClickHandler,
    cancelButtonClickHandler,
    userEmail,
    fullName,
    handleBackButton,
    title
  }
}

import React, { useContext, useState, useRef, useEffect } from 'react'
import { Trans } from 'react-i18next'
import { Button } from 'jera-design-ui'

import { useLogoutState } from '../../hooks/auth/useLogoutState'
import { useHeaderDetails } from '../../hooks/header/useHeaderDetails'

import globeIcon from '../../assets/images/globe.svg'
import logo from '../../assets/images/logo/logo.svg'
import AppContext from '../AppContext'

/**
 * Logo Component
 * @returns
 */
const Logo: React.FC = () => (
  <Button.Link underlineDisabled href="/">
    <img src={logo} alt="" />
  </Button.Link>
)


/**
 * Header Component
 *  - Logo
 *  - Additional Links
 */
const Header: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userSetting = JSON.parse(localStorage.getItem('userSetting'))
  const hasCustomerId = userInfo && userInfo['account']
  //Whether user logged in with microsoft account
  const { isLoggedIn } = useContext(AppContext).isLoggedInState
  // Whether current page is login
  const isLoginPage = window.location.pathname === '/login'

  // Whether current page is registration
  const isRegisterPage = window.location.pathname === '/user-registration'

  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false)

  const useOutsideAlerter: any = (ref: any) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowLanguageModal(false)
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const {
    powerPlant,
    assetGroup,
    team,
    goToRegestration
  } = useHeaderDetails()
  const { handleLogout } = useLogoutState()
  const wrapperRef: any = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <header>
      <div className="header_container">
        <div className="brand_logo">
          <Logo />
        </div>
        <div className="right_menu">
          <ul className="right_menu_list">
            <li className="custom_dropdown_menu">
              {
                isLoggedIn && !isRegisterPage && hasCustomerId && (
                  <li className="user_name"><a href="javascript:void(0);">{hasCustomerId.username}</a></li>
                )
              }

              <a onClick={() => { setShowLanguageModal(true) }} href="javascript:void(0);">
                <img src={globeIcon} alt="" />
                language
              </a>
              {
                showLanguageModal ?
                  <ul ref={wrapperRef} className="dropdown_menu">
                    <li className="menu_title">言語設定 (Language Setting)</li>
                    <li className="active"><a href="javascript:void(0);">日本語</a></li>
                    <li className="disabled"><a href="javascript:void(0);">english</a></li>
                  </ul> : ""
              }
            </li>
            {
              isLoggedIn && !isRegisterPage && userSetting && (
                <li onClick={() => goToRegestration()} className="custom_dropdown_menu"><a href="javascript:void(0);">{userSetting['power-plant-name']}・ {userSetting['asset-task-group-name']}・{userSetting['team-name']}</a>
                  {/* <ul className="dropdown_menu">
                  <li className="menu_title">Power Plant</li
                  <li><a href="javascript:void(0);">{powerPlant}<img src="images/expand_arrow.svg" alt="" /></a></li>
                  <li><a href="javascript:void(0);">hekinan<img src="images/expand_arrow.svg" alt="" /></a>
                    <div className="accordion_details">
                      <div className="table_header">unit</div>
                      <ul className="table_list">
                        <li className="active">1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>共通</li>
                      </ul>
                    </div>
                  </li>
                  <li><a href="javascript:void(0);">hitachinaka <img src="images/expand_arrow.svg" alt="" /></a></li>
                  <li><a href="javascript:void(0);">kawasaki <img src="images/expand_arrow.svg" alt="" /></a></li>
                  <li>
                    <button className="btn btn-outline-primary btn-block">設定</button>
                  </li>
                </ul> */}
                </li>
              )
            }

            {!isLoggedIn && !isLoginPage && (
              <li>
                <a href="/login">
                  <Trans>LOGIN.BUTTON_TEXT</Trans>
                </a>
              </li>
            )}
            {/* {isLoggedIn && isRegisterPage && !hasPowerPlantId && (
              <li>
                <Button.Link onClick={handleLogout}>
                  <Trans>LOGIN.BUTTON_TEXT</Trans>
                </Button.Link>
              </li>
            )} */}
            {isLoggedIn && !isRegisterPage && (
              <li>
                <Button.Link onClick={handleLogout}>
                  <Trans>LOGOUT</Trans>
                </Button.Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

export { Header }

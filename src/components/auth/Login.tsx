import React from 'react'
import { Trans } from 'react-i18next'
import { useLoginState } from '../../hooks/auth/useLoginState'
import { ErrorMessage } from '../common/ErrorMessage'

/**
 * Login with Microsoft Azure Ad
 *
 * On click of Login Button, open modal popup (redirect to url if it is internet explorer browser)
 * to authenticate user by microsoft account login. Once user authenticated, redirect back to
 * login page and execute further process of authentication.
 *
 * If Azure Client ID configured, Show Error message for client ID not configured and
 * Disable Login button
 *
 * Show error message if there is either client configuration error or API request fails
 */

const Login: React.FC = () => {
  const { errorMessage, isClientConfigured, handleLoginClick } = useLoginState()
  return (
    <div id="wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className="login_wrapper">
              {errorMessage && (
                <ErrorMessage
                  classStr="custom_alert custom_alert_position_set login-alert"
                  message={errorMessage}
                />
              )}
              <button
                className="btn btn-outline-primary btn_login"
                onClick={handleLoginClick}
                disabled={!isClientConfigured}
              >
                <Trans>LOGIN.BUTTON_TEXT</Trans>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Login }

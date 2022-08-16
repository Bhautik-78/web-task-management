import React, { useEffect } from 'react'
import Select from 'react-select'
import { Trans } from 'react-i18next'
import { useNavigation } from 'react-navi'
import { useUserRegistrationState } from '../../hooks/auth/useUserRegistrationState'
import { ErrorMessage } from '../common/ErrorMessage'
import { useLogoutState } from '../../hooks/auth/useLogoutState'

/**
 * User Registration
 *
 * After successful login with microsoft account, Get the User settings based on userPrincipleName.
 * If response is 404, user is redirected to User Registration page. On Registration page, allow
 * user to pick power-plant and asset-group. Enable registration button on valid selection of
 * power plant and asset group.
 *
 * On click of Cancel button, Logout Microsoft account to which user logged in and redirect user to
 * login Page
 *
 */

const UserRegistration: React.FC = () => {
  // variables nd hooks for user registration
  const {
    errorMessage,
    isFormValid,
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
    userEmail,
    fullName,
    handleBackButton,
    title
  } = useUserRegistrationState()
  const navigation = useNavigation()

  const { handleLogout } = useLogoutState()
  return (
    <div id="wrapper">
      <div className="container custom_container">
        <div className="row">
          <div className="col-12">
            <div className="signup_wrapper">
              {errorMessage && (
                <ErrorMessage
                  classStr="custom_alert custom_alert_position_set"
                  message={errorMessage}
                />
              )}
              <h1><Trans>REGISTER.TITLE</Trans></h1>
              <div className="signup_form_box">
                <div className="form-group form_group_select">
                {
                title && title === 'isLogin' ? (<h1><Trans>REGISTER.TITLE</Trans></h1>) : (<h1>ユーザー情報編集</h1>)
              }
                  <div className="form-group form_select_input col-md-5 p-0">
                    <input type="text" className="form-control-plaintext input_plaintext" value={userEmail} />
                  </div>
                </div>
                <div className="form-group form_group_select">
                  <label className="col-form-label col-sm-4"><Trans>REGISTER.LABELS.FUll_NAME</Trans></label>
                  <div className="form-group form_select_input col-md-5 p-0">
                    <input type="text" className="form-control-plaintext input_plaintext" value={fullName} />
                  </div>
                </div>
                <div className="form-group form_group_select">
                  <label className="col-form-label col-sm-4"><Trans>REGISTER.LABELS.POWER_PLANT</Trans></label>
                  <div className="form-group form_select_input col-md-5 p-0">
                    <Select
                      value={powerPlant}
                      name="power-plant"
                      placeholder={<Trans>REGISTER.PLACE_HOLDER</Trans>}
                      isSearchable={false}
                      isClearable={false}
                      options={powerPlantOptions}
                      onChange={handlePowerPlantChange}
                    />
                    {/* <select name="" className="form-control  selectpicker" id="power-plant">
                      <option value="" hidden>select...</option>select_input
                      <option value="Shinnagoya">Shinnagoya</option>
                      <option value="Hekinan">Hekinan</option>
                      <option value="Hitachinaka">Hitachinaka</option>
                      <option value="Kawasaki">Kawasaki</option>
                    </select> */}
                  </div>
                </div>
                <div className="form-group form_group_select">
                  <label className="col-form-label col-sm-4"><Trans>REGISTER.LABELS.UNIT</Trans></label>
                  <div className="form-group form_select_input col-md-5 p-0">
                    <Select
                      value={assetGroup}
                      name="unit"
                      placeholder={<Trans>REGISTER.PLACE_HOLDER</Trans>}
                      isSearchable={false}
                      isClearable={false}
                      options={assetGroupOptions}
                      onChange={handleAssetGroupChange}
                    />
                    {/* <select name="" className="form-control select_input selectpicker" id="unit">
                      <option value="" hidden>select...</option>
                      <option value="">unit</option>
                    </select> */}
                  </div>
                </div>
                <div className="form-group form_group_select has_error">
                  <label className="col-form-label col-sm-4"><Trans>REGISTER.LABELS.TEAM</Trans></label>
                  <div className="form-group form_select_input col-md-5 p-0">
                    {/* <select name="" className="form-control select_input selectpicker" id="team">
                      <option value="" hidden>select...</option>
                      <option value="">team</option>
                    </select> */}
                    <Select
                      value={team}
                      name="team"
                      placeholder={<Trans>REGISTER.PLACE_HOLDER</Trans>}
                      isSearchable={false}
                      isClearable={false}
                      options={teamOptions}
                      onChange={handleTeamChange}
                    />
                  </div>
                </div>
              </div>
              <div className="signup_button_set">
                <button
                  className="btn btn-outline-default btn_signup btn_cancel_icon"
                  onClick={handleBackButton}
                ><Trans>REGISTER.BUTTONS.CANCEL</Trans></button>
                <button
                  className="btn btn-outline-primary btn_signup btn_done_icon"
                  onClick={registrationButtonClickHandler}
                  disabled={!isFormValid}
                ><Trans>REGISTER.BUTTONS.REGISTRATION</Trans></button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { UserRegistration }

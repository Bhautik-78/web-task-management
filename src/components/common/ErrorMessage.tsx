import React, { useContext } from 'react'
import { Trans } from 'react-i18next'
import AppContext from '../AppContext'

import warningIcon from '../../assets/images/warning.svg'
import closeIcon from '../../assets/images/cancel.svg'

/**
 * ErrorMessge is common component to show error message on top of the page
 * @param classStr classStr is string used as container class
 * @param message Message text as translated string to show on Error block
 * @returns ErrorMessage component
 */

const ErrorMessage: React.FC<{
  classStr: string
  message: string
}> = ({ classStr, message }) => {
  const { setMessage } = useContext(AppContext).errorMessageState
  const handleClose = () => {
    setMessage('')
  }

  return (
    <div className={classStr}>
      <img src={warningIcon} alt="" />
      <Trans>ERROR</Trans> : {message}
      <img src={closeIcon} alt="" className="close-btn" onClick={handleClose} />
    </div>
  )
}

export { ErrorMessage }

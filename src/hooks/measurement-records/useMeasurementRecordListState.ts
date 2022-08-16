import React, { useContext, useState } from 'react'
import { useNavigation } from 'react-navi'
import AppContext from '../../components/AppContext'
import { useTranslation } from 'react-i18next'

interface MeasurementRecordList {
    errorMessage: string,
}

export const useMeasurementRecordListState = (props: any): MeasurementRecordList => {
  const navigation = useNavigation() //It is used to navigate on pages
  const { t } = useTranslation()

  // Global context to set error messages for pages)
  const { errorMessage, setMessage } = useContext(AppContext).errorMessageState

  return {
    errorMessage,
  }
}

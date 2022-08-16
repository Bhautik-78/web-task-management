import AppContext from '../../components/AppContext'
import { Facility } from '../../data/types/Facility'
import { TaskListService } from '../../services/TaskListService'
import { getHttpError } from '../../utils/getHttpError'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Get Recent Registered facilities
 * Make API call and fetch registered facilities
 */

export const useFacilities = (): {
  facilities: Facility[]
  fetchFacilities: () => Promise<void>
} => {
  const { t } = useTranslation()
  const { errorMessageState } = useContext(AppContext)
  const [facilities, setFacilities] = React.useState<Facility[]>([])
  const fetchFacilities = async () => {
    errorMessageState.setMessage('')
    return await TaskListService.fetchRecentRegisteredFacilities()
      .then((res: any) => {
        setFacilities(res.data)
      })
      .catch((err) => {
        const httpError = getHttpError(err)
        if (httpError) {
          errorMessageState.setMessage(t(httpError))
        } else {
          console.error(err)
        }
      })
  }

  return {
    facilities,
    fetchFacilities,
  }
}

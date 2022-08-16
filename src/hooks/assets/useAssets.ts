import React, { useContext } from 'react'
import { Asset } from '../../data/types/Asset'
import _sortBy from 'lodash/sortBy'
import AppContext from '../../components/AppContext'
import { SearchAssetService } from '../../services/TaskListService'
import { useTranslation } from 'react-i18next'
import { getHttpError } from '../../utils/getHttpError'

/**
 * Get assets
 * Make API call and fetch assets
 */

export const useAssets = (): {
  assets: Asset[]
  fetchAssets: (powerPlantId: string, searchText: string) => Promise<void>
  resetAssets: () => void
} => {
  const { t } = useTranslation()
  const { errorMessageState } = useContext(AppContext)

  const [assets, setassets] = React.useState<Asset[]>([])
  const fetchAssets = async (powerPlantId: string, searchText: string) => {
    errorMessageState.setMessage("");
    return await SearchAssetService.fetchAssets(powerPlantId, searchText).then(
      (res: any) => {
        const response: Asset[] = res.data
        if (response.length > 0) {
          _sortBy(assets, ['asset-code'])
        } else {
          //set error message when result is empty
          errorMessageState.setMessage(t('HTTP_ERRORS.MR_IR_001'))
        }
        setassets(response)
      }
    )
    .catch((err) => {
      const httpError = getHttpError(err)
        if (httpError) {
          errorMessageState.setMessage(t(httpError))
        } else {
          console.error(err)
        }
    })
  }
  const resetAssets = () => {
    setassets([])
  }

  return {
    assets,
    fetchAssets,
    resetAssets,
  }
}

import React, { useContext, useState } from 'react'
import { UserSetting } from '../../data/types/UserSetting'
import { useAssets } from './useAssets'
import { Asset } from '../../data/types/Asset'
import AppContext from '../../components/AppContext'

/**
 * Search Asset Result State type
 */
export type SearchAssetResultState = {
  errorMessage: string,
  activePage: number
  hasSearchError: boolean
  searchText: string
  assets: Asset[]
  handleEnterKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePageChange: (pageNumber: number) => void
}

/**
 * useSearchAssetResultState is functional component for Search Asset Result Page
 * It performs actions like :
 *  - Show assets based on search term
 *  - Handle input to search assets
 *  - Set hasSearchError on invalid search input
 *
 * @returns SearchAssetResultState
 */

export const useSearchAssetResultState = (): SearchAssetResultState => {
  const { errorMessage, setMessage } = useContext(AppContext).errorMessageState
  //hook to have set state for searchText
  const [searchText, setSeachText] = useState('')

  //hook to have set state for hasSearchError
  const [hasSearchError, setHasSearchError] = useState<boolean>(false)

  // hook to fetch assets and set assets
  const { assets, fetchAssets, resetAssets } = useAssets()

  //hoot to set state for active page for pagination
  const [activePage, setActivePage] = useState<number>(1)

  //Get the search term from query params
  const query = new URLSearchParams(location.search)

  //handler function for search input
  //set hasSerachError flag on valid/invalid input
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setHasSearchError(true)
    } else {
      setHasSearchError(false)
    }
    setSeachText(e.target.value)
  }

  //Enter key event handler on search input
  //If input is valid, search assets
  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which == 13) {
      if (searchText == '') {
        setHasSearchError(true)
      } else {
        resetAssets()
        handleSearchAssets(searchText)
      }
    }
  }

  //Page change event handler
  //Update active page numner
  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber)
  }

  //Search Assets handler
  //fetch assets based on search term
  const handleSearchAssets = (searchText: string) => {
    const userSetting: UserSetting = JSON.parse(
      localStorage.getItem('userSetting')
    )
    if (userSetting) {
      fetchAssets(userSetting['power-plant-id'], searchText)
    }
  }

  //on initial load fetch assets data
  React.useEffect(() => {
    ;(async () => {
      const queryString = query.get('searchText')
      setSeachText(queryString ? queryString : '')
      handleSearchAssets(queryString)
    })()
  }, [])

  return {
    errorMessage,
    activePage,
    hasSearchError,
    searchText,
    assets,
    handleEnterKeyPress,
    handleSearchInputChange,
    handlePageChange,
  }
}

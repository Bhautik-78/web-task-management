import React, { useContext, useState } from 'react'
import { useNavigation } from 'react-navi'
import AppContext from '../../components/AppContext'
import { Facility } from '../../data/types/Facility'
import { useFacilities } from './useFacilities'

/**
 * Search Asset State Object Type
 */
export type SearchAssetState = {
  errorMessage: string
  activePage: number
  hasSearchError: boolean
  searchText: string
  facilities: Facility[]
  handleEnterKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePageChange: (pageNumber: number) => void
}

/**
 * useSearchAssetState is functional component for Search Asset Page
 * It performs actions like :
 *  - Show Recent Registered facilities
 *  - Handle input to search assets
 *  - Set hasSearchError on invalid search input
 *
 * @returns SearchAssetState
 */
export const useSearchAssetState = (): SearchAssetState => {
  const navigation = useNavigation()
  const { errorMessage, setMessage } = useContext(AppContext).errorMessageState
  //hook to have set state for searchText
  const [searchText, setSeachText] = useState('')
  //hook to have set state for hasSearchError
  const [hasSearchError, setHasSearchError] = useState<boolean>(false)
  // hook to fetch facilities and set facilites
  const { facilities, fetchFacilities } = useFacilities()
  //hoot to set state for active page for pagination
  const [activePage, setActivePage] = useState<number>(1)

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
        handleSearchAssets()
      }
    }
  }

  //Page change event handler
  //Update active page numner
  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber)
  }

  //Search Assets handler
  // redirect user to search asset result page with the search term and query params
  const handleSearchAssets = () => {
    navigation.navigate('/search-asset-result?searchText=' + searchText)
  }

  // On initial load fetch recent registered facilities
  React.useEffect(() => {
    ;(async () => {
      await fetchFacilities()
    })()
  }, [])

  return {
    errorMessage,
    activePage,
    hasSearchError,
    searchText,
    facilities,
    handleEnterKeyPress,
    handleSearchInputChange,
    handlePageChange,
  }
}

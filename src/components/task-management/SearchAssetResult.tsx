import { Asset } from '../../data/types/Asset'
import { useSearchAssetResultState } from '../../hooks/assets/useSearchAssetResultState'
import { SearchBox } from './SearchBox'
import React from 'react'
import { Trans } from 'react-i18next'
import Pagination from 'react-js-pagination'
import { ErrorMessage } from '../common/ErrorMessage'

/**
 * AssetItem component
 * Individual asset item to show asset name, asset-code
 * @param asset
 */
const AssetItem: React.FC<{
  asset: Asset
}> = ({ asset }) => {
  return (
    <div className="search_result_list">
      <h2>
        <a href="/measurement-record-list/{asset['asset-id']}">
          {asset['asset-name']}
        </a>
      </h2>
      <p>{asset['asset-code']}</p>
    </div>
  )
}

/**
 * SearchAsset Component
 * - Search Input to search assets
 * - Display Assets searched based on search term
 */

const SearchAssetResult: React.FC = () => {
  const {
    errorMessage,
    activePage,
    hasSearchError,
    searchText,
    assets,
    handleEnterKeyPress,
    handleSearchInputChange,
    handlePageChange,
  } = useSearchAssetResultState()

  //convert assets array to current page assets
  const pageAssets = assets.slice((activePage - 1) * 10, activePage * 10)
  return (
    <div className="container custom_container">
      <div className="row">
        <div className="col-12">
          <div className="search-asset-result-wrapper">
            {errorMessage && (
                <ErrorMessage
                  classStr="custom_alert custom_alert_position_set "
                  message={errorMessage}
                />
            )}
            <SearchBox
              containerClass={
                hasSearchError
                  ? 'search_box search_result_content has-error'
                  : 'search_box search_result_content'
              }
              hasSearchError={hasSearchError}
              searchText={searchText}
              handleKeyPress={handleEnterKeyPress}
              handleChange={handleSearchInputChange}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="data_show_box search_result_content_box">
            <h2 className="result_title">
              <Trans>SEARCH_ASSET.RESULT_TITLE</Trans>
              <span>({assets.length} results)</span>
            </h2>
            <div className="search_result_list_box">
              {pageAssets.map((asset: Asset, key: number) => (
                <AssetItem key={key} asset={asset} />
              ))}
            </div>
            {assets.length > 0 && (
              <div className="custom_pagination">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={assets.length}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { SearchAssetResult }

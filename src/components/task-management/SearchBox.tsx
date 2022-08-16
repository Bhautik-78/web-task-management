import React from 'react'
import { useTranslation } from 'react-i18next'
import { Trans } from 'react-i18next'

import searchIcon from '../../assets/images/search.svg'
import warningIcon from '../../assets/images/warning.svg'

/**
 * Search Box component
 * @param containerClass containerClass is string set to className to container div
 * @param hasSearchError hasSearchError is true/false if input is invalid
 * @param searchText searchText entered value in text input
 * @param handleChange handleChange is event handler on input change
 * @param handleKeyPress handleKeyPress is event handler on enter key pressed
 */

const SearchBox: React.FC<{
  containerClass: string
  hasSearchError: boolean
  searchText: string
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = ({
  containerClass,
  hasSearchError,
  searchText,
  handleChange,
  handleKeyPress,
}) => {
  const { t } = useTranslation()

  return (
    <div className={containerClass}>
      <div className="search_group">
        <input
          type="text"
          className="form-control search_input"
          placeholder={t('SEARCH_ASSET.SEARCHBOX_PLACEHOLDER')}
          value={searchText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <img src={searchIcon} className="search_icon" alt="" />
      </div>
      <>
        {hasSearchError && (
          <div className="help_block">
            <img src={warningIcon} alt="" />
            <Trans>SEARCH_ASSET.NO_SEARCH_KEYWORD_ENTERED</Trans>
          </div>
        )}
      </>
    </div>
  )
}

export { SearchBox }

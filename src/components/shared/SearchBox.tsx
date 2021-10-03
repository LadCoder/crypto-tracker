import React, { useEffect, useState } from 'react'
import styles from './SearchBox.module.css'

interface Props {
  title?: string
  placeholder?: string
  className?: string
  onSearch(searchString: string): void
}

/**
 * Component used for displaying tabulated data to the user
 * @param {string} title The name of the element
 * @param {placeholder} placeholder The text that is presented before a user inputs a string
 * @param {string} className Allows user to add additional styling
 * @param {function} onSearch the function that triggers when a user enters a string
 * @return {JSX.Element}
 */
export function SearchBox({
  title,
  placeholder,
  className,
  onSearch
}: Props): JSX.Element {
  const [searchString, setSearchString] = useState<string>('')

  useEffect(() => {
    onSearch(searchString)
  }, [searchString])

  const onUpdate = (e: any) => {
    setSearchString(e.target.value)
  }

  return (
    <div className={className ? className : styles.wrapper}>
      <input
        className={styles.search}
        title={title}
        type="search"
        placeholder={placeholder}
        aria-label="search"
        onChange={onUpdate}
        data-testid="search-box"
      />
    </div>
  )
}

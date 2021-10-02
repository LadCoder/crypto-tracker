import React, { useState } from 'react'
import styles from './DataTable.module.css'
import { DataTableHeader } from './DataTableHeader'
import { DataTableRows } from './DataTableRows'
import { SearchBox } from '../SearchBox'

/**
 * Renders an image in a column
 * @param {string} image
 * @param {string} label
 * @return {JSX.Element}
 */

export type CustomRenderers<T, K extends keyof T> = Partial<
  Record<K, (item: T) => React.ReactNode>
>

export type ColumnDefinition<T, K extends keyof T> = {
  key: K
  name: string
  width?: number
}

interface Props<T, K extends keyof T> {
  data: T[]
  columns: ColumnDefinition<T, K>[]
  makeFilterKey?: (item: T) => string
  customRenderer?: CustomRenderers<T, K>
}

/**
 * Component used for displaying tabulated data to the user
 * @param {T[]} data
 * @param {ColumnDefinition<T, K>[]} columns
 * @param {function} makeFilterKey takes an item and returns a filter key as string
 * @param {CustomRenderers<T, K>} customRenderer allows data table to show advanced data types
 * @return {JSX.Element}
 */
export function Datatable<T, K extends keyof T>({
  data,
  columns,
  makeFilterKey,
  customRenderer
}: Props<T, K>): JSX.Element {
  const [filter, setFilter] = useState('')

  const getFilterKey = (item: T) => {
    return makeFilterKey ? makeFilterKey(item) : ''
  }
  const lowerCaseFilter = filter.toLowerCase()
  const filteredData = lowerCaseFilter
    ? data.filter((item) => getFilterKey(item).includes(lowerCaseFilter))
    : data

  return (
    <div className={styles.wrapper}>
      <SearchBox onSearch={setFilter} />
      <table>
        <DataTableHeader columns={columns} />
        <DataTableRows
          data={filteredData}
          columns={columns}
          customRenderer={customRenderer}
        />
      </table>
    </div>
  )
}

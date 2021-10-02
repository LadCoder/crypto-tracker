import React, { useState } from 'react'
import styles from './DataTable.module.css'
import { DataTableHeader } from './DataTableHeader'
import { DataTableRows } from './DataTableRows'
import { SearchBox } from '../SearchBox'

export type ColumnDefinition<T, K extends keyof T> = {
  key: K
  name: string
  width?: number
}

interface Props<T, K extends keyof T> {
  data: T[]
  columns: ColumnDefinition<T, K>[]
  makeFilterKey?: (item: T) => string
}

/**
 * Component used for displaying tabulated data to the user
 * @return {JSX.Element}
 */
export function Datatable<T, K extends keyof T>({
  data,
  columns,
  makeFilterKey
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
        <DataTableRows data={filteredData} columns={columns} />
      </table>
    </div>
  )
}

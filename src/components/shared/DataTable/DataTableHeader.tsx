import React from 'react'
import { ColumnDefinition } from './DataTable'
import styles from './DataTableHeader.module.css'
import { DataTableRow } from './DataTableRows'

interface Props<T, K extends keyof T> {
  columns: ColumnDefinition<T, K>[]
}

/**
 * Headers for the data table component
 * @param {ColumnDefinition[]} columns an array of column definitions
 * @return {JSX.Element}
 */
export function DataTableHeader<T, K extends keyof T>({
  columns
}: Props<T, K>): JSX.Element {
  const headers = columns.map((column) => {
    const style = {
      width: column.width || 'auto'
    }

    return (
      <div
        className={styles.heading}
        key={`column-${column.key}`}
        style={style}
      >
        {column.name}
      </div>
    )
  })
  return <DataTableRow className={styles.wrapper}>{headers}</DataTableRow>
}

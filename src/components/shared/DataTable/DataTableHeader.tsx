import React from 'react'
import { ColumnDefinition } from './DataTable'

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
      <th key={`column-${column.key}`} style={style}>
        {column.name}
      </th>
    )
  })
  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  )
}

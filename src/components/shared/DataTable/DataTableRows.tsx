import React from 'react'
import { ColumnDefinition } from './DataTable'

interface Props<T, K extends keyof T> {
  data: T[]
  columns: ColumnDefinition<T, K>[]
}

/**
 * Rows for the data table component
 * @param {T[]} data an array of data. Each data item is a row in the data table
 * @param {ColumnDefinition[]} columns an array of column definitions
 * @return {JSX.Element}
 */
export function DataTableRows<T, K extends keyof T>({
  data,
  columns
}: Props<T, K>): JSX.Element {
  const rows = data.map((row, i) => {
    return (
      <tr key={i}>
        {columns.map((column) => {
          return <td key={String(column.key)}>{row[column.key]}</td>
        })}
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

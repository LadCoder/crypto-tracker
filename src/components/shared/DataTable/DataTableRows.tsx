import React from 'react'
import { ColumnDefinition, CustomRenderers } from './DataTable'
import styles from './DataTableRows.module.css'

interface Props<T, K extends keyof T> {
  data: T[]
  columns: ColumnDefinition<T, K>[]
  customRenderer?: CustomRenderers<T, K>
}

/**
 * Rows for the data table component
 * @param {T[]} data an array of data. Each data item is a row in the data table
 * @param {ColumnDefinition[]} columns an array of column definitions
 * @return {JSX.Element}
 */
export function DataTableRows<T, K extends keyof T>({
  data,
  columns,
  customRenderer
}: Props<T, K>): JSX.Element {
  const rows = data.map((row, i) => {
    return (
      <DataTableRow key={i}>
        {columns.map((column) => {
          const columnData = row[column.key]
          const renderer = customRenderer?.[column.key]
          if (renderer) {
            return (
              <div className={styles.cell} key={String(column.key)}>
                {renderer(row)}
              </div>
            )
          }
          return (
            <div className={styles.cell} key={String(column.key)}>
              {columnData}
            </div>
          )
        })}
      </DataTableRow>
    )
  })

  return <>{rows}</>
}

/**
 * Row for the data table component
 * @param {React.ReactNode} children
 * @return {JSX.Element}
 */
export function DataTableRow({
  children,
  className,
  style
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}): JSX.Element {
  return (
    <div
      className={[className, styles.row].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </div>
  )
}

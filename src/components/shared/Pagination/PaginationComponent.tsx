import React, { Fragment, useMemo } from 'react'
import { Pagination } from '../../../types/pagination'
import uniq from 'lodash/uniq'
import styles from './PaginationComponent.module.css'

interface Props {
  pagination: Pagination
  paginate: (page: number) => void
}

export const PaginationComponent = ({ pagination, paginate }: Props) => {
  const pageNumbers = useMemo(
    () => determinePageNumbers(pagination),
    [pagination.currentPage, pagination.pages]
  )

  let lastNumber: number = 0

  return (
    <div>
      <div className={styles.buttons}>
        {pageNumbers.map((number) => {
          const isGap = number > 1 && number > lastNumber + 1
          lastNumber = number

          return (
            <Fragment key={number}>
              {isGap && <div className={styles.button}>...</div>}
              <div
                className={[
                  styles.button,
                  number === pagination.currentPage ? styles.active : ''
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => paginate(number)}
              >
                {number}
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

const determinePageNumbers = (pagination: Pagination): number[] => {
  const pageNumbers: number[] = []
  if (pagination.pages <= 5) {
    for (let i = 1; i <= pagination.pages; i++) {
      pageNumbers.push(i)
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      pageNumbers.push(i)
    }

    for (let i = pagination.pages - 2; i <= pagination.pages; i++) {
      pageNumbers.push(i)
    }

    for (
      let i = Math.max(1, pagination.currentPage - 3);
      i <= Math.min(pagination.pages, pagination.currentPage + 3);
      i++
    ) {
      pageNumbers.push(i)
    }
  }

  return uniq(pageNumbers.sort((a, b) => a - b))
}

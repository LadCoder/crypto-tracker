import React from 'react'
import { convertToPercent } from '../../../services/convertNumber'

import styles from './Statistics.module.css'

interface Props {
  value: string
  description: string
  growth?: number
}

/**
 * Displays a statistics card
 * @return {JSX.Element}
 */
export function Statistics({ value, description, growth }: Props): JSX.Element {
  const growthClass = growth
    ? growth > 0
      ? styles.growth
      : styles.decline
    : styles.neutral
  const growthBorderClass = growth
    ? growth > 0
      ? styles.growthBorder
      : styles.declineBorder
    : styles.neutralBorder

  return (
    <div
      className={[styles.wrapper, growthBorderClass].filter(Boolean).join(' ')}
    >
      <div className={styles.data}>
        <div className={styles.value}>{value}</div>
        <div className={styles.description}>{description}</div>
      </div>

      {growth && (
        <span
          className={[styles.growth, growthClass].filter(Boolean).join(' ')}
        >
          {convertToPercent(growth)}
        </span>
      )}
    </div>
  )
}

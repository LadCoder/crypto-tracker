import React from 'react'
import styles from './Page.module.css'

interface Props {
  children: React.ReactNode
}

/**
 * Styled page component
 * @param {React.ReactNode} children
 * @return {JSX.Element}
 */
export function PageContainer({ children }: Props): JSX.Element {
  return <div className={styles.wrapper}>{children}</div>
}

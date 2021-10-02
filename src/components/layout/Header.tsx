import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/logo.png'
/**
 * Router Navigation to each of the app pages
 * @return {JSX.Element}
 */
export function Header(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.brand}>
        <img className={styles.image} src={logo} alt="logo" />
        <span>Crypto Tracker</span>
      </div>
      <nav className={styles.nav}>
        <NavLink
          exact
          to="/"
          activeClassName={styles.active}
          className={styles.navButton}
        >
          Coins
        </NavLink>
        <NavLink
          exact
          to="/trending"
          activeClassName={styles.active}
          className={styles.navButton}
        >
          Trending
        </NavLink>
        <NavLink
          exact
          to="/global"
          activeClassName={styles.active}
          className={styles.navButton}
        >
          Global
        </NavLink>
      </nav>
    </div>
  )
}

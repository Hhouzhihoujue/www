import Link from 'next/link'
import styles from './Header.scss'

export default () => (
  <div className={styles.mainHeader}>
    <div className={styles.headerBox}>
      <img className={styles.logo} src="/static/logo.png" alt="justdodo" />
      <div className={styles.nav}>
        <Link href="/">
          <a className={styles.navItem}>博客</a>
        </Link>
      </div>
    </div>
  </div>
)
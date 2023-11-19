import styles from "./MainNavbar.module.css";
const MainNavbar = () => {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.siteName}>
        <p>Memory Threads</p>
      </a>

      <nav className={styles.nav}>
        <button className={styles.loginBtn}>Login</button>
        <button className={styles.regBtn}>Sign Up</button>
      </nav>
    </header>
  );
};

export default MainNavbar;

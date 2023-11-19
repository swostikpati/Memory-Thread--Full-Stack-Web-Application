"use client";
import styles from "./MainNavbar.module.css";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

const MainNavbar = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  return (
    <header className={styles.header}>
      <a href="/" className={styles.siteName}>
        <p>Memory Threads</p>
      </a>

      <nav className={styles.nav}>
        {isLoaded && user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <>
            <button
              className={styles.loginBtn}
              onClick={() => router.push("/sign-in")}
            >
              Login
            </button>
            <button
              className={styles.regBtn}
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default MainNavbar;

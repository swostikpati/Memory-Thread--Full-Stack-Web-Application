import styles from "./layout.module.css";

export default function layout({ children }) {
  return <main className={styles.main}>{children}</main>;
}

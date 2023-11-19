import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  if (userId) {
    //handle redirect to dashboard
    redirect("/dashboard");
  }
  return (
    <main className={styles.main}>
      <p className={styles.heading}>
        Weave Your Personal History
        <br />A Memory a Day!
      </p>
    </main>
  );
}

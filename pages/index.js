import * as React from "react";
import Head from "next/head";
import CheckboxList from "../components/CheckboxList";
import NewTaskEditor from "../components/NewTaskEditor";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next App</title>
        <meta name="description" content="My tasks app" />
      </Head>
      <div className={styles.list_container}>
        <NewTaskEditor />
        <CheckboxList />
      </div>
    </div>
  );
}

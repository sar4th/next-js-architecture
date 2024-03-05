"use client";

import Head from "next/head";
import styles from "./page.module.css";

const Home = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Scalable Next.js Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Scalable Next.js Template</h1>
        <p className={styles.description}>
          Build scalable and performant web applications with ease using Next.js.
        </p>
        <div className={styles.cta}>
          <a
            href="https://nextjs.org/docs"
            className={styles.btn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;

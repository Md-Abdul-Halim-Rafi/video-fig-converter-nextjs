import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import CircularProgress from "../components/CircularProgress";
import UploadVideo from "../components/UploadVideo";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({ log: true });

export default function Home() {
  const [ready, setReady] = useState(false);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>GIF converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to GIF converter</h1>

        <p className={styles.description}>
          Get started by uploading video file
        </p>

        <div className={styles.grid}>
          {!ready ? <CircularProgress /> : <UploadVideo ffmpeg={ffmpeg} />}
        </div>
      </main>

      <footer>
        <p className={styles.description}>
          Thanks for using this!
        </p>
      </footer>
     </div>
  );
}

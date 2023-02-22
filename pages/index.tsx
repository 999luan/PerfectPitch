import Head from "next/head";

import styles from "@/styles/Home.module.css";

import { PitchPerfect } from "@/components/PerfectPitch";
import { CodeRefactor } from "@/components/CodeRefactor";
import { useState } from "react";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("pitchPerfect");

  return (
    <>
      <Head>
        <title>Dev Companion</title>
        <meta name="description" content="Dev companion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav className={styles.nav}>
          <h3>Dev Companion</h3>
          <div>
            <button onClick={() => setActiveComponent("pitchPerfect")}>
              Criar meu resumo
            </button>
            <button onClick={() => setActiveComponent("codeRefactor")}>
              Organizar meus horários
            </button>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        {activeComponent === "pitchPerfect" && <PitchPerfect />}
        {activeComponent === "codeRefactor" && <CodeRefactor />}
      </main>
    </>
  );
}

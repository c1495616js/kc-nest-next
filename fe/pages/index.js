import Head from "next/head";
import { useKeycloak } from "@react-keycloak/ssr";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { keycloak, initialized } = useKeycloak();
  const parsedToken = keycloak?.tokenParsed;

  const loggedinState = keycloak?.authenticated ? (
    <span className="text-success">logged in</span>
  ) : (
    <span className="text-danger">NOT logged in</span>
  );

  const welcomeMessage =
    keycloak?.authenticated || (keycloak && parsedToken)
      ? `Welcome back ${parsedToken?.preferred_username ?? ""}!`
      : "Welcome visitor. Please login to continue.";

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <h1 className="mt-5">Hello Next.js + Keycloak 👋</h1>

        {keycloak?.authenticated ? (
          <>
            <button
              type="button"
              className="mx-2 btn btn-outline-primary"
              onClick={() => {
                if (keycloak) {
                  window.location.href = keycloak.createAccountUrl();
                }
              }}
            >
              My Account
            </button>

            <button
              type="button"
              className="mx-2 btn btn-outline-danger"
              onClick={() => {
                if (keycloak) {
                  window.location.href = keycloak.createLogoutUrl();
                }
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="mx-2 btn btn-outline-primary"
              onClick={() => {
                if (keycloak) {
                  window.location.href = keycloak.createRegisterUrl();
                }
              }}
            >
              Signup
            </button>

            <button
              type="button"
              className="mx-2 btn btn-outline-success"
              onClick={() => {
                if (keycloak) {
                  window.location.href = keycloak.createLoginUrl();
                }
              }}
            >
              Login
            </button>
          </>
        )}

        <div className="mb-5 lead text-muted">
          This is an example of a Next.js site using Keycloak.
        </div>

        <p>You are: {loggedinState}</p>
        <p>{welcomeMessage}</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

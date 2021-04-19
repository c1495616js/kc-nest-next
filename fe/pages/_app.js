import "../styles/globals.css";
import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";
import cookie from "cookie";

const keycloakCfg = {
  realm: process.env.KC_REALM || "kc_realm",
  url: process.env.REALM_AUTH_URL || "http://localhost:8081/auth",
  clientId: "fe-client",
};

function MyApp({ Component, pageProps, cookies }) {
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
    >
      <Component {...pageProps} />
    </SSRKeycloakProvider>
  );
}

function parseCookies(req) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
}

MyApp.getInitialProps = async (context) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req),
  };
};

export default MyApp;

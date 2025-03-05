// _app.js or _app.tsx

import { ThemeProvider } from "../app/context/themeContext"; // Adjust path as needed

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

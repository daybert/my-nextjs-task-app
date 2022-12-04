import * as React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import NavBar from "../components/NavBar";
import TaskContext from "../states/context";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const [tasks, setTasks] = React.useState(["Tasks1", "Task2"]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <TaskContext.Provider value={[tasks, setTasks]}>
          <NavBar />
          <Component {...pageProps} />
        </TaskContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;

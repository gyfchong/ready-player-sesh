import { css, Global } from "@emotion/react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  defaultTheme,
  Provider as SpectrumProvider,
} from "@adobe/react-spectrum";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

root.render(
  <SpectrumProvider theme={defaultTheme}>
    <QueryClientProvider client={queryClient}>
      <Global
        styles={css`
          body {
            font-family: "Noto Sans", sans-serif;
            background-color: #191919;
            color: #fff;
          }

          a {
            color: #c84b31;
          }
        `}
      />
      <App />
    </QueryClientProvider>
  </SpectrumProvider>
);

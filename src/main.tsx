import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider } from "react-redux";
import { store } from "./store";

import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Suspense fallback={<div>App is loading...</div>}>
            <App />
          </Suspense>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);

import "./App.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routeTree } from "./routeTree.gen";
import { getDefaultStore } from "jotai";
import { authAtom } from "./atoms/authAtom";

const store = getDefaultStore();
const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: {
      isLogged: () => store.get(authAtom),
    },
    queryClient: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
function App() {
  // Set up a Router instance

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider
        context={{
          ...router.options.context,
          queryClient, // ここでセット
        }}
        router={router}
        defaultNotFoundComponent={() => <h1>見つからず</h1>}
      />
    </QueryClientProvider>
  );
}

export default App;

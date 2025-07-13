import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import ThemeProvider from "@/providers/ThemeProvider";
import { store, persistor } from "@/redux/config";
import { SwapForm } from "@/components/templates";
import { Toaster } from "@/libs/ui/sonner";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <SwapForm />
          </div>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

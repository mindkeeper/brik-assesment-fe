import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { PersistGate } from "redux-persist/integration/react";
import MainLayout from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Product from "./pages/Product/Product";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Product />} />
            </Routes>
          </MainLayout>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

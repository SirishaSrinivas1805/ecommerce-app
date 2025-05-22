

import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import Cart from "./components/Cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartContextProvider from "./context/CartContextProvider";
import Login from "./components/Login";
import Register from "./components/Register";


// Create and export the context here
export const ProductDetailsContext = createContext();
function App() {
  const [products, setProducts] = useState([]);
  // Context value
  const productsContextValue = { products, setProducts };
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <CartContextProvider>
        <ProductDetailsContext.Provider value={productsContextValue}>
          <div className="d-flex flex-column min-vh-100">
            <Header onSearch={setSearchTerm} />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Products searchTerm={searchTerm} />} />
                <Route path="/signin" element={<Login/>}></Route>
                <Route path="/signup" element={<Register/>}></Route>
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ProductDetailsContext.Provider>
      </CartContextProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

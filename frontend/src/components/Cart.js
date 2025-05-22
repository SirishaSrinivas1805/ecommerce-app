import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import CartEmpty from "./CartEmpty";
import { CartContext } from '../context/CartContextProvider';
import axios from 'axios';


function Cart() {
  const { grandTotal, itemsCount, cartItems, setCartItems, updateQuantity, deleteItem } = useContext(CartContext)

  useEffect(() => {
    axios.get("http://localhost:3002/products")
      .then(async (res) => {
        if (res.status === 200 && res.data.length > 0) {
          const localCart = res.data;

          const productRequests = localCart.map(item =>
            axios.get(`https://fakestoreapi.com/products/${item.id}`)
              .then(productRes => ({
                ...productRes.data,
                quantity: item.quantity
              }))
          );

          const combinedData = await Promise.all(productRequests);
          setCartItems(combinedData);
        } else {
          setCartItems([]);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;


  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = cartItems.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          <div className="container my-3">
            {currentItems.map((item) => (
              <div key={item.id} className="card mb-4 p-3 shadow-sm">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3 text-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid"
                      style={{ maxHeight: "150px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h6 className="card-title">{item.title}</h6>
                      <p className="mb-1"><strong>Price:</strong> ${item.price}</p>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        {item.quantity === 1 ? (
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => deleteItem(item.id)}
                            title="Remove Item"
                          >
                            🗑️
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            title="Decrease Quantity"
                          >
                            -
                          </button>
                        )}
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          title="Increase Quantity"
                        >+</button>
                      </div>
                      <p><strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-center">
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

              <div className="me-3 mt-4 ms-auto">
                <Link to="/" className="btn btn-secondary mt-3">
                  Shop More
                </Link>
                <Link to="/" className="btn btn-secondary mt-3">
                  Shop More
                </Link>
              </div>

            {/* Grand Total */}
            <div className="text-end me-3 mt-4">
              <h5>Total Cart Value({itemsCount} items): <span className="text-success">${grandTotal.toFixed(2)}</span></h5>
            </div>
            <div className="text-end me-3 mt-4">
              <button className="btn btn-warning fs-5 px-4 py-2">Place Order</button>
            </div>

          </div>
        </>
      ) : (
        <CartEmpty />
      )}
    </>
  );
}

export default Cart;


import { useContext, useEffect, useState } from "react";
import Product from './Product';
import Loading from "./Loading";
import { ProductDetailsContext } from "../App";
import FilterSideBar from "./FilterSideBar";

function Products({ searchTerm }) {
  const { products, setProducts } = useContext(ProductDetailsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(""); // filter state
  const [selectedPrice, setSelectedPrice] = useState("");       // filter state
  const itemsPerPage = 4;

  useEffect(() => {
    if (products.length === 0) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    }
  }, [products, setProducts]);

  // Reset current page if filtered products change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedPrice]);

  if (products.length === 0) {
    return (
      <Loading />
    );
  }

  // Filtering logic
  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  if (selectedPrice) {
    filteredProducts = filteredProducts.filter((p) => {
      const price = p.price;
      switch (selectedPrice) {
        case "0-50":
          return price <= 50;
        case "50-100":
          return price > 50 && price <= 100;
        case "100-150":
          return price > 100 && price <= 150;
        case "150+":
          return price > 150;
        default:
          return true;
      }
    });
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="d-flex" style={{ gap: '20px', padding: '10px' }}>
      {/* Sidebar Filter */}
      <FilterSideBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />

      {/* Products Grid */}
      <div style={{ flex: 1 }}>
        <div
          className="product-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '15px',
          }}
        >
          {visibleProducts.map((product) => (
            <Product
              key={product.id}
              title={product.title}
              img={product.image}
              price={product.price}
              id={product.id}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
              style={{
                margin: '0 5px',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: currentPage === i + 1 ? '#007bff' : '#e0e0e0',
                color: currentPage === i + 1 ? 'white' : 'black',
                border: 'none',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;

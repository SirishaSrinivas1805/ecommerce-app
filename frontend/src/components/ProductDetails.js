import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { CartContext } from "../context/CartContextProvider";


function ProductDetails() {
  const { isDisabled,gotocart } = useContext(CartContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />
  if (!product) return <NotFound />

  const goBack = () => navigate(-1);

  return (
    <div className="container my-2">
      <div className="row product-details-wrapper">
        <div className="col-md-5 text-center">
          <img src={product.image} alt={product.title} className="product-details-image" />
        </div>

        <div className="col-md-7">
          <h3 className="product-details-title">{product.title}</h3>
          <p className="product-details-description">{product.description}</p>

          <div className="product-details-meta">
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="product-rating">
              <span>⭐ {product.rating.rate}</span>
              <span>({product.rating.count} reviews)</span>
            </div>
          </div>
          <div className="product-details-buttons mt-3">
            <button onClick={goBack} className="btn btn-primary me-2">Go Back</button>
            <button className={`btn btn-success ${isDisabled ? "disabled" : ""}`} disabled={isDisabled} onClick={() => gotocart(product.id)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContextProvider';


function Product(props) {
    const { isDisabled, gotocart } = useContext(CartContext)

    const navigate = useNavigate();
    const gotodetails = () => {
        navigate(`/products/${props.id}`)
    }

    return (
        <div className="card shadow-sm h-100 text-center">
            <img src={props.img} className="card-img-top p-3" alt={props.title} style={{ maxHeight: "200px", objectFit: "contain" }} />
            <div className="card-body d-flex flex-column justify-content-between">
                <h6 className="card-title text-truncate">{props.title}</h6>
                <p className="product-price">${props.price.toFixed(2)}</p>
                <div className="mt-3 d-flex justify-content-center gap-2">
                    <button className="btn btn-outline-primary btn-sm px-3 py-2" onClick={gotodetails}>
                        View Details
                    </button>
                    <button className={`btn btn-outline-success btn-sm px-3 py-2 ${isDisabled ? "disabled" : ""}`} disabled={isDisabled} onClick={() => gotocart(props.id)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
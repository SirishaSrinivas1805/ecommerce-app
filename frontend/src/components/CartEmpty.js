import { Link } from 'react-router-dom';

function CartEmpty() {
  return (
    <div className="container text-center py-5">
      <img
        src="/emptycart.png"
        alt="Empty cart"
        className="img-fluid mb-4"
        style={{ maxWidth: '150px' }}
      />

      <h4 className="mb-3">Your cart is empty</h4>
      <p className="mb-4">Looks like you haven’t added anything to your cart yet.</p>
      <Link to="/" className="btn btn-primary">
        Start Shopping
      </Link>
    </div>
  );
}

export default CartEmpty;

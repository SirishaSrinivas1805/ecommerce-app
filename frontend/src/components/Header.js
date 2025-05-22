

import { useState, useContext,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContextProvider';
import ProfileMenu from './ProfileMenu';
import { toast } from 'react-toastify';
import { logout } from '../utils/firebaseAuthService';
import Loading from './Loading';
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";



function Header({ onSearch }) {
    const { itemsCount, isDisabled, setIsDisabled } = useContext(CartContext)

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Loading auth/user data
    const [user, setUser] = useState(null);


    // Monitor Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    if (loading) return <Loading />;

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);  // Notify parent of new search input
    };

    const goCart = () => {
        navigate("/cart")
    }

    const signOut = async () => {
        setIsDisabled(true);
        navigate("/signin")
        try {
            await logout();
            toast.success("Logged out successfully.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
            });
        } catch (error) {
            toast.error("Logout failed: " + error.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
            });
        } finally {
            setTimeout(() => setIsDisabled(false), 2500);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fw-bold">
                    <img src="https://cdn-icons-png.flaticon.com/512/891/891462.png" alt="Logo" width="35" height="35" className="me-2" />
                    ShopEase
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <form className="d-flex ms-auto me-3 my-2 my-lg-0 w-100 w-md-50" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="🔍 Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </form>
                    <div className="d-flex align-items-center gap-3 text-light">
                        <div
                            className="position-relative text-light fw-semibold me-3"
                            style={{ cursor: 'pointer' }}
                            onClick={goCart}
                        >
                            <FaShoppingCart className="me-1" size={20} />
                            <span className="ms-1">Cart</span>

                            {itemsCount > 0 && (
                                <span
                                    className="position-absolute translate-middle badge rounded-pill bg-danger"
                                    style={{
                                        fontSize: '0.65rem',
                                        top: '5px',
                                        right: '-10px',
                                        padding: '4px 6px',
                                        zIndex: 1
                                    }}
                                >
                                    {itemsCount}
                                </span>
                            )}
                        </div>

                        <ProfileMenu user={user}/>
                        <button className={`btn btn-light btn-sm ${isDisabled ? 'disabled' : ''}`} disabled={isDisabled} onClick={signOut}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Header;

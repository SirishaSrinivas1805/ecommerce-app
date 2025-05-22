import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect, createContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Loading from '../components/Loading';




export const CartContext = createContext();

function CartContextProvider({ children }) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [itemsCount, setItemsCount] = useState(0)
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const naviagte = useNavigate()

    // Monitor Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    // Recalculate grand total and items whenever cartItems change
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
        setGrandTotal(total);
        setItemsCount(itemsCount)
    }, [cartItems]);

    if (loading) return <Loading />;


    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return
        axios.patch(`http://localhost:3002/products/${id}`, { quantity: newQty })
            .then(() => {
                setCartItems(prev =>
                    prev.map(item =>
                        item.id === id ? { ...item, quantity: newQty } : item
                    )
                );
            })
            .catch(err => console.log(err))
    };

    const deleteItem = (id) => {
        axios.delete(`http://localhost:3002/products/${id}`)
            .then(() => {
                setCartItems(cartItems.filter(item => item.id !== id));
            })
            .catch(err => console.log(err))
    };

    const gotocart = (id) => {
        setIsDisabled(true);

        if (user && user.email) {
            axios.get(`http://localhost:3002/products/${id}`)
                .then((res) => {
                    const currentQty = res.data.quantity || 0;
                    axios.patch(`http://localhost:3002/products/${id}`, {
                        quantity: currentQty + 1
                    }).then(() => {
                        setCartItems(prev =>
                            prev.map(item =>
                                item.id === id ? { ...item, quantity: currentQty + 1 } : item
                            )
                        );
                        toast.success('Product added to cart!', {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                        });
                    }).catch((err) => {
                        console.log(err);
                        toast.error('Error adding product to cart!', {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                        });
                    }).finally(() => {
                        // ✅ Re-enable button after toast duration
                        setTimeout(() => setIsDisabled(false), 1000);
                    });
                })
                .catch((err) => {
                    if (err.response && err.response.status === 404) {
                        axios.post(`http://localhost:3002/products`, {
                            id,
                            quantity: 1
                        }).then(() => {
                            setCartItems(prev => [...prev, { id, quantity: 1 }]);
                            toast.success('Product added to cart!', {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                            });
                        }).catch((err) => {
                            console.log(err);
                            toast.error('Error adding product to cart!', {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                            });
                        }).finally(() => {
                            setTimeout(() => setIsDisabled(false), 1000);
                        });
                    } else {
                        console.log(err);
                        toast.error('Unexpected error!', {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                        });
                        setTimeout(() => setIsDisabled(false), 1000);
                    }
                });
        }else{
            naviagte("/signin")
            setTimeout(() => setIsDisabled(false), 1000);
        }

    };



    return (
        <CartContext.Provider value={{ isDisabled, grandTotal, itemsCount, cartItems, setIsDisabled, setCartItems, gotocart, updateQuantity, deleteItem }}>
            {children}
        </CartContext.Provider>
    );
}


export default CartContextProvider;
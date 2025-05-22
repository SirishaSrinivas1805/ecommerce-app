import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { toast } from 'react-toastify';
import { register } from "../utils/firebaseAuthService";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false)
    const navigate = useNavigate();


    let changeEmail = (e) => {
        setEmail(e.target.value)
    }
    let changePass = (e) => {
        setPassword(e.target.value)
    }

    const addUser = async (e) => {
        e.preventDefault();
        setIsDisabled(true);

        try {
            const res = await register(email, password);
            const user = res.user;

            toast.success(`Registration successful for user ${user.email }.`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
            });

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email already exists. Try logging in.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            } else {
                toast.error("Registration failed: " + error.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            }
        } finally {
            setTimeout(() => setIsDisabled(false), 2500);
        }
    };

    return (
        <>
            <div className="bg-login d-flex justify-content-center align-items-center min-vh-100 bg-wrapper position-relative">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-4">
                            <h3 className="text-center text-dark mb-4 fw-bold">Sign up</h3>
                            <form onSubmit={addUser}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={changeEmail}
                                        className={`form-control rounded-3 ${isDisabled ? 'disabled' : ''}`}
                                        disabled={isDisabled}
                                        id="email"
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={changePass}
                                        className={`form-control rounded-3 ${isDisabled ? 'disabled' : ''}`}
                                        disabled={isDisabled}
                                        id="password"
                                        required
                                        placeholder="Enter password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`btn btn-dark w-100 fw-semibold rounded-pill ${isDisabled ? 'disabled' : ''}`}
                                    disabled={isDisabled}
                                >
                                    Create Account
                                </button>
                                <div className="text-center mt-3">
                                    <small className="text-dark">
                                        Existing User? <Link to="/signin" className="text-decoration-none fw-semibold">Login</Link>
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;




import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { login } from '../utils/firebaseAuthService';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    let navigate = useNavigate()

    let changeEmail = (e) => {
        setEmail(e.target.value)
    }
    let changePassword = (e) => {
        setPassword(e.target.value)
    }

    const loginData = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        try {
            await login(email, password);

            toast.success("Login successful!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
            });
            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                toast.error("Account does not exist. Please register.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            } else if (error.code === 'auth/wrong-password') {
                toast.error("Incorrect password. Please try again.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            } else {
                toast.error("Login failed: " + error.message, {
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
            <div className="bg-login d-flex justify-content-center align-items-center min-vh-100 position-relative">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4 fw-semibold text-dark">Sign in</h3>
                            <form onSubmit={loginData}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-bold">Email</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={changeEmail}
                                        className={`form-control rounded-3 ${isDisabled ? "disabled" : ""}`}
                                        disabled={isDisabled}
                                        id="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={changePassword}
                                        className={`form-control rounded-3 ${isDisabled ? "disabled" : ""}`}
                                        disabled={isDisabled}
                                        id="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`btn btn-dark w-100 rounded-pill fw-semibold ${isDisabled ? "disabled" : ""}`}
                                    disabled={isDisabled}
                                >
                                    Login
                                </button>
                                <div className="text-center mt-3">
                                    <small>
                                        New Customer? <Link to="/signup" className="fw-semibold text-decoration-none">Register</Link>
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

export default Login;


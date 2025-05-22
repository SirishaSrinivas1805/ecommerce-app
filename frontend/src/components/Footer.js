

function Footer() {
    return (
        <>
            <div className="bg-dark text-light p-4 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <h6>GET TO KNOW US</h6>
                            <p>About Us</p>
                            <p>Our Expertise</p>
                            <p>Testimonials</p>
                        </div>
                        <div className="col-md-2">
                            <h6>KEEP IN TOUCH</h6>
                            <p>Facebook</p>
                            <p>Twitter</p>
                            <p>Instagram</p>
                        </div>
                        <div className="col-md-2">
                            <h6>CUSTOMER POLICIES</h6>
                            <p>FAQs</p>
                            <p>Terms of Use</p>
                            <p>Privacy Policy</p>
                        </div>
                        <div className="col-md-3">
                            <h6>CONTACT US</h6>
                            <p>Address: 123 Street</p>
                            <p>Phone: +1234567890</p>
                            <p>Email: support@example.com</p>
                        </div>
                        <div className="col-md-3">
                            <h6>EXPERIENCE APP ON MOBILE</h6>
                            <div className="d-flex gap-2 mt-2">
                                <button className="btn btn-light btn-sm">Google Play</button>
                                <button className="btn btn-light btn-sm">Apple Store</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
import notfoundgif from "../assets/notfound.gif";


function NotFound() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <img src={notfoundgif} alt="404 Not Found"
                className="img-fluid"
                style={{ maxWidth: '300px' }} /></div>
    );
};

export default NotFound;
import loadinggif from "../assets/loading.gif";

function Loading(){
    return(
        <div className="loader-container"><img src={loadinggif} id="loading" alt="Loading..." /></div>
    );
};

export default Loading;
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ProfileMenu = ({user}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Toggle Button */}
      <span
        className="text-light fw-semibold"
        style={{ cursor: 'pointer' }}
        onMouseOver={() => setIsExpanded(!isExpanded)}
      >
        <FaUser className="me-1" /> {user?user.email:"Profile"}
      </span>

      {/* Dropdown Menu */}
      {isExpanded && (
        <div
          className="bg-light text-dark p-2 rounded shadow"
          style={{
            position: "absolute",
            top: "50px",
            right: "-80px",
            minWidth: "120px",
            zIndex: 1000
          }}
        >
          <div className="dropdown-item" style={{ cursor: "pointer" }}> New user? <Link className="fw-semibold text-decoration-none" to = '/signin' onClick={()=>setIsExpanded(!isExpanded)}>Login</Link></div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

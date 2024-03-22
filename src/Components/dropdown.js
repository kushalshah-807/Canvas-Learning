import React, { useState } from "react";
import "../css/style.css"; // Import your CSS file
import Modal from "./Modal";

const DropDownProfile = ({ email, closeModal }) => {
  const handleSubmit = () => {
    window.location.href = "/login";
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfile = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col dropDownProfile">
      <ul className="ul-list">
        <li
          style={{ marginBottom: "15px" }}
          onClick={handleProfile}
          className="logout-button"
        >
          <i className="fas fa-user icon"></i> Profile
        </li>
        <li onClick={handleSubmit} className="logout-button">
          <i className="fas fa-sign-out-alt icon"></i> Logout
        </li>
      </ul>
      {isModalOpen && <Modal email={email} closeModal={closeModal} />}
    </div>
  );
};

export default DropDownProfile;

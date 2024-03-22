import React, { useState, useEffect } from "react";
import "../css/modal.css"; // Import your CSS file
import { url2 } from "../globalUrl";

const Modal = ({ email, closeModal }) => {
  const [modal, setModal] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const loadPrograms = async () => {
    fetch(`${url2}/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}`,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('name',data);
        const {first_name, last_name, role} = data;
        setFname(first_name);
        setLname(last_name);
        setRole(role);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
    closeModal();
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    loadPrograms();
    setModal(!modal);
  }, []);

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h3>Profile Details</h3>
            <p>
              Name: {fname} {lname} <br></br>
              Email: {email} <br></br>
              Role: {role}
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;

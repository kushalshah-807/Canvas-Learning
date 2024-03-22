import React, { useState } from "react";
import "../css/signup.css";
import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";
function EditProfile() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
  const goBack = () => {
    window.history.back();
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // if (!/^[a-zA-Z]{3,10}$/.test(firstname)) {
    //   Swal.fire("Error!", "Please enter a valid first name", "error");
    //   return;
    // }
    // if (!/^[a-zA-Z]{3,10}$/.test(lastname)) {
    //   Swal.fire("Error!", "Please enter a valid last name", "error");
    //   return;
    // }
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   Swal.fire("Error!", "Please enter a valid email", "error");
    //   return;
    // }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\s]).{8,}$/.test(
        newPassword
      )
    ) {
      Swal.fire("Error!", "Please enter a valid password format", "error");
      return;
    }
    fetch(`${url2}/updatePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}&newPassword=${newPassword}&oldPassword=${oldPassword}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.startsWith("Login Successful")) {
          const roleIndex = data.indexOf("| Role:");
          const userRole = data.substring(roleIndex + 8).trim();
          Swal.fire(
            "Success!",
            "Details updated successfully!",
            "success"
          ).then((result) => {

            if (result.isConfirmed && userRole === "Admin") {
              window.location.href = `/admin?email=${email}`;
            } else if (result.isConfirmed && userRole === "Student") {
              window.location.href = `/student?email=${email}`;
            } else if (result.isConfirmed && userRole === "Instructor") {
              window.location.href = `/instructor?email=${email}`;
            } else if (
              result.isConfirmed &&
              userRole === "Program Coordinator"
            ) {
              window.location.href = `/pc?email=${email}`;
            } else {
              window.location.href = `/QAOrganizer?email=${email}`;
            }
          });
        } else if(data.startsWith("Wrong Password")) {
          Swal.fire("Oops!", "Incorrect Current Password", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while registering the user.",
          "error"
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/admin";
          }
        });
      });
  };
  return (
    <div className="signbody">
      <header>
        <img className="signuplogo" src={avatar} alt="skillbridge" />
      </header>
      <div className="signlogin-wrapper">
        <form onSubmit={handleFormSubmit} method="POST" className="signform">
          <h3>Update Password</h3>
          {/* <div className="signinput-group">
            <input
              type="text"
              name="firstname" // Set the name attribute to "firstname"
              id="loginUser"
              onChange={(e) => setFirstname(e.target.value)} // Extract and set the value
              required
            />
            <label for="loginUser">First Name</label>
          </div>
          <div className="signinput-group">
            <input
              type="text"
              name="lastname" // Set the name attribute to "lastname"
              id="loginUser"
              onChange={(e) => setLastname(e.target.value)} // Extract and set the value
              required
            />
            <label for="loginUser">Last Name</label>
          </div>
          <div className="signinput-group">
            <input
              type="text"
              name="email" // Set the name attribute to "email"
              id="loginUser"
              value={email}
              required
            />
            <label for="loginUser">Email</label>
          </div> */}
          <div className="signinput-group">
            <input
              type="password"
              name="oldPassword" // Set the name attribute to "password"
              id="loginPassword"
              onChange={(e) => setOldPassword(e.target.value)} // Extract and set the value
              required
            />
            <label for="loginPassword">Old Password</label>
          </div>
          <div className="signinput-group">
            <input
              type="password"
              name="newPassword" // Set the name attribute to "password"
              id="loginPassword"
              onChange={(e) => setNewPassword(e.target.value)} // Extract and set the value
              required
            />
            <label for="loginPassword">New Password</label>
          </div>
          {/* <div className="signinput-group">
            <input
              type="password"
              name="newPassword" // Set the name attribute to "password"
              id="loginPassword"
              onChange={(e) => setPassword(e.target.value)} // Extract and set the value
              required
            />
            <label for="loginPassword">ConPassword</label>
          </div> */}

          <input type="submit" value="Update" className="signsubmit-btn" />
          <button onClick={goBack} className="signforgot-pw">
            Go Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;

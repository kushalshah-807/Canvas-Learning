import React, { useState } from "react";
import "../css/signup.css";

import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { url2 } from "../globalUrl";

function AddUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const passemail = searchParams.get("email");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z]{3,10}$/.test(firstname)) {
      Swal.fire("Error!", "Please enter a valid first name", "error");
      return;
    }
    if (!/^[a-zA-Z]{3,10}$/.test(lastname)) {
      Swal.fire("Error!", "Please enter a valid last name", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire("Error!", "Please enter a valid email", "error");
      return;
    }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\s]).{8,}$/.test(
        password
      )
    ) {
      Swal.fire("Error!", "Please enter a valid password format", "error");
      return;
    }
    if (role === "") {
      Swal.fire("Error!", "Please select a role", "error");
      return;
    }
    fetch(`${url2}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `firstname=${firstname}&lastname=${lastname}&email=${email}&password=${password}&role=${role}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "User registered successfully") {
          Swal.fire(
            "Success!",
            "User registered successfully!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/admin?email=${passemail}`;
            }
          });
        } else if (data === "User already exists") {
          Swal.fire(
            "Oops!",
            "User already exists. Please try again!",
            "error"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/admin?email=${passemail}`;
            }
          });
        } else {
          Swal.fire("Oops!", "Failed to register user", "error").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/admin?email=${passemail}`;
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while registering the user.",
          "error"
        ).then((result) => {
          // if (result.isConfirmed) {
          //   window.location.href = `/admin?email=${passemail}`;
          // }
        });
      });
  };

  return (
    <div>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="../css/signup.css" />
          <title>Add User</title>
        </head>
        <body className="signbody">
          <header>
            <img className="signuplogo" src={avatar} alt="skillbridge" />
          </header>
          <div className="signlogin-wrapper">
            <form
              onSubmit={handleFormSubmit}
              method="POST"
              className="signform"
            >
              <h3>Add User</h3>
              <div className="signinput-group">
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
                  onChange={(e) => setEmail(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">Email</label>
              </div>
              <div className="signinput-group">
                <input
                  type="password"
                  name="password" // Set the name attribute to "password"
                  id="loginPassword"
                  onChange={(e) => setPassword(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginPassword">Password</label>
              </div>
              <div className="signselect-container">
                <select onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Your Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Program Coordinator">
                    Program Coordinator
                  </option>
                  <option value="QA Officer">QA Officer</option>
                </select>
                <div className="signselect-arrow"></div>
              </div>
              <input
                type="submit"
                value="Continue"
                className="signsubmit-btn"
              />
              {/* <a href="login.html" className="signforgot-pw">Sign in instead</a> */}
              <Link to={`/admin?email=${passemail}`} className="signforgot-pw">
                Go Back
              </Link>
            </form>
          </div>
        </body>
      </html>
    </div>
  );
}

export default AddUser;

import React, { useState } from "react";
import "../css/login.css";
import "../App.css";
import { Link } from "react-router-dom";
import avatar from "../assets/logo.png";
import avatar1 from "../assets/avatar.png";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { url2 } from "../globalUrl";

function Login() {
  const [email, setEmail] = useState("");
  const [emailreset, setEmailReset] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${url2}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}&password=${password}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.startsWith("Login Successful")) {
          const roleIndex = data.indexOf("| Role:");
          if (roleIndex !== -1) {
            const userRole = data.substring(roleIndex + 8).trim();
            console.log(userRole)            
            switch (userRole) {
              case "Admin":
                window.location.href = `/admin?email=${email}`;
                break;
              case "Student":
                window.location.href = `/student?email=${email}`;
                break;
              case "Instructor":
                window.location.href = `/instructor?email=${email}`;
                break;
              case "Program Coordinator":
                window.location.href = `/pc?email=${email}`;
                break;
              default:
                window.location.href = `/QAOrganizer?email=${email}`;
                break;
            }
          }
        } else if(data.startsWith("Not Verified")){
          const roleIndex = data.indexOf("| Role:");
          if (roleIndex !== -1){
            const userRole = data.substring(roleIndex + 8).trim();
            Swal.fire("Success!", "Please verify you Number", "success").then(
              (result) => {
                if (result.isConfirmed) {
                  window.location.href = `/verifyNumber?email=${email}&role=${userRole}`;
                }
              }
            );
          }
          
        }else{
          Swal.fire("Oops!", "Invalid email or password", "error").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = "/login";
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFormReset = (e) => {
    e.preventDefault();
    fetch("https://sxt9335.uta.cloud/forgotpassword.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${emailreset}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Email Sent") {
          Swal.fire("Success!", "Email Sent successfully!", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = "/login";
              }
            }
          );
        } else if (data === "Not a registered user") {
          Swal.fire(
            "Oops!",
            "<div style='font-size: 14px;'>Not a registered user. Please sign up and try again.",
            "error"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/signup";
            }
          });
        } else if (data === "Something went wrong") {
          Swal.fire(
            "Oops!",
            "There seems to be an issue. Please try again after sometime",
            "error"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/login";
            }
          });
        } else {
          Swal.fire(
            "Oops!",
            "Failed to send email. Please try again.",
            "error"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/login";
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while sending the email.",
          "error"
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });
      });
  };
  return (
    <div className="loginclass">
      <header>
        {/* <a href="index.html">
          <img className="loginlogo" src="images/logo.png" alt="" />
        </a> */}
        <Link to="/home" data-after="About">
          <img className="loginlogo" src={avatar} alt="skillbridge" />
        </Link>
      </header>
      <div className="login-wrapper">
        <form onSubmit={handleFormSubmit} className="loginform">
          <img src={avatar1} alt="skillbridge" />
          <h2>Login</h2>
          <div className="logininput-group">
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              id="loginUser"
              required
            />
            <label htmlFor="loginUser">Email</label>
          </div>
          <div className="logininput-group">
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              id="loginPassword"
              required
            />
            <label htmlFor="loginPassword">Password</label>
          </div>
          <input type="submit" value="Login" className="loginsubmit-btn" />
          
          <Link to="/forgetPassword" className="login-link">
              Forget Password?
            </Link>
          <p className="login-para" style={{ fontSize: "1.5rem" }}>
            New to SkillBridge?<span> </span>
            <Link to="/signup" className="login-link">
              Sign up now
            </Link>
          </p>
        </form>
        <div id="forgot-pw">
          <form onSubmit={handleFormReset} className="loginform">
            <a href="#" className="loginclose">
              &times;
            </a>
            <h2>Reset Password</h2>
            <div className="logininput-group">
              <input
                type="email"
                name="email"
                onChange={(e) => setEmailReset(e.target.value)}
                id="email"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <input type="submit" value="Submit" className="loginsubmit-btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

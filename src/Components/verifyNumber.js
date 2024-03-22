import React, { useState } from "react";
import "../css/login.css";
import "../App.css";
import { Link } from "react-router-dom";
import avatar from "../assets/logo.png";
import avatar1 from "../assets/avatar.png";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { url2 } from "../globalUrl";
import axios from "axios";
import OpenAI from 'openai';

import { useLocation } from "react-router-dom";

const roleMap = {
  Admin: "admin",
  Student: "student",
  Instructor: "instructor",
  "Program Coordinator": "pc",
  "QA Officer": "QAOrganizer",

}
function Login() {
  const [phone, setPhone] = useState("");
  const [emailreset, setEmailReset] = useState("");
  // const [password, setPassword] = useState("");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const email = params.get("email");
  const [otp, setOtp] = useState("");
  const role= params.get("role");

  const sendOtp = async(e) => {
    e.preventDefault();
    try{
      // const chatCompletion = await openai.chat.completions.create({
      //   messages: [{ role: 'assistant', content: 'what is a react.js i nwe development' }],
      //   model: 'gpt-3.5-turbo',
      // });
      // console.log(chatCompletion.data);
        const res = await axios.post(`${url2}/sendOtp`, {phone: phone, email: email})
        if(res.data){
          alert("OTP sent successfully")
        }
    }catch(e){
      console.log(e)
      Swal.fire(
        "Oops!",
        "Failed to send otp. Please try again.",
        "error"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };
  const verifyNumber = async(e) => {
    e.preventDefault();
    try{
      // const chatCompletion = await openai.chat.completions.create({
      //   messages: [{ role: 'assistant', content: 'what is a react.js i nwe development' }],
      //   model: 'gpt-3.5-turbo',
      // });
      // console.log(chatCompletion.data);
        const res = await axios.post(`${url2}/verifyNumber`, {otp: otp, email: email})
       
          if (res.data.startsWith("Login Successful")) {
            const roleIndex = res.data.indexOf("| Role:");
            if (roleIndex !== -1) {
              const userRole = res.data.substring(roleIndex + 8).trim();
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
        }
    }catch(e){
      console.log(e)
      Swal.fire(
        "Oops!",
        "Failed to send otp. Please try again.",
        "error"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
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
        <form  className="loginform">
          <img src={avatar1} alt="skillbridge" />
          <h2>Verify Number</h2>
          <div style={{display:'flex'}}>
          <div className="logininput-group">
            <input
              type="text"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              id="loginUser"
              required
            />
            <label htmlFor="loginUser">Phone Number</label>
          </div>
          <button style={{height:'40px',marginLeft:'20px', color:"black",backgroundColor:"#ffff"}} onClick={sendOtp}>send otp</button>
          </div>
          <div style={{display:'flex'}}>
          <div className="logininput-group">
            <input
              type="text"
              name="otp"
              onChange={(e) => setOtp(e.target.value)}
              id="loginUser"
              required
            />
            <label htmlFor="loginUser">Otp</label>
          </div>
          <button style={{height:'40px',marginLeft:'20px', color:"black",backgroundColor:"#ffff"}} onClick={verifyNumber}>verify otp</button>
          </div>
         
          {/* <input type="submit" value="Generated password" className="loginsubmit-btn" /> */}
          {/* <a href="#forgot-pw" class="forgot-pw">
            Need help?
          </a> */}
          <p className="login-para" style={{ fontSize: "1.5rem" }}>
            New to SkillBridge?<span> </span>
            <Link to="/signup" className="login-link">
              Sign up now
            </Link> <br></br>
            <Link to={`/${roleMap[role]}?email=${email}`} className="login-link">
             skip verification
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

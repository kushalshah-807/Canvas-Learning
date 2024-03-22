import React, { useEffect, useState } from "react";
import "../css/signup.css";

import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";
import axios from "axios";

function AddProgram() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  //   const [p_id, setPId] = useState("");
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const [programOrganizer, setProgramOrganizer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [role, setRole] = useState("");

  const goBack = () => {
    window.history.back();
  };
  const getRole = async() => {
    try{
      const res = await axios.post(`${url2}/getRole`, {email: email});
      console.log(res);
      setRole(res.data)
    }catch(error){
      console.log(error);
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${url2}/addProgram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `programName=${programName}&programOrganizer=${programOrganizer}&programDescription=${programDescription}&startDate=${startDate}&endDate=${endDate}&venue=${venue}`,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (data === "Program added successfully") {
          Swal.fire("Success!", "Program added successfully!", "success").then(
            (result) => {
              if (result.isConfirmed && role === "Program Coordinator") {
                window.location.href = `/pc?email=${email}`;
              }
              else if (result.isConfirmed ) {
                window.location.href = `/admin?email=${email}`;
              }
            }
          );
        } else {
          alert(data);
          Swal.fire("Oops!", "Failed to add Program", "error").then(
            (result) => {
              if (result.isConfirmed && role === "Program Coordinator") {
                window.location.href = `/pc?email=${email}`;
              }
              else if (result.isConfirmed ) {
                window.location.href = `/admin?email=${email}`;
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while adding the Program.",
          "error"
        ).then((result) => {
          if (result.isConfirmed && role === "Program Coordinator") {
            window.location.href = `/pc?email=${email}`;
          }
          else if (result.isConfirmed ) {
            window.location.href = `/admin?email=${email}`;
          }
        });
      });
  };
  useEffect(() => {
    getRole();
  }, []);
  console.log(role);
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
          <title>Add Program</title>
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
              <h3>Add Program</h3>
              <div className="signinput-group">
                <input
                  type="text"
                  name="programName" // Set the name attribute to "firstname"
                  id="loginUser"
                  onChange={(e) => setProgramName(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">Program Name</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="programOrganizer" // Set the name attribute to "lastname"
                  id="loginUser"
                  onChange={(e) => setProgramOrganizer(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">Program Organiser</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="programDescription" // Set the name attribute to "lastname"
                  id="loginUser"
                  onChange={(e) => setProgramDescription(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">Program Description</label>
              </div>
              <div className="signinput-group">
                <input
                  type="date"
                  name="startDate" // Set the name attribute to "lastname"
                  id="loginUser"
                  placeholder="Start Date"
                  onChange={(e) => setStartDate(e.target.value)} // Extract and set the value
                  required
                />
              </div>
              <div className="signinput-group">
                <input
                  type="date"
                  name="startEnd" // Set the name attribute to "lastname"
                  id="loginUser"
                  onChange={(e) => setEndDate(e.target.value)} // Extract and set the value
                  required
                  placeholder="Course Period"
                />
              </div>

              <div className="signinput-group">
                <input
                  type="text"
                  name="venue" // Set the name attribute to "lastname"
                  id="loginUser"
                  onChange={(e) => setVenue(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">Venue</label>
              </div>

              <input
                type="submit"
                value="Continue"
                className="signsubmit-btn"
              />
              {/* <a href="login.html" className="signforgot-pw">Sign in instead</a> */}
              <button onClick={goBack} className="signforgot-pw">
                Go Back
              </button>
            </form>
          </div>
        </body>
      </html>
    </div>
  );
}

export default AddProgram;

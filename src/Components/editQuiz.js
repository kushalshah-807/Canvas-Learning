import React, { useState } from "react";
import "../css/signup.css";

import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Student from "./Student";

function EditQuiz() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const passemail = searchParams.get("passemail");
  const intialEmail_id = searchParams.get("email");
  console.log("email jsdjcf", intialEmail_id);

  const intialQuiz = {
    studentName: searchParams.get("studentName"),
    // email: searchParams.get("email"),
    exam: searchParams.get("exam"),
    startTime: searchParams.get("startTime"),
    endTime: searchParams.get("endTime"),
    quizlink: searchParams.get("quizlink"),
  };

  const [exam, setExam] = useState(intialQuiz);

  const handleInputChange = (e) => {
    // Update the course state when input fields change
    const { name, value } = e.target;
    setExam({
      ...exam,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("intialEmail_id", intialEmail_id);
    // formData.append("studentName", exam.studentName);
    formData.append("exam", exam.exam);
    formData.append("startTime", exam.startTime);
    formData.append("endTime", exam.endTime);
    formData.append("quizlink", exam.quizlink);
    fetch("https://sxt9335.uta.cloud/editQuiz.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Exam updated successfully") {
          Swal.fire("Success!", "Exam updated successfully!", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/instructor?email=${passemail}`;
              }
            }
          );
        } else {
          Swal.fire("Oops!", "Failed to update course", "error").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/instructor?email=${passemail}`;
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while updating the course.",
          "error"
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/instructor?email=${passemail}`;
          }
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
          <title>Edit Quiz</title>
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
              <h3>Edit Quiz</h3>
              <div className="signinput-group">
                <input
                  type="text"
                  name="exam"
                  id="loginUser"
                  value={exam.exam}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Exam</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="startTime"
                  id="loginUser"
                  value={exam.startTime}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Start Time</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="endTime"
                  id="loginUser"
                  value={exam.endTime}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">End Time</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="quizlink"
                  id="loginUser"
                  value={exam.quizlink}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Quiz Link</label>
              </div>

              <input
                type="submit"
                value="Continue"
                className="signsubmit-btn"
              />
              {/* <a href="login.html" className="signforgot-pw">Sign in instead</a> */}
              <Link
                to={`/instructor?email=${passemail}`}
                className="signforgot-pw"
              >
                Go Back
              </Link>
            </form>
          </div>
        </body>
      </html>
    </div>
  );
}

export default EditQuiz;

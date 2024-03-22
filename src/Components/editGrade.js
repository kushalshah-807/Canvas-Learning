import React, { useState } from "react";
import "../css/signup.css";

import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";

function EditGrade() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const passemail = searchParams.get("passemail");
  const intialEmail_id = searchParams.get("email");
  const role = searchParams.get("role");
  const courseId = searchParams.get("courseId");
  // console.log("email jsdjcf", intialEmail_id);

  const intialQuiz = {
    studentName: searchParams.get("studentName"),
    // email: searchParams.get("email"),
    grade: searchParams.get("grade"),
    percentage: searchParams.get("percentage"),
    resources: searchParams.get("resources"),
    id: searchParams.get("id"),
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
    formData.append("courseId", courseId);
    formData.append("grade", exam.grade);
    formData.append("percentage", exam.percentage);
    formData.append("resources", exam.resources);
    formData.append("id", intialQuiz.id);
    alert(intialEmail_id);
    // alert(exam.grade);
    fetch(`${url2}/editGrade`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("djhsjhsgdejhghj", data);
        if (data === "Grade updated successfully") {
          Swal.fire("Success!", "Grade updated successfully!", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/${role}?email=${passemail}`;
              }
            }
          );
        } else {
          alert(data);
          Swal.fire("Oops!", "Failed to update course", "error").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/${role}?email=${passemail}`;
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Success!", "Grade updated successfully!", "success")
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/${role}?email=${passemail}`;
            }
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/${role}?email=${passemail}`;
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
              <h3>Edit Grade</h3>
              <div className="signinput-group">
                <input
                  type="text"
                  name="grade"
                  id="loginUser"
                  value={exam.grade}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Grade</label>
              </div>

              <div className="signinput-group">
                <input
                  type="text"
                  name="resources"
                  id="loginUser"
                  value={exam.resources}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Resources</label>
              </div>

              <input
                type="submit"
                value="Continue"
                className="signsubmit-btn"
              />
              {/* <a href="login.html" className="signforgot-pw">Sign in instead</a> */}
              <Link
                to={role==='pc'?`/pc?email=${passemail}`: role==='QAOrganizer'? `/QAOrganizer?email=${passemail}`:`/instructor?email=${passemail}`}
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

export default EditGrade;

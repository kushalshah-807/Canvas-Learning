import { useState, useEffect, React } from "react";
import "../css/student.css"; // Import your CSS file here
import avatar1 from "../assets/avatar4.jpeg";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import backgroundImage from "../assets/cards.jpg";
import axios from "axios";
import DropDownProfile from "./dropdown";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";
function Student() {
  const [openProfile, setOpenProfile] = useState(false);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const [classes, setClasses] = useState([]);
  const [program, setProgram] = useState([]);
  const [name, setName] = useState("");

  const handleCloseModal = () => {
    setOpenProfile(false);
  };
  const loadPrograms2 = async () => {
    const programResults = await axios.get(
      `${url2}/viewEnrolledPrograms`
    );
    setProgram(programResults.data);
    console.log("inside proframs view");
    console.log(programResults.data.AllPrograms);
  };

  useEffect(() => {
    loadPrograms2();
  }, []);
  const loadPrograms = async () => {
    fetch(`${url2}/getName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}`,
    })
      .then((response) => response.text())
      .then((data) => {
        setName(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    loadPrograms();
  }, []);
  // const loadClasses = () => {
  //   fetch("https://sxt9335.uta.cloud/viewClassesEnrolled.php", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: `email=${email}`,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setClasses(data.classes);
  //       } else {
  //         console.error("Server response indicated an error.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  useEffect(() => {
    // loadClasses();
  }, []);
  const loadExams = () => {
    fetch(`${url2}/viewEnrolledCourses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log('dd',data);
          setClasses(data);
        } else {
          console.error("Server response indicated an error.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    loadExams();
  }, []);
  console.log(classes);
  return (
    <div className="stylecontainer">
      <div className="stylesidebar">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossorigin="anonymous"
        />
        <ul>
          <li>
            <Link to={`/student?email=${email}`}>
              <i className="fas fa-book"></i>
              <div className="styletitle">SkillBridge</div>
            </Link>
          </li>
          <li>
            <Link to={`/student?email=${email}`}>
              <i className="fas fa-th-large"></i>
              <div className="styletitle">Student Dashboard</div>
            </Link>
          </li>
          <li>
            <Link to={`/enrollC?email=${email}`}>
              <i class="fa fa-sticky-note" aria-hidden="true"></i>
              <div className="styletitle">Enroll Courses</div>
            </Link>
          </li>
          <li>
            <Link to={`/enrollPrograms?email=${email}`}>
              <i class="fa fa-tasks" aria-hidden="true"></i>
              <div className="styletitle">Enroll Programs</div>
            </Link>
          </li>
          <li>
            <Link to={`/edit?email=${email}`}>
              <i class="fa fa-user-md" aria-hidden="true"></i>
              <div className="styletitle">Edit Profile</div>
            </Link>
          </li>
          <li>
            <Link to={`/updatePassword?email=${email}`}>
              <i class="fa fa-user-md" aria-hidden="true"></i>
              <div className="styletitle">Update Password</div>
            </Link>
          </li>
          <li>
            <Link to={`/messagechat?name=${name}&email=${email}`}>
              <i class="fa fa-comment" aria-hidden="true"></i>
              <div className="styletitle">WebChat</div>
            </Link>
          </li>
          <li>
            <Link to={`/aiBot?name=${name}&email=${email}`}>
              <i class="fa fa-comment" aria-hidden="true"></i>
              <div className="styletitle">AI Bot</div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="stylemain">
        <div className="styletop-bar">
          <div className="stylesearch">
            <input type="text" name="search" placeholder="Search here.." />
            <label htmlFor="search">
              <i className="fas fa-search"></i>
            </label>
          </div>
          <i>{name}</i>
          <div
            className="styleuser"
            onClick={() => setOpenProfile((prev) => !prev)}
          >
            {/* <img src="images/avatar.png" alt="User Avatar" /> */}
            <img src={avatar1} alt="skillbridge" />
          </div>
          {openProfile && (
            <DropDownProfile email={email} closeModal={handleCloseModal} />
          )}
        </div>
        {/* <div className="stylecards">
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">5 </div>
              <div className="stylecard-name">Roles</div>
              <div className="stylecard-name">Roles</div>
              <div className="stylecard-name">Roles</div>
              <div className="stylecard-name">Roles</div>
            </div>
            <div className="styleicon-box">
              <i className="fas fa-tag"></i>
            </div>
          </div>
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">67</div>
              <div className="stylecard-name">Courses</div>
            </div>
            <div className="styleicon-box">
              <i className="fas fa-tag"></i>
            </div>
          </div>
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">5</div>
              <div className="stylecard-name">Exams</div>
            </div>
            <div className="styleicon-box">
              <i className="fas fa-tag"></i>
            </div>
          </div>
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">7</div>
              <div className="stylecard-name">Assignments</div>
            </div>
            <div className="styleicon-box">
              <i className="fas fa-tag"></i>
            </div>
          </div>
        </div> */}

        {/* new Cards */}

        <div className="stylecards">
          {classes?.map((res, index) => (
            res.status==='yes'?
            <div
              className="homeheroservice-item"
              key={index}
              style={{ backgroundColor: "#E0E8FF" }}
            >
              {/* <div className="homeheroicon">
                <img
                  src="https://img.icons8.com/bubbles/100/000000/services.png"
                  alt="Icon"
                />
              </div> */}

              <h2 className="stuDetails">{res.courseName}</h2>
              <p className="stuDetails">
                Student Id: {res.email}
                <br />
                Course ID: {res.courseId}
                <br />
                Professor Name: {res.professorName}
                <br />
                {/* Grade: {res.grade} */}
              </p>
            </div>:null
          ))}
        </div>

        {/* new cards */}
        <div className="styletables">
          {/* Course Catalog */}
          <div className="StyleAllRoles">
            <div className="styleheading">
              {/* <Link to={`/addProgram?email=${email}`} className="stylebtn">
                Add Program
              </Link> */}
              <h2>Upcoming Assessments</h2>
            </div>
            <table className="styleroles">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Exam Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Quiz Link</th>
                  <th>Course Materials</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {classes?.map((res, index) => {
                  if (res.exam && email === res.email && res.grade === null){
                    return(
                      <tr key={index}>
                      <td>{res.courseName}</td>
                      <td>{res.exam}</td>
                      <td>{res.startTime}</td>
                      <td>{res.endTime}</td>
                      <td>{res.quizlink}</td>
                      <td>{res.resources}</td>
                      {/* <td>
                        <i className="fas fa-eye"></i>
                        &nbsp;
                        <i
                          className="fas fa-edit"
                          // onClick={() => handleProgramEdit(res)}
                        ></i>
                        &nbsp;
                        <i
                          className="fas fa-trash"
                          // onClick={() => handleProgramDelete(res.UTA_ID)}
                        ></i>
                        &nbsp;
                      </td> */}
                    </tr>
                    )
                  }
                 
})}
              </tbody>
            </table>
          </div>
          <div className="StyleAllRoles">
            <div className="styleheading">
              {/* <Link to={`/addProgram?email=${email}`} className="stylebtn">
                Add Program
              </Link> */}
              <h2>Graded Assessments</h2>
            </div>
            <table className="styleroles">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Exam Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Quiz Link</th>
                  <th>Course Materials</th>
                  <th>Grade</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {classes?.map((res, index) => {
                  if (res.exam && email === res.email && res.grade !== null){
                    return(
                      <tr key={index}>
                      <td>{res.courseName}</td>
                      <td>{res.exam}</td>
                      <td>{res.startTime}</td>
                      <td>{res.endTime}</td>
                      <td>{res.quizlink}</td>
                      <td>{res.resources}</td>
                      <td>{res.grade}</td>
                      {/* <td>
                        <i className="fas fa-eye"></i>
                        &nbsp;
                        <i
                          className="fas fa-edit"
                          // onClick={() => handleProgramEdit(res)}
                        ></i>
                        &nbsp;
                        <i
                          className="fas fa-trash"
                          // onClick={() => handleProgramDelete(res.UTA_ID)}
                        ></i>
                        &nbsp;
                      </td> */}
                    </tr>
                    )
                  }
                 
})}
              </tbody>
            </table>
          </div>
          <div className="StyleAllRoles">
            <div className="styleheading">
              {/* <Link to={`/addProgram?email=${email}`} className="stylebtn">
                Add Program
              </Link> */}
              <h2>Upcoming Programs</h2>
            </div>
            <table className="styleroles">
              <thead>
                <tr>
                  <th>Program Name</th>
                  <th>Program Organiser</th>
                  <th>Program Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                {program?.map((res, index) => {
                  // Check if res.semail matches the email
                  if (res.semail === email) {
                    return (
                      <tr key={index}>
                        <td>{res.programName}</td>
                        <td>{res.pOrganizer}</td>
                        <td>{res.pDescription}</td>
                        <td>{res.startDate}</td>
                        <td>{res.endDate}</td>
                        <td>{res.venue}</td>
                      </tr>
                    );
                  }
                  // Return null if the condition is not met to skip rendering
                  return null;
                })}
              </tbody>
            </table>
          </div>
          {/* Course Catalog */}
        </div>

        {/* New code */}
      </div>
    </div>
  );
}

export default Student;

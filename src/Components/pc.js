import { useState, useEffect, React } from "react";
import "../css/pc.css";
import { Link } from "react-router-dom";
import avatar1 from "../assets/avatar4.jpeg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DropDownProfile from "./dropdown";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";
function ProgramCoordinator() {
  const [openProfile, setOpenProfile] = useState(false);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const [name, setName] = useState("");
  const [program2, setProgram2] = useState([]);
  const [sname, setSName] = useState("");
  const [semail, setSEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [student, setStudent] = useState([]);
  const loadPrograms2 = async () => {
    const programResults = await axios.get(
      `${url2}/viewEnrolledPrograms`
    );
    setProgram2(programResults.data);
    setEnStudents(programResults.data.length);
    console.log("inside proframs view");
    console.log(programResults.data.AllPrograms);
  };

  const handleCloseModal = () => {
    setOpenProfile(false);
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
  const [program, setProgram] = useState([]);

  const loadPrograms1 = async () => {
    const programResults = await axios.get(
      `${url2}/viewPrograms`
    );
    setProgram(programResults.data);
    setPrograms(programResults.data.length);
    console.log("inside proframs view");
    console.log(programResults.data.AllPrograms);
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
  const handleGradeEdit = (student) => {
    console.log(student.email, "jhdsgjhsdgfjhfj");
    window.location.href = `/editGrade?id=${student.id}&passemail=${email}&studentName=${student.studentName}&courseId=${student.courseId}&email=${student.email}&grade=${student.grade}&percentage=${student.percentage}&resources=${student.resources}&quizlink=${student.quizlink}&role=pc`;
  };
  const handleProgramEdit = (program) => {
    window.location.href = `/editPC?email=${email}&p_id=${program.p_id}&programName=${program.programName}&programDescription=${program.programDescription}&programOrganizer=${program.programOrganizer}&startDate=${program.startDate}&endDate=${program.endDate}`;
  };

  const handleProgramDelete = (programName) => {
    // Send a request to the PHP backend to delete the course
    fetch(`${url2}/deleteProgram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `program=${programName}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Program deleted successfully") {
          Swal.fire("Success!", "Record Deleted Successfully", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/pc?email=${email}`;
              }
            }
          );
        } else {
          Swal.fire("Oops!", "Failed to delete Progra ", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while deleting the Program.",
          "error"
        );
      });
  };
  const [programs, setPrograms] = useState("");
  const [allStudents, setAllStudents] = useState("");
  const [enStudents, setEnStudents] = useState("");
  const loadStudents = async () => {
    const studentResults = await axios.get(
      `${url2}/viewQuiz`
    );
    setStudent(studentResults.data);
    console.log("inside studentResults view",studentResults.data.studentResults);
  
  };
  useEffect(() => {
    fetch(`${url2}/countAllStudents`)
      .then((response) => response.text())
      .then((data) => {
        
        setAllStudents(data);
      
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    loadPrograms();
    loadStudents();
  }, []);
  useEffect(() => {
    loadPrograms1();
  }, []);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("https://sxt9335.uta.cloud/feedbackform.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `name=${sname}&email=${semail}&feedback=${feedback}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Email Sent") {
          Swal.fire(
            "Success!",
            "Your query has been sent successfully!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/pc?email=${email}`;
            }
          });
        } else {
          alert(data);
          Swal.fire(
            "Oops!",
            "Failed to send email. Please try again.",
            "error"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/pc?email=${email}`;
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
            window.location.href = `/pc?email=${email}`;
          }
        });
      });
  };
  
  return (
    <div className="pccontainer">
      <div className="pcsidebar">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        />
        <ul>
          <li>
            <Link to={`/pc?email=${email}`}>
              <i className="fas fa-book"></i>
              <div className="pctitle">SkillBridge</div>
            </Link>
          </li>
          <li>
            <Link to={`/pc?email=${email}`}>
              <i className="fas fa-th-large"></i>
              <div className="pctitle">PC Dashboard</div>
            </Link>
          </li>
          <li>
            <Link to={`/addProgram?email=${email}`}>
              <i class="fa fa-tasks" aria-hidden="true"></i>
              <div className="pctitle">Add Programs</div>
            </Link>
          </li>
          <li>
            <Link to={`/pcreports?email=${email}&name=${name}`}>
              <i class="fa fa-line-chart" aria-hidden="true"></i>
              <div className="pctitle">Reports</div>
            </Link>
          </li>
          <li>
            <Link to={`/edit?email=${email}`}>
              <i class="fa fa-user-md" aria-hidden="true"></i>
              <div className="pctitle">Edit Profile</div>
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
              <div className="pctitle">WebChat</div>
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
      <div className="pcmain">
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
        <div className="pccards">
          <div className="pccard">
            <div className="pccard-content">
              <div className="pcnumber">{programs}</div>
              <div className="pccard-name">Programs</div>
            </div>
            <div className="pcicon-box">
              <i class="fa fa-list-alt" aria-hidden="true"></i>
            </div>
          </div>
          <div className="pccard">
            <div className="pccard-content">
              <div className="pcnumber">{allStudents}</div>
              <div className="pccard-name">All Student</div>
            </div>
            <div className="pcicon-box">
              <i class="fa fa-users" aria-hidden="true"></i>
            </div>
          </div>
          <div className="pccard">
            <div className="pccard-content">
              <div className="pcnumber">{enStudents}</div>
              <div className="pccard-name">Enrolled Students</div>
            </div>
            <div className="pcicon-box">
              <i class="fa fa-user" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="pctables">
          {/* <div className="pcAllRoles">
            <div className="pcheading">
              <h2>Manage Programs</h2>
              <a href="#" className="pcbtn">
                View All
              </a>
            </div>
            <table className="pcroles">
              <thead>
                <tr>
                  <th>Program Name</th>
                  <th>Candidate Name</th>
                  <th>Role</th>
                  <th>UTA Email</th>
                  <th>Program Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cultural Fest</td>
                  <td>Alex Adam</td>
                  <td>Student</td>
                  <td>alexAdam@mavs.uta.edu</td>
                  <td>How to plan a Cultural Fest?</td>
                  <td>
                    <i className="fas fa-eye"></i>&nbsp;
                    <i className="fas fa-edit"></i>&nbsp;
                    <i className="fas fa-trash"></i>&nbsp;
                  </td>
                </tr>
                <tr>
                  <td>Program 2</td>
                  <td>Alex2 Adam</td>
                  <td>Instructor</td>
                  <td>alex2Adam@mavs.uta.edu</td>
                  <td>How to plan a Cultural Fest?</td>
                  <td>
                    <i className="fas fa-eye"></i>&nbsp;
                    <i className="fas fa-edit"></i>&nbsp;
                    <i className="fas fa-trash"></i>&nbsp;
                  </td>
                </tr>
                <tr>
                  <td>Program 3</td>
                  <td>Alex3 Adam</td>
                  <td>Admin</td>
                  <td>alex3Adam@mavs.uta.edu</td>
                  <td>How to plan a Cultural Fest?</td>
                  <td>
                    <i className="fas fa-eye"></i>&nbsp;
                    <i className="fas fa-edit"></i>&nbsp;
                    <i className="fas fa-trash"></i>&nbsp;
                  </td>
                </tr>
                <tr>
                  <td>Program 4</td>
                  <td>Alex4 Adam</td>
                  <td>QAO</td>
                  <td>alex4Adam@mavs.uta.edu</td>
                  <td>How to plan a Cultural Fest?</td>
                  <td>
                    <i className="fas fa-eye"></i>&nbsp;
                    <i className="fas fa-edit"></i>&nbsp;
                    <i className="fas fa-trash"></i>&nbsp;
                  </td>
                </tr>
                <tr>
                  <td>Program 4</td>
                  <td>Alex4 Adam</td>
                  <td>QAO</td>
                  <td>alex4Adam@mavs.uta.edu</td>
                  <td>How to plan a Cultural Fest?</td>
                  <td>
                    <i className="fas fa-eye"></i>&nbsp;
                    <i className="fas fa-edit"></i>&nbsp;
                    <i className="fas fa-trash"></i>&nbsp;
                  </td>
                </tr>
                <tr>
                  <td>Program 4</td>
                  <td>Alex4 Adam</td>
                  <td>QAO</td>
                  <td>alex4Adam@mavs.uta.edu</td>
                  <td>How to plan a Cultural Fest?</td>
                  <td>
                    <i className="fas fa-eye"></i>&nbsp;
                    <i className="fas fa-edit"></i>&nbsp;
                    <i className="fas fa-trash"></i>&nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
          {/* Program Management */}
          <div className="pcAllRoles">
            <div className="pcheading">
              <h2>Manage Programs</h2>
            </div>
            <table className="pcroles">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Program Name</th>
                  <th>Program Organiser</th>
                  <th>Program Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Venue</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {program?.map((res, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{res.programName}</td>
                    <td>{res.programOrganizer}</td>
                    <td>{res.programDescription}</td>
                    <td>{res.startDate}</td>
                    <td>{res.endDate}</td>
                    <td>{res.venue}</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={() => handleProgramEdit(res)}
                      ></i>
                      &nbsp;
                      <i
                        className="fas fa-trash"
                        onClick={() => handleProgramDelete(res.programName)}
                      ></i>
                      &nbsp;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pcAllRoles">
            <div className="pcheading">
              <h2>Students Enrolled</h2>
            </div>
            <table className="pcroles">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Email</th>
                  <th>Program Name</th>
                  <th>Program Organiser</th>
                  <th>Program Description</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                {program2.map((res, index) => (
                  <tr key={index}>
                    <td>{res.sname}</td>
                    <td>{res.semail}</td>
                    <td>{res.programName}</td>
                    <td>{res.pOrganizer}</td>
                    <td>{res.pDescription}</td>
                    <td>{res.venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="StyleAllRoles">
            <div className="styleheading">
              <h2> Assessments</h2>
            </div>
            <table className="styleroles">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Email</th>
                  <th>Assessment Link</th>
                  <th>Resources</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {student?.map((res, index) => {
                  if (res.status === "no" ) {
                    return (
                      <tr key={index}>
                        <td>{res.studentName}</td>
                        <td>{res.email}</td>
                        <td>{res.quizlink}</td>
                        <td>{res.resources}</td>
                        <td>{res.startTime}</td>
                        <td>{res.endTime}</td>
                        <td>{res.grade}</td>
                        <td>
                          <i
                            className="fas fa-edit"
                            onClick={() => handleGradeEdit(res)}
                          ></i>
                          &nbsp;
                          {/* <i className="fas fa-trash" onClick={() => handleDelete(res.course_id)}></i> */}
                          &nbsp;
                        </td>
                      </tr>
                    );
                  }
                  return null; // If studentName is null, return null to skip rendering
                })}
              </tbody>
            </table>
          </div>
        <div className="stylefeedback">
          <div className="stylefeedback1">
            <h1>Contact Students</h1>
            <form onSubmit={handleFormSubmit}>
              <input
                onChange={(e) => setSName(e.target.value)}
                type="text"
                placeholder="Subject"
              />
              <input
                type="email"
                onChange={(e) => setSEmail(e.target.value)}
                placeholder="Student UTA Email ID"
              />
              <textarea
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your Message..."
              ></textarea>
              <button type="submit">Send Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramCoordinator;

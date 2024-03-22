import { useState, useEffect, React } from "react";
import "../css/style.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import avatar1 from "../assets/avatar4.jpeg";
import DropDownProfile from "./dropdown";
import { useLocation } from "react-router-dom";
import { url2 } from "../globalUrl";
function QAOrganizer() {
  const [openProfile, setOpenProfile] = useState(false);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const [quality, setQuality] = useState([]);
  const [sname, setSName] = useState("");
  const [semail, setSEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [student, setStudent] = useState([]);
  const loadQA = async () => {
    const qaResults = await axios.get(`${url2}/viewPolicies`);
    setQuality(qaResults.data);
    console.log(qaResults.data.qaResults);
  };

  const handleCloseModal = () => {
    setOpenProfile(false);
  };
  const handleQAEdit = (quality) => {
    window.location.href = `/editQA?email=${email}&policyId=${quality.policyId}&qaPolicies=${quality.qaPolicies}&year=${quality.year}`;
  };
  const loadStudents = async () => {
    const studentResults = await axios.get(
     `${url2}/viewQuiz`
    );
    setStudent(studentResults.data);
    console.log("inside studentResults view",studentResults.data.studentResults);
  
  };
  const handleGradeEdit = (student) => {
    console.log(student.email, "jhdsgjhsdgfjhfj");
    window.location.href = `/editGrade?id=${student.id}&passemail=${email}&studentName=${student.studentName}&courseId=${student.courseId}&email=${student.email}&grade=${student.grade}&percentage=${student.percentage}&resources=${student.resources}&quizlink=${student.quizlink}&role=QAOrganizer`;
  };
  useEffect(() => {
    loadQA();
    loadStudents();
  }, []);

  const [policy, setPolicy] = useState("");
  const [pastpolicy, setPPolicy] = useState("");
  const [futurepolicy, setFPolicy] = useState("");
  useEffect(() => {
    fetch(`${url2}/countPolicy`)
      .then((response) => response.text())
      .then((data) => {
        const [policy, ppolicy, fpolicy] = data.split(",");
        setPolicy(policy);
        setPPolicy(ppolicy);
        setFPolicy(fpolicy);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const handleDelete = (policyId) => {
    // Send a request to the PHP backend to delete the course
    fetch(`${url2}/deletePolicy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `policyId=${policyId}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "QA deleted successfully") {
          Swal.fire("Success!", "QA Deleted Successfully", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/QAOrganizer?email=${email}`;
              }
            }
          );
        } else {
          Swal.fire("Oops!", "Failed to delete user", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Success!", "Policy deleted successfully.", "success").then(
          (result) => {
            if (result.isConfirmed) {
              window.location.href = `/QAOrganizer?email=${email}`;
            }
          }
        );
      });
  };

  const [name, setName] = useState("");
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
              window.location.href = `/QAOrganizer?email=${email}`;
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
              window.location.href = `/QAOrganizer?email=${email}`;
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
            window.location.href = `/QAOrganizer?email=${email}`;
          }
        });
      });
  };
  return (
    <div className="stylecontainer">
      <div className="stylesidebar">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        />
        <ul>
          <li>
            <Link to={`/QAOrganizer?email=${email}`}>
              <i class="fa fa-bars" aria-hidden="true"></i>
              <div className="styletitle">SkillBridge</div>
            </Link>
          </li>
          <li>
            <Link to={`/QAOrganizer?email=${email}`}>
              <i className="fas fa-th-large"></i>
              <div className="styletitle">QA Dashboard</div>
            </Link>
          </li>
          <li>
            <Link to={`/addQA?email=${email}`}>
              <i class="fa fa-file-archive-o" aria-hidden="true"></i>
              <div className="styletitle">Add Policies</div>
            </Link>
          </li>
          <li>
            <Link to={`/edit?email=${email}`}>
              <i className="fas fa-user"></i>
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
            <Link to={`/aiBot?role=admin?name=${name}&email=${email}`}>
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
        <div className="stylecards">
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">{policy}</div>
              <div className="stylecard-name">Total Policies</div>
            </div>
            <div className="styleicon-box">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </div>
          </div>
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">{pastpolicy}</div>
              <div className="stylecard-name">Past Policies</div>
            </div>
            <div className="styleicon-box">
              <i class="fa fa-envelope-open" aria-hidden="true"></i>
            </div>
          </div>
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">{futurepolicy}</div>
              <div className="stylecard-name">Future Policies</div>
            </div>
            <div className="styleicon-box">
              <i class="fa fa-fax" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="styletables">
          <div className="StyleAllRoles">
            <div className="styleheading">
              <h2>Manage Policies</h2>
            </div>
            <table className="styleroles">
              <thead>
                <tr>
                  <th>Policy ID</th>
                  <th>QA Policy and Process</th>
                  <th>Year Published</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quality.map((res, index) => (
                  <tr key={index}>
                    <td>{res.policyId}</td>
                    <td>{res.qaPolicies}</td>
                    <td>{res.year}</td>

                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={() => handleQAEdit(res)}
                      ></i>
                      &nbsp;
                      <i
                        className="fas fa-trash"
                        onClick={() => handleDelete(res.policyId)}
                      ></i>
                      &nbsp;
                    </td>
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
            <h1>Provide Recommendation</h1>
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
                placeholder="Your Recommendation..."
              ></textarea>
              <button type="submit">Send Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QAOrganizer;

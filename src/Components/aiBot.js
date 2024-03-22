import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../css/style.css"; // Import your CSS file
import DropDownProfile from "./dropdown";
import { useLocation } from "react-router-dom";
import avatar1 from "../assets/avatar4.jpeg";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import {
  MainContainer,
  MessageInput,
  MessageHeader,
} from "@minchat/react-chat-ui";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import axios from "axios";
import { url, url2 } from "../globalUrl";

function Chat({ socket, username, room, passemail }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const [openProfile, setOpenProfile] = useState(false);
  const [role, setRole] = useState("");
  const [to, setTo] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const handleCloseModal = () => {
    setOpenProfile(false);
  };
  const sendMessage = async (string) => {
    if (string !== "") {
      setDataSource((prev) => [
        ...prev,
        {
          position: "left",
          type: "text",
          title: "You",
          titleColor: "green",
          text: string,
          date: new Date(),
        },
      ]);
      setDataSource((prev) => [
        ...prev,
        {
          position: "right",
          type: "text",
          title: "AI Bot",
          titleColor: "blue",
          text: "typing...",
          date: new Date(),
        },
      ]);
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "assistant", content: string }],
        model: "gpt-3.5-turbo",
      });

      setDataSource((prev) => {
        const temp = [...prev];
        temp[temp.length - 1] = {
          position: "right",
          type: "text",
          title: "AI Bot",
          titleColor: "blue",
          text: chatCompletion?.choices[0]?.message.content,
          date: new Date(),
        };
        return temp;
      });
    }
  };

  useEffect(() => {
    const handleReceivedMessage = (data) => {
      if (data.to === passemail) {
        // setDataSource([...dataSource, {
        //   position: 'right',
        //   type: 'text',
        //   title: 'Him',
        //   titleColor: 'blue',
        //   text: data.message,
        //   date: new Date(),
        // }])
        setDataSource((prev) => [
          ...prev,
          {
            position: "right",
            type: "text",
            title: data.name,
            titleColor: "blue",
            text: data.message,
            date: new Date(),
          },
        ]);
      }
      console.log("recieve", data);
    };
  }, []);

  const [admin, setAdmin] = useState("");
  const [students, setStudents] = useState("");
  const [instructors, setInstructors] = useState("");
  const [pc, setPC] = useState("");
  const [qa, setQA] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("https://sxt9335.uta.cloud/fetchbar.php")
      .then((response) => response.text())
      .then((data) => {
        const [admin, students, instructors, pc, qa] = data.split(",");
        setAdmin(admin);
        setStudents(students);
        setInstructors(instructors);
        setPC(pc);
        setQA(qa);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const loadPrograms = async () => {
    fetch(`${url2}/getRole`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}`,
    })
      .then((response) => response.text())
      .then((data) => {
        setRole(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loadContacts = async () => {
    try {
      const res = await axios.get(`${url}/users`);
      setContacts(res.data);
      console.log("res", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const loadMessages = async (email1) => {
    try {
      const res = await axios.get(
        `${url}/messages?email1=${email}&email2=${email1}`
      );
      console.log(res.data);
      setDataSource(
        res.data.map((message) => {
          const data = JSON.parse(message.data);
          return {
            position: message.sender === email ? "left" : "right",
            type: "text",
            title: message.sender === email ? "You" : data.name,
            titleColor: message.sender === email ? "green" : "blue",
            text: data.message,
            date: new Date(message.created_at),
          };
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    loadPrograms();
    loadContacts();
  }, []);

  console.log(to);
  return (
    <div className="stylecontainer" style={{ position: "absolute", top: "0" }}>
      <div className="stylesidebar">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        />
        <ul>
          {role === "Admin" && (
            <>
              <li>
                <Link to={`/admin?email=${email}`}>
                  <i class="fa fa-bars" aria-hidden="true"></i>
                  <div className="styletitle">SkillBridge</div>
                </Link>
              </li>
              <li>
                {/* <a href="#">
              <i className="fas fa-th-large"></i>
              <div className="styletitle">Admin Dashboard</div>
            </a> */}
                <Link to={`/admin?email=${email}`}>
                  <i className="fas fa-th-large"></i>
                  <div className="styletitle">Admin Dashboard</div>
                </Link>
              </li>
              <li>
                <Link to={`/addCourses?email=${email}`}>
                  <i class="fa fa-sticky-note" aria-hidden="true"></i>
                  <div className="styletitle">Add Course</div>
                </Link>
              </li>
              <li>
                <Link to={`/addProgram?email=${email}`}>
                  <i class="fa fa-tasks" aria-hidden="true"></i>
                  <div className="styletitle">Add Programs</div>
                </Link>
              </li>
              <li>
                <Link to={`/addUser?email=${email}`}>
                  <i class="fa fa-users" aria-hidden="true"></i>
                  <div className="styletitle">Add Users</div>
                </Link>
              </li>
              <li>
                {/* <a href="#">
              <i className="fas fa-tag"></i>
              <div className="styletitle">Repots</div>
            </a> */}
                <Link
                  to={`/reports?email=${email}&admin=${admin}&students=${students}&instructors=${instructors}&pc=${pc}&qa=${qa}&name=${name}`}
                >
                  <i class="fa fa-line-chart" aria-hidden="true"></i>
                  <div className="styletitle">Reports</div>
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
                <Link to={`/messagechat?name=${name}`}>
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
            </>
          )}
          {role === "Instructor" && (
            <>
              <li>
                <Link to={`/instructor?email=${email}`}>
                  <i className="fas fa-book"></i>
                  <div className="styletitle">SkillBridge</div>
                </Link>
              </li>
              <li>
                <Link to={`/instructor?email=${email}`}>
                  <i className="fas fa-th-large"></i>
                  <div className="styletitle">Instructor Dashboard</div>
                </Link>
              </li>
              <li>
                <Link to={`/addCourses?email=${email}&name=${name}`}>
                  <i className="fa fa-sticky-note"></i>
                  <div className="styletitle">Add Course</div>
                </Link>
              </li>
              <li>
                {/* <a href="#">
              <i className="fas fa-tag"></i>
              <div className="styletitle">Assessment Creation</div>
            </a> */}
                <Link to={`/assessment?email=${email}`}>
                  <i class="fa fa-file" aria-hidden="true"></i>
                  <div className="styletitle">Assessment Creation</div>
                </Link>
              </li>
              <li>
                <Link to={`/updatePassword?email=${email}`}>
                  <i class="fa fa-user-md" aria-hidden="true"></i>
                  <div className="styletitle">Update Password</div>
                </Link>
              </li>
              <li>
                <Link to={`/edit?email=${email}`}>
                  <i class="fa fa-user-md" aria-hidden="true"></i>
                  <div className="styletitle">Edit Profile</div>
                </Link>
              </li>
              <li>
                <Link to={`/messagechat?name=${name}`}>
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
            </>
          )}
          {role === "Program Coordinator" && (
            <>
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
            </>
          )}
          {role === "QA Officer" && (
            <>
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
                <Link to={`/aiBot?name=${name}&email=${email}`}>
                  <i class="fa fa-comment" aria-hidden="true"></i>
                  <div className="styletitle">AI Bot</div>
                </Link>
              </li>
            </>
          )}
          {role === "Student" && (
            <>
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
            </>
          )}
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
          <div>
             Chat list
          </div>
        </div> */}
        {/* <div className="chat-window">
          <div className="chat-header">
            <p>Live Chat</p>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent) => {
                return (
                  <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Type a message...."
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div> */}

        <div
          style={{
            display: "flex",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100vh",
              border: "1px solid #ccc",
              overflowY: "scroll",
              padding: "10px",
              paddingTop: "70px",
            }}
          >
            <MainContainer style={{ height: "100%", width: "99%" }}>
              {/* <MessageHeader /> */}

              <div
                id="chat-box"
                style={{ height: "100%", overflow: "scroll", width: "100%" }}
              >
                <MessageList dataSource={dataSource} />
                <MessageInput
                  onSendMessage={async (strng) => {
                    sendMessage(strng);
                  }}
                  placeholder="Type message here"
                />
              </div>
            </MainContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

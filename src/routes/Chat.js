import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatroom } from "./../store.js";

function Chat() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let [height] = useState(window.innerHeight);
  let navigate = useNavigate();
  let [messageContent, setMessageContent] = useState("");
  let [messages, setMessages] = useState([
    {
      _id: "0",
      parent_id: "1",
      sender_id: "62adff5b980565d6cad0b954",
      senderId: "test",
      senderName: "dd",
      content: "me",
      date: "2022-2-2",
    },
    {
      _id: "0",
      parent_id: "1",
      sender_id: "62adff5b980565",
      senderId: "test",
      senderName: "dd",
      content: "you",
      date: "2022-2-2",
    },
  ]);
  let [chatrooms, setChatrooms] = useState([
    {
      _id: "0",
      whoUid: ["0", "2"],
      who: ["admin", "Kims"],
      startDate: "22 - 5 - 20",
      latestDate: "22 - 5 - 30",
      recentMessage: "hello",
    },
    {
      _id: "1",
      whoUid: ["0", "3"],
      who: ["admin", "Elaski"],
      startDate: " 22 - 5 - 21",
      latestDate: "22 - 5 - 31",
      recentMessage: "hello",
    },
  ]);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData == null) {
      navigate("/login");
    }
  });
  return (
    <div>
      <div className="container p-4 mt-5">
        {height}
        <div className="row">
          <div className="col-3">
            <ul className="list-group chat-list">
              <li className="list-group-item">
                <h6>current Chat _id: {state.chatroom.currentChatroom}</h6>
              </li>

              {chatrooms.map((chatroom, i) => (
                <div key={i}>
                  {state.chatroom.currentChatroom == chatroom._id ? (
                    <li
                      onClick={() => {
                        ChoiceCurrentChatroom(chatroom);
                      }}
                      className="list-group-item chat-list-box activechat"
                    >
                      <h6 className="chatroom-who">_id: {chatroom._id}</h6>
                      <p className="chatroom-recent">
                        {chatroom.recentMessage}
                      </p>
                      <p className="chatroom-time">{chatroom.latestDate}</p>
                    </li>
                  ) : (
                    <li
                      onClick={() => {
                        ChoiceCurrentChatroom(chatroom);
                      }}
                      className="list-group-item chat-list-box"
                    >
                      <h6 className="chatroom-who">_id: {chatroom._id}</h6>
                      <p className="chatroom-recent">
                        {chatroom.recentMessage}
                      </p>
                      <p className="chatroom-time">{chatroom.latestDate}</p>
                    </li>
                  )}
                </div>
              ))}

              <button>chatroom fetch</button>
            </ul>
          </div>

          <div className="col-6 p-3">
            <div></div>
            <div>target: </div>

            <div className="chat-room">
              <div></div>
              <ul className="list-group chat-content">
                {messages.map((message, i) => (
                  <div key={i}>
                    <li>
                      {message.sender_id === state.user._id ? (
                        <div className="row">
                          <div>
                            <span className="chat-date text-small minedate">
                              {message.date}
                            </span>
                          </div>
                          <div>
                            <span className="chat-box mine">
                              {message.content}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div>
                            <span className="chat-date text-small">
                              {message.date}
                            </span>
                          </div>
                          <div>
                            <span className="chat-box">{message.content}</span>
                          </div>
                        </div>
                      )}
                    </li>
                  </div>
                ))}

                {/* <li>
                  <span className="chat-box">ㅎㅇ</span>
                </li>
                <li>
                  <span className="chat-box mine">ㅎㅇ</span>
                </li>
                <li>
                  <span className="chat-box mine">ㅎㅇ</span>
                </li> */}
              </ul>
              <div className="input-group">
                <input
                  value={messageContent}
                  onChange={(e) => {
                    setMessageContent(e.target.value);
                  }}
                  className="form-control"
                  id="chat-input"
                />
                <button
                  onClick={() => {
                    SendMessage(messageContent);
                  }}
                  className="btn btn-secondary"
                >
                  send
                </button>
              </div>
              <div className="down-button">▽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function ChoiceCurrentChatroom(chatroom) {
    dispatch(setCurrentChatroom(chatroom));
  }

  function SendMessage(newMessageContent) {
    if (newMessageContent == "") {
      console.log("input message content");
      return;
    }
    let newMessages = [...messages];
    let newMessage = {
      _id: "0",
      parent_id: state.chatroom.currentChatroom,
      sender_id: state.user._id,
      senderId: state.user.id,
      senderName: state.user.displayName,
      content: newMessageContent,
      date: "2022-2-2",
    };
    newMessages.push(newMessage);
    setMessages(newMessages);
    setMessageContent("");
  }
}

export default Chat;

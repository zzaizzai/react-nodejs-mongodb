import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentChatroom,
  setMessagesInChatroom,
  ClearMessages,
  setChatroomsInStore,
} from "./../store.js";
import { io } from "socket.io-client";

function Chat() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let [height] = useState(window.innerHeight);
  let navigate = useNavigate();
  let [messageContent, setMessageContent] = useState("");
  let [messages, setMessages] = useState([
    // {
    //   _id: "0",
    //   parent_id: "1",
    //   sender_id: "62adff5b980565d6cad0b954",
    //   senderId: "test",
    //   senderName: "dd",
    //   content: "me",
    //   date: "2022-2-2",
    // },
    // {
    //   _id: "0",
    //   parent_id: "1",
    //   sender_id: "62adff5b980565",
    //   senderId: "test",
    //   senderName: "dd",
    //   content: "you",
    //   date: "2022-2-2",
    // },
  ]);
  let [chatrooms, setChatrooms] = useState([
    // {
    //   _id: "0",
    //   whoUid: ["0", "2"],
    //   who: ["admin", "Kims"],
    //   startDate: "22 - 5 - 20",
    //   latestDate: "22 - 5 - 30",
    //   recentMessage: "hello",
    // },
    // {
    //   _id: "1",
    //   whoUid: ["0", "3"],
    //   who: ["admin", "Elaski"],
    //   startDate: " 22 - 5 - 21",
    //   latestDate: "22 - 5 - 31",
    //   recentMessage: "hello",
    // },
  ]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/chatrooms", { user: state.user })
      .then((result) => {
        console.log(result.data.chatrooms);
        setChatrooms(result.data.chatrooms);
        dispatch(setChatroomsInStore(result.data.chatrooms));

        //join chatrooms whose the name is element_id
        result.data.chatrooms.forEach((element) => {
          socket.emit("JOIN_ROOM", element);
        });
      });
  }, []);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData == null) {
      navigate("/login");
    }
  });

  useEffect(() => {
    // console.log(state.chatroom.currentChatroom)
    axios
      .post("http://localhost:8080/getmessages", {
        user: state.user,
        chatroom_id: state.chatroom.currentChatroom,
      })
      .then((result) => {
        // setMessages(result.data.targetMessages);
        dispatch(ClearMessages());
        dispatch(setMessagesInChatroom(result.data.targetMessages));
      });
  }, [state.chatroom.currentChatroom]);

  let socket = null;
  socket = io("http://127.0.0.1:8080");

  useEffect(() => {
    socket.on("ROOM_MESSAGE", (message) => {
      // console.log(state.chatroom.currentChatroom);
      console.log(message.chatroom_id);
      // FetchMessagesFromSocket();
      let aaa = [message];
      dispatch(setMessagesInChatroom(aaa));
    });
    // return () => {
    //   socket.disconnect();
    // };
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

              {state.chatroom.chatrooms.map((chatroom, i) => (
                <div key={i}>
                  {state.chatroom.currentChatroom == chatroom._id ? (
                    <li
                      onClick={() => {
                        ChoiceCurrentChatroom(chatroom);
                      }}
                      className="list-group-item chat-list-box activechat"
                    >
                      {/* <h6 className="chatroom-who">{chatroom.whoName[0]}</h6> */}
                      <h6 className="chatroom-time">_id: {chatroom._id}</h6>
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
                      {/* <h6 className="chatroom-who">{chatroom.whoName[0]}</h6> */}
                      <h6 className="chatroom-time">_id: {chatroom._id}</h6>
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
                {state.chatroom.messages.map((message, i) => (
                  <div key={i}>
                    <li>
                      {message.sender_id === state.user._id ? (
                        <div className="row">
                          <div>
                            <span className="chat-date text-small minedate">
                              {/* {message.date} */}
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
                              {/* {message.date} */}
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
                  <span className="chat-box">??????</span>
                </li>
                <li>
                  <span className="chat-box mine">??????</span>
                </li>
                <li>
                  <span className="chat-box mine">??????</span>
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
              <div className="down-button">???</div>
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
    let newMessage = {
      chatroom_id: state.chatroom.currentChatroom,
      sender_id: state.user._id,
      senderId: state.user.id,
      senderName: state.user.displayName,
      content: newMessageContent,
      date: new Date(),
    };
    setMessageContent("");
    console.log(messages);
    socket.emit("ROOM_SEND", newMessage);
    console.log(messages);
    axios
      .post("http://localhost:8080/sendmessage", { newMessage: newMessage })
      .then((result) => {
        console.log(result);
      });
  }

  function FetchMessagesFromSocket() {
    console.log(state.chatroom.currentChatroom);
  }
}

export default Chat;

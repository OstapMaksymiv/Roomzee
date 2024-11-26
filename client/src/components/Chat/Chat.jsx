import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContaxt";
import { format } from "timeago.js";
import apiRequest from "../../library/apiRequest";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../library/notificationStore";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { Fade} from "react-awesome-reveal";
function Chat({chats}) {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
  const {currentUser} = useContext(AuthContext);
  const {socket} = useContext(SocketContext);
  const [chat, setChat] = useState({});
  const [chatOpen, setChatOpen] = useState(false);
  const messageEndRef = useRef();
  const centerRef = useRef(null);
  const bottomRef = useRef(null);
  const chatRef = useRef(null);
  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    if (chatOpen ) {
      chatRef.current.style.maxHeight = '484px';
    } else {
      chatRef.current.style.maxHeight = '0px'; 
    }
  }, [chatOpen])

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
      setChatOpen(true)
      await apiRequest.put("/chats/read/" + id);
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  useEffect(() => {
    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
        }
      });
    }
    
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {text} = Object.fromEntries(formData);
    if(!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, {text});
      setChat(prev => ({...prev, messages:[...prev.messages, res.data]}));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {

  },[])
  return (
    <>
    <div className="chat">
      <Fade triggerOnce={true}>
        <h1>Messages</h1>
      </Fade>
       
        
    <Fade delay={400} triggerOnce={true}>

      <div className="messages">
      { 
          chats.map(c => (
            <div className="message" key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => {handleOpenChat(c.id, c.receiver)}}
            >
              <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
              <span>{c.receiver.username}</span>
              <p>{c.lastMessage}</p>
            </div>
          ))
        }
      </div>
    </Fade>
        
      
    </div>
      {(

        <div ref={chatRef} className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver?.avatar || "/noavatar.jpg"} alt="" />
              <span>{chat.receiver?.username}</span>
            </div>
            <div >
                <span className="close" onClick={()=>setChatOpen(false)}>X</span>
            </div>
          </div>
          <div ref={centerRef} className="center">
          {chat.messages?.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div style={{overflow:'auto'}} ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} ref={bottomRef} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
      
      
      </>
  );
}
export default Chat;